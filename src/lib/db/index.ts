import { createClient } from '@libsql/client';

// Initialize Turso client
const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Queue for failed operations - will retry on next request
interface QueuedOperation {
  id: string;
  type: 'grievance' | 'questionnaire';
  data: Record<string, unknown>;
  attempts: number;
  createdAt: Date;
}

const operationQueue: QueuedOperation[] = [];
const MAX_RETRY_ATTEMPTS = 3;

let isInitialized = false;

export async function initializeDatabase() {
  if (isInitialized) return true;

  try {
    // Create grievances table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS grievances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tracking_code TEXT UNIQUE NOT NULL,
        complainant_name TEXT,
        complainant_email TEXT,
        complainant_phone TEXT,
        is_anonymous INTEGER DEFAULT 0,
        village_id TEXT,
        custom_location TEXT,
        grievance_type TEXT NOT NULL,
        description TEXT NOT NULL,
        incident_date TEXT,
        preferred_language TEXT DEFAULT 'ar',
        status TEXT DEFAULT 'submitted',
        admin_notes TEXT,
        status_updated_at TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create questionnaire_responses table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS questionnaire_responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        response_data TEXT NOT NULL,
        submitted_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_grievances_tracking_code ON grievances(tracking_code)`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_grievances_status ON grievances(status)`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_grievances_created_at ON grievances(created_at)`);

    isInitialized = true;
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

// Process any queued operations
export async function processQueue() {
  if (operationQueue.length === 0) return;

  const toProcess = [...operationQueue];
  operationQueue.length = 0;

  for (const op of toProcess) {
    try {
      if (op.type === 'grievance') {
        await insertGrievanceDirectly(op.data);
      } else if (op.type === 'questionnaire') {
        await insertQuestionnaireDirectly(op.data);
      }
      console.log(`Queued operation ${op.id} processed successfully`);
    } catch (error) {
      if (op.attempts < MAX_RETRY_ATTEMPTS) {
        op.attempts++;
        operationQueue.push(op);
        console.log(`Requeued operation ${op.id}, attempt ${op.attempts}`);
      } else {
        console.error(`Operation ${op.id} failed after ${MAX_RETRY_ATTEMPTS} attempts:`, error);
      }
    }
  }
}

async function insertGrievanceDirectly(data: Record<string, unknown>) {
  const result = await db.execute({
    sql: `INSERT INTO grievances (
      tracking_code, complainant_name, complainant_email, complainant_phone,
      is_anonymous, village_id, custom_location, grievance_type, description,
      incident_date, preferred_language, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted', datetime('now'))`,
    args: [
      data.tracking_code as string,
      data.complainant_name as string | null,
      data.complainant_email as string | null,
      data.complainant_phone as string | null,
      data.is_anonymous ? 1 : 0,
      data.village_id as string | null,
      data.custom_location as string | null,
      data.grievance_type as string,
      data.description as string,
      data.incident_date as string | null,
      data.preferred_language as string,
    ],
  });
  return { id: Number(result.lastInsertRowid) };
}

async function insertQuestionnaireDirectly(data: Record<string, unknown>) {
  const result = await db.execute({
    sql: `INSERT INTO questionnaire_responses (response_data, submitted_at) VALUES (?, datetime('now'))`,
    args: [JSON.stringify(data)],
  });
  return { id: Number(result.lastInsertRowid) };
}

// Robust insert with queue fallback
export async function insertGrievance(data: Record<string, unknown>): Promise<{ success: boolean; id?: number; queued?: boolean }> {
  await processQueue();

  try {
    const result = await insertGrievanceDirectly(data);
    return { success: true, id: result.id };
  } catch (error) {
    console.error('Failed to insert grievance, queuing:', error);

    operationQueue.push({
      id: `grievance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'grievance',
      data,
      attempts: 1,
      createdAt: new Date(),
    });

    return { success: true, queued: true };
  }
}

export async function insertQuestionnaire(data: Record<string, unknown>): Promise<{ success: boolean; queued?: boolean }> {
  await processQueue();

  try {
    await insertQuestionnaireDirectly(data);
    return { success: true };
  } catch (error) {
    console.error('Failed to insert questionnaire, queuing:', error);

    operationQueue.push({
      id: `questionnaire_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'questionnaire',
      data,
      attempts: 1,
      createdAt: new Date(),
    });

    return { success: true, queued: true };
  }
}

