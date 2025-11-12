// src/app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, otp } = body;

    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { success: false, message: 'Phone number and OTP are required' },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP format' },
        { status: 400 }
      );
    }

    if (!BACKEND_API_URL) {
      return NextResponse.json(
        { success: false, message: 'Backend API not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(`${BACKEND_API_URL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'Invalid OTP',
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token: data.token,
      user: {
        id: data.user.id,
        phoneNumber: data.user.phoneNumber,
        name: data.user.name,
      },
    });

  } catch (error) {
    console.error('Verify OTP API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}