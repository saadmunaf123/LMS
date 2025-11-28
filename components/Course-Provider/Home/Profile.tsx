'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Provider {
  _id: string;
  name: string;
  email: string;
}

const Profile = () => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = sessionStorage.getItem('provider_token');
    if (!token) {
      setError('Provider token not found. Please log in.');
      setLoading(false);
      return;
    }

    fetch('http://localhost:5000/api/provider/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error('Response body:', text);
          throw new Error('Failed to fetch provider info');
        }
        return res.json();
      })
      .then((data) => {
        setProvider(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load profile.');
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('provider_token');
    window.location.href = '/CourseProvider/signup'; // redirect to login
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-700 dark:text-gray-300 text-lg">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 text-lg">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 max-w-sm w-full text-center border border-gray-200 dark:border-gray-700">
        <Image
          src="https://i.pravatar.cc/150?img=32"
          alt="Profile Image"
          width={140}
          height={140}
          className="rounded-full shadow-lg mb-6"
        />

        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-400">
          {provider?.name}
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
          {provider?.email}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Course Provider
        </p>

        <div className="mt-8 space-y-4">
          <button className="w-full bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-700
                       dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors duration-200">
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-100 dark:bg-red-700 text-red-600 dark:text-red-200 py-3 rounded-xl font-semibold hover:bg-red-200 dark:hover:bg-red-600 transition-all shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
