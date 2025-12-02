"use client";
import React, { useState } from "react";

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const API_BASE = "https://lms-backend-9jj7.onrender.com";
  const url = isLogin
    ? `${API_BASE}/api/student/login`
    : `${API_BASE}/api/student/signup`;


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    const url = isLogin
      ? `${API_BASE}/api/student/login`
      : `${API_BASE}/api/student/signup`;

    const body = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      // Save token for login
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("storage"));
        alert("Login Successful");
        window.location.href = "/";
      } else {
        alert("Signup successful! Please login now.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 signup-form shadow-lg w-full max-w-md p-8 transition-all">

        {/* Header */}
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent dark:text-white py-2 focus:outline-none focus:border-orange-500"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent dark:text-white py-2 focus:outline-none focus:border-orange-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent dark:text-white py-2 focus:outline-none focus:border-orange-500"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent dark:text-white py-2 focus:outline-none focus:border-orange-500"
            />
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white p-3 font-semibold transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
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
