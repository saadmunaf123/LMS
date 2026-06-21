"use client";
import React, { useState } from "react";

export default function AdminAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isLogin
      ? "http://lms-backend-9jj7.onrender.com/api/admin/login"
      : "http://lms-backend-9jj7.onrender.com/api/admin/signup";

    const body = isLogin
      ? { email, password }
      : { name, email, password };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    if (data.token) {
      sessionStorage.setItem("adminToken", data.token);
      alert("Login Successful");
      window.location.href = "/Admin/home";
    } else {
      alert("Signup Successful! Please login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {isLogin ? "Admin Login" : "Admin Signup"}
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
            />
          )}

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle */}
        <p className="mt-5 text-center text-gray-700 dark:text-gray-300">
          {isLogin ? "Don't have an admin account?" : "Already an admin?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
