'use client';
import React, { useState } from 'react';

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 signup-form shadow-lg w-full max-w-md p-8 transition-all">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
        </div>

        {/* Form */}
        {isLogin ? (
          <form className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent dark:text-white text-gray-800 py-2 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent dark:text-white text-gray-800 py-2 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 signup-button font-semibold transition"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              Forgot password?{' '}
              <a href="#" className="text-orange-500 hover:underline">
                Click here
              </a>
            </p>
          </form>
        ) : (
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent dark:text-white text-gray-800 py-2 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent dark:text-white text-gray-800 py-2 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent dark:text-white text-gray-800 py-2 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent dark:text-white text-gray-800 py-2 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 signup-button font-semibold transition"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 font-semibold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
