"use client";

import { useState } from "react";

export default function ProviderAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
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
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    const url = isLogin
      ? "https://lms-backend-9jj7.onrender.com/api/provider/login"
      : "https://lms-backend-9jj7.onrender.com/api/provider/signup";

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
        setMessage(data.error || "Something went wrong");
        setMessageType("error");
        return;
      }

      if (isLogin) {
        // Store provider token
        sessionStorage.setItem("provider_token", data.token);

        // Sync navbar
        window.dispatchEvent(new Event("storage"));

        setMessage("Login successful");
        setMessageType("success");
        window.location.href = "/CourseProvider/providerhome";
      } else {
        setMessage("Signup successful, please login!");
        setMessageType("success");
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
      setMessage("Server error");
      setMessageType("error");
    }
  };

  return (
    <>
          {/* Mobile View */}
      <div className="lg:hidden flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Mobile View Not Supported
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            This page is not optimized for mobile devices. Please use a larger device to access this page.
          </p>
        </div>
      </div>
    {/* Desktop View */}
    <div className="hidden lg:flex min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
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

                  {/* Message */}
        {message && (
          <div className={`mb-4 p-2 rounded-md ${messageType === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
            {message}
          </div>
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
    </>
  );
}
