"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  BookOpen,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-20">

      {/* Gradient Border */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600" />

      <div className="max-w-7xl mx-auto px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              StudyStream
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Empowering educators and organizations to create,
              manage and deliver high-quality learning experiences.
            </p>

            <div className="flex gap-3 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-110 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-110 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-110 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-110 transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>

            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-5">
              Navigation
            </h3>

            <div className="space-y-3">

              <Link
                href="/CourseProvider/providerhome"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <Link
                href="/CourseProvider/courses"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 transition"
              >
                My Courses
              </Link>

              <Link
                href="/CourseProvider/addcourse"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 transition"
              >
                Add Course
              </Link>

            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-5">
              Quick Actions
            </h3>

            <div className="space-y-4">

              <Link
                href="/CourseProvider/providerhome"
                className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-cyan-600 transition"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>

              <Link
                href="/CourseProvider/courses"
                className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-cyan-600 transition"
              >
                <BookOpen className="w-5 h-5" />
                Manage Courses
              </Link>

              <Link
                href="/CourseProvider/addcourse"
                className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-cyan-600 transition"
              >
                <PlusCircle className="w-5 h-5" />
                Create Course
              </Link>

            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-5">
              Stay Updated
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Receive product updates and new feature announcements.
            </p>

            <div className="flex flex-col gap-3">

              <div className="relative">

                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Subscribe
              </button>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} StudyStream. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">

            <a
              href="#"
              className="text-slate-500 hover:text-blue-600 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-slate-500 hover:text-blue-600 transition"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="text-slate-500 hover:text-blue-600 transition"
            >
              Support
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}