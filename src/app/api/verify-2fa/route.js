import { NextResponse } from 'next/server';

export async function POST(request) {
  const { verificationCode } = await request.json();

  // Add logic to verify 2FA code
  // Check if the code is valid and matches the stored code

  return NextResponse.json({ message: '2FA verification successful' });
}
