import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return NextResponse.json(
        { success: false, message: 'ID token is required' },
        { status: 400 }
      );
    }

    if (!BACKEND_API_URL) {
      return NextResponse.json(
        { success: false, message: 'Backend API not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(`${BACKEND_API_URL}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'Google login failed',
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token: data.token,
      refreshToken: data.refreshToken,
      user: data.user,
    });

  } catch (error) {
    console.error('Google login API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}