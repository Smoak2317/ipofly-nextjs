'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the token from URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
      // Send token back to parent window
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'GOOGLE_AUTH_SUCCESS',
            credential: accessToken,
          },
          window.location.origin
        );
        window.close();
      } else {
        // Fallback: redirect to home if not opened as popup
        router.push('/');
      }
    } else {
      // No token, redirect to login
      router.push('/login');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
          Completing sign in...
        </p>
      </div>
    </div>
  );
}