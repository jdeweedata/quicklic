import { NextResponse } from 'next/server';
import { NPSClient } from '@/lib/api/nps-client';

export async function POST(request: Request) {
  try {
    const { scanData } = await request.json();
    const npsClient = new NPSClient();
    const result = await npsClient.verifyLicense(scanData);

    return NextResponse.json(result);
  } catch (error) {
    console.error('License verification failed:', error);
    return NextResponse.json(
      { error: 'License verification failed' },
      { status: 500 }
    );
  }
}