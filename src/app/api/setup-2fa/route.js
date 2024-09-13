import { NextResponse } from 'next/server';

export async function POST(request) {
  const { phoneNumber, email } = await request.json();

  // Add logic to set up 2FA for the user
  // Save phoneNumber and/or email for 2FA

  return NextResponse.json({ message: '2FA setup successful' });
}
