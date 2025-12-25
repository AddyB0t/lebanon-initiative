import { NextRequest, NextResponse } from 'next/server';
import { getAllGrievances, updateGrievance, initializeDatabase } from '@/lib/db';

// Middleware to check admin authentication
function checkAdminAuth(request: NextRequest): boolean {
  const adminAuth = request.cookies.get('admin_auth');
  return adminAuth?.value === 'true';
}

export async function GET(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initializeDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await getAllGrievances(status, page, limit);

    return NextResponse.json({
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Admin grievances error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initializeDatabase();

    const { id, status, admin_notes } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Grievance ID is required' },
        { status: 400 }
      );
    }

    const result = await updateGrievance(id, { status, admin_notes });

    if (result.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Failed to update grievance' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Admin update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
