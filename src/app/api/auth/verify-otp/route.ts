// src/app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 🔴 TODO: Replace with your actual backend API URL
const BACKEND_API_URL = 'https://your-backend-api.com/api/auth/verify-otp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, otp } = body;

    // Validate input
    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { success: false, message: 'Phone number and OTP are required' },
        { status: 400 }
      );
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP format' },
        { status: 400 }
      );
    }

    // 🔴 TODO: Call your actual backend API
    // Example API call:
    const response = await fetch(BACKEND_API_URL, {
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

    // Return success response with token
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token: data.token, // JWT token from your backend
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

// ============================================
// 📝 BACKEND API REQUIREMENTS
// ============================================
//
// Your backend API should accept POST requests to /api/auth/verify-otp
// with the following JSON body:
//
// {
//   "phoneNumber": "+919876543210",
//   "otp": "123456"
// }
//
// And return:
//
// SUCCESS (200):
// {
//   "success": true,
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
//   "user": {
//     "id": "user123",
//     "phoneNumber": "+919876543210",
//     "name": "John Doe" // Optional, may be null for new users
//   }
// }
//
// ERROR (400/401):
// {
//   "success": false,
//   "message": "Invalid or expired OTP"
// }
//
// INTEGRATION NOTES:
// - Verify OTP against stored hash in database/cache
// - Check if OTP has expired (5 minutes)
// - Delete OTP after successful verification
// - Generate JWT token for authenticated session
// - If user doesn't exist, create new user account
// - Implement attempt limiting (max 5 wrong attempts)
//
// ============================================