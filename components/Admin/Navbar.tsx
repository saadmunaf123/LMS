"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    window.location.href = "/Admin";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`transition-all duration-300 fixed top-0 left-0 w-full z-50 
      ${
        isSticky
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/Admin/home"
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          Admin Panel
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/Admin/home" className="nav-link">Dashboard</Link>
          <Link href="/Admin/allcourses" className="nav-link">Courses</Link>
          <Link href="/Admin/providers" className="nav-link">Provider</Link>
          <Link href="/Admin/students" className="nav-link">Student</Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {open ? (
            <X className="w-6 h-6 text-gray-800 dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">

          <Link href="/Admin/home" className="mobile-link">Dashboard</Link>
          <Link href="/Admin/allcourses" className="mobile-link">Courses</Link>
          <Link href="/Admin/providers" className="mobile-link">Provider</Link>
          <Link href="/Admin/students" className="mobile-link">Student</Link>

          {/* Mobile Logout */}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-3 bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
}
