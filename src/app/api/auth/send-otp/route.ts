// src/app/api/auth/send-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 🔴 TODO: Replace with your actual backend API URL
const BACKEND_API_URL = 'https://your-backend-api.com/api/auth/send-otp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    // Validate phone number
    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate phone number format (+91XXXXXXXXXX)
    const phoneRegex = /^\+91\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format' },
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
      body: JSON.stringify({ phoneNumber }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'Failed to send OTP',
        },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      expiresIn: 300, // 5 minutes in seconds
    });

  } catch (error) {
    console.error('Send OTP API error:', error);
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
// Your backend API should accept POST requests to /api/auth/send-otp
// with the following JSON body:
//
// {
//   "phoneNumber": "+919876543210"
// }
//
// And return:
//
// SUCCESS (200):
// {
//   "success": true,
//   "message": "OTP sent successfully",
//   "expiresIn": 300
// }
//
// ERROR (400/429):
// {
//   "success": false,
//   "message": "Too many attempts. Please try again later."
// }
//
// INTEGRATION NOTES:
// - Use SMS gateway like Twilio, MSG91, or AWS SNS
// - Store OTP in database/cache (Redis) with expiry (5 minutes)
// - Implement rate limiting (max 3 attempts per 10 minutes)
// - Hash the OTP before storing for security
//
// ============================================