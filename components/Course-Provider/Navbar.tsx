"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const navitem = [
  { name: "Home", href: "/" },
  { name: "Enrollers", href: "/contact" },
  { name: "Contact Us", href: "/aboutus" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    const checkAuth = () => {
      const token = sessionStorage.getItem("provider_token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("provider_token");

    setIsLoggedIn(false);

    window.dispatchEvent(new Event("storage"));

    router.push("/CourseProvider/signup");
  };

  return (
    <nav
      className={`transition-all duration-300 z-50 ${
        isSticky
          ? "fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
          : "relative bg-white dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
        >
          StudyStream
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-900 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navitem.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="relative text-gray-700 dark:text-gray-300 font-medium pb-1 transition-colors duration-200 hover:text-teal-600 dark:hover:text-teal-400 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-teal-500 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
            >
              {item.name}
            </a>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  router.push("/CourseProvider/providerhome")
                }
                className="flex items-center gap-2 px-5 py-2 rounded-xl border border-teal-500 text-teal-600 font-semibold hover:bg-teal-50 dark:hover:bg-gray-800 transition"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                router.push("/CourseProvider/signup")
              }
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition"
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 space-y-4">
          {navitem.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-800 dark:text-gray-200 font-medium hover:text-teal-600 dark:hover:text-teal-400"
            >
              {item.name}
            </a>
          ))}

          {isLoggedIn ? (
            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/CourseProvider/providerhome");
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-teal-500 text-teal-600 font-semibold"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 text-white font-semibold"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                router.push("/CourseProvider/signup")
              }
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-3 rounded-xl"
            >
              Login / Signup
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;