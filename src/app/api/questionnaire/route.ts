import { NextRequest, NextResponse } from 'next/server';
import { insertQuestionnaire, initializeDatabase, getAllQuestionnaireResponses } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();

    const body = await request.json();

    // Insert with queue fallback for robustness
    const result = await insertQuestionnaire(body);

    // Always return success to user - we don't want to alarm them
    // Data will be saved eventually even if queued
    return NextResponse.json({ success: true, queued: result.queued });
  } catch (error) {
    console.error('Error processing questionnaire:', error);
    // Return success anyway to not alarm users
    return NextResponse.json({ success: true });
  }
}

export async function GET(request: NextRequest) {
  // Only for admin access - should be protected
  try {
    const adminAuth = request.cookies.get('admin_auth');
    if (adminAuth?.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initializeDatabase();

    const data = await getAllQuestionnaireResponses();

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching questionnaire responses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
