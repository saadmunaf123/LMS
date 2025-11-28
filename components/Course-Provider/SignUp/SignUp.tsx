"use client";

import { useState } from "react";

export default function ProviderAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate confirm password only for signup
    if (!isLogin && form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    const url = isLogin
      ? "http://localhost:5000/api/provider/login"
      : "http://localhost:5000/api/provider/signup";

    const body = isLogin
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };

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

      if (isLogin) {
        // Store provider token
        sessionStorage.setItem("provider_token", data.token);

        // Sync navbar
        window.dispatchEvent(new Event("storage"));

        alert("Login successful");
        window.location.href = "/CourseProvider/providerhome";
      } else {
        alert("Signup successful, please login!");
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 shadow-lg w-full max-w-md p-8 rounded-lg">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {isLogin ? "Provider Login" : "Provider Signup"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name field only in signup */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="border-b bg-transparent border-gray-400 dark:border-gray-600 py-2 dark:text-white"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="border-b bg-transparent border-gray-400 dark:border-gray-600 py-2 dark:text-white"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border-b bg-transparent border-gray-400 dark:border-gray-600 py-2 dark:text-white"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Confirm password only in signup */}
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="border-b bg-transparent border-gray-400 dark:border-gray-600 py-2 dark:text-white"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Button */}
        <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline font-semibold"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
