"use client";

import Footer from "@/components/Course-Provider/Footer";
import HomeContent from "@/components/Course-Provider/Home/HomeContent";
import Profile from "@/components/Course-Provider/Home/Profile";
import Navbar from "@/components/Course-Provider/Navbar";

export default function ProviderHome() {
  return (
    <>
      {/* Mobile Block */}
      <div className="lg:hidden min-h-screen flex items-center justify-center bg-slate-950 p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center max-w-md">
          <h2 className="text-3xl font-bold text-white mb-4">
            Desktop Required
          </h2>

          <p className="text-slate-400">
            The Course Provider Dashboard is available only on desktop devices.
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block min-h-screen bg-slate-100 dark:bg-slate-950">
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex gap-8 items-start">
            <Profile />
            <HomeContent />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}