export async function getGrievanceByTrackingCode(trackingCode: string) {
  try {
    const result = await db.execute({
      sql: `SELECT id, tracking_code, grievance_type, status, status_updated_at, created_at, is_anonymous
            FROM grievances WHERE tracking_code = ?`,
      args: [trackingCode.toUpperCase()],
    });
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching grievance:', error);
    return null;
  }
}

export async function getAllGrievances(status?: string, page = 1, limit = 20) {
  try {
    const offset = (page - 1) * limit;

    let result;
    let countResult;

    if (status && status !== 'all') {
      result = await db.execute({
        sql: `SELECT * FROM grievances WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        args: [status, limit, offset],
      });
      countResult = await db.execute({
        sql: `SELECT COUNT(*) as count FROM grievances WHERE status = ?`,
        args: [status],
      });
    } else {
      result = await db.execute({
        sql: `SELECT * FROM grievances ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        args: [limit, offset],
      });
      countResult = await db.execute(`SELECT COUNT(*) as count FROM grievances`);
    }

    const total = Number(countResult.rows[0]?.count || 0);

    return {
      data: result.rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error fetching grievances:', error);
    return { data: [], total: 0, page, limit, totalPages: 0 };
  }
}

export async function updateGrievance(id: number, updates: Record<string, unknown>) {
  try {
    const { status, admin_notes } = updates;

    if (status) {
      await db.execute({
        sql: `UPDATE grievances SET status = ?, status_updated_at = datetime('now'), updated_at = datetime('now') WHERE id = ?`,
        args: [status as string, id],
      });
    }

    if (admin_notes !== undefined) {
      await db.execute({
        sql: `UPDATE grievances SET admin_notes = ?, updated_at = datetime('now') WHERE id = ?`,
        args: [admin_notes as string, id],
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating grievance:', error);
    return { success: false, error };
  }
}

export async function getStats() {
  try {
    const [total, pending, underReview, inProgress, resolved, closed, questionnaires] = await Promise.all([
      db.execute(`SELECT COUNT(*) as count FROM grievances`),
      db.execute(`SELECT COUNT(*) as count FROM grievances WHERE status = 'submitted'`),
      db.execute(`SELECT COUNT(*) as count FROM grievances WHERE status = 'under_review'`),
      db.execute(`SELECT COUNT(*) as count FROM grievances WHERE status = 'in_progress'`),
      db.execute(`SELECT COUNT(*) as count FROM grievances WHERE status = 'resolved'`),
      db.execute(`SELECT COUNT(*) as count FROM grievances WHERE status = 'closed'`),
      db.execute(`SELECT COUNT(*) as count FROM questionnaire_responses`),
    ]);

    return {
      total: Number(total.rows[0]?.count || 0),
      pending: Number(pending.rows[0]?.count || 0),
      underReview: Number(underReview.rows[0]?.count || 0),
      inProgress: Number(inProgress.rows[0]?.count || 0),
      resolved: Number(resolved.rows[0]?.count || 0),
      closed: Number(closed.rows[0]?.count || 0),
      questionnaires: Number(questionnaires.rows[0]?.count || 0),
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      total: 0,
      pending: 0,
      underReview: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0,
      questionnaires: 0,
    };
  }
}

export async function getRecentGrievances(limit = 5) {
  try {
    const result = await db.execute({
      sql: `SELECT id, tracking_code, grievance_type, status, created_at FROM grievances ORDER BY created_at DESC LIMIT ?`,
      args: [limit],
    });
    return result.rows;
  } catch (error) {
    console.error('Error fetching recent grievances:', error);
    return [];
  }
}

export function getQueueStatus() {
  return {
    queueLength: operationQueue.length,
    operations: operationQueue.map(op => ({
      id: op.id,
      type: op.type,
      attempts: op.attempts,
      createdAt: op.createdAt,
    })),
  };
}

export async function getAllQuestionnaireResponses() {
  try {
    const result = await db.execute(`
      SELECT * FROM questionnaire_responses
      ORDER BY submitted_at DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching questionnaire responses:', error);
    return [];
  }
}
