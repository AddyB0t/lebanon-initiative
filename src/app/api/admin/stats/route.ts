import { NextRequest, NextResponse } from 'next/server';
import { getStats, initializeDatabase, getQueueStatus, getRecentGrievances } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const adminAuth = request.cookies.get('admin_auth');
    if (adminAuth?.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initializeDatabase();

    // Get stats
    const stats = await getStats();

    // Get recent grievances using Turso
    const recent = await getRecentGrievances(5);

    // Get queue status for debugging
    const queueStatus = getQueueStatus();

    return NextResponse.json({
      stats,
      recent,
      queue: queueStatus, // Helpful for debugging
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
