'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; picture?: string; phoneNumber?: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userString = localStorage.getItem('user');

    if (!authToken || !userString) {
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(userString);
      setUser(userData);
      setName(userData.name || '');
    } catch (error) {
      router.push('/login');
    }
  }, [router]);

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-3">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Profile</li>
          </ol>
        </nav>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-4">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-4 border-white flex items-center justify-center text-3xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-white/80">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
                </div>

                {user.phoneNumber && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">{user.phoneNumber}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setName(user.name || '');
                    }}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/watchlist"
                  className="flex items-center gap-2 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg hover:shadow-md transition-shadow border border-indigo-200 dark:border-indigo-700"
                >
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Watchlist</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Saved IPOs</div>
                  </div>
                </Link>

                <Link
                  href="/ongoing"
                  className="flex items-center gap-2 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg hover:shadow-md transition-shadow border border-green-200 dark:border-green-700"
                >
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Live IPOs</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Open Now</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Logout */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
