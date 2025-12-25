import { NextRequest, NextResponse } from 'next/server';
import { insertGrievance, getGrievanceByTrackingCode, initializeDatabase } from '@/lib/db';

function generateTrackingCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 12; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    // Ensure database is initialized
    await initializeDatabase();

    const body = await request.json();

    const {
      complainantName,
      complainantEmail,
      complainantPhone,
      isAnonymous,
      villageId,
      customLocation,
      grievanceType,
      description,
      incidentDate,
      preferredLanguage,
    } = body;

    // Generate a unique tracking code
    const trackingCode = generateTrackingCode();

    // Insert with queue fallback for robustness
    const result = await insertGrievance({
      tracking_code: trackingCode,
      complainant_name: isAnonymous ? null : complainantName,
      complainant_email: isAnonymous ? null : complainantEmail,
      complainant_phone: isAnonymous ? null : complainantPhone,
      is_anonymous: isAnonymous || false,
      village_id: villageId || null,
      custom_location: customLocation || null,
      grievance_type: grievanceType,
      description,
      incident_date: incidentDate || null,
      preferred_language: preferredLanguage || 'ar',
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        trackingCode,
        grievanceId: result.id,
        queued: result.queued, // Let client know if it was queued
      });
    }

    return NextResponse.json(
      { error: 'Failed to submit grievance' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error processing grievance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await initializeDatabase();

    const { searchParams } = new URL(request.url);
    const trackingCode = searchParams.get('trackingCode');

    if (!trackingCode) {
      return NextResponse.json(
        { error: 'Tracking code is required' },
        { status: 400 }
      );
    }

    const data = await getGrievanceByTrackingCode(trackingCode);

    if (!data) {
      return NextResponse.json(
        { error: 'Grievance not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching grievance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
