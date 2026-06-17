"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  LogOut,
  ShieldCheck,
} from "lucide-react";

interface Provider {
  _id: string;
  name: string;
  email: string;
}

export default function Profile() {
  const [provider, setProvider] = useState<Provider | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("provider_token");

    fetch("https://lms-backend-9jj7.onrender.com/api/provider/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setProvider)
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("provider_token");
    window.location.href = "/CourseProvider/signup";
  };

  return (
    <div className="w-[340px]">

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 sticky top-24">

        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <User className="w-14 h-14 text-white" />
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold dark:text-white">
          {provider?.name}
        </h2>

        <div className="flex items-center justify-center gap-2 mt-3 text-slate-500">
          <Mail className="w-4 h-4" />
          {provider?.email}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-green-600 font-semibold">
          <ShieldCheck className="w-5 h-5" />
          Verified Provider
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition"
        >
          <div className="flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </div>
        </button>

      </div>

    </div>
  );
}