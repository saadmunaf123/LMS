"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BookOpen,
  PlusCircle,
  TrendingUp,
  Star,
  GraduationCap,
} from "lucide-react";

interface Course {
  _id: string;
  title: string;
  rating: number;
  category: string;
  difficulty: string;
}

export default function HomeContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("provider_token");

    fetch("https://lms-backend-9jj7.onrender.com/api/courses/my-courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalCourses = courses.length;

  const beginnerCourses = courses.filter(
    (c) => c.difficulty === "Beginner"
  ).length;

  const advancedCourses = courses.filter(
    (c) => c.difficulty === "Advanced"
  ).length;

  const averageRating =
    totalCourses > 0
      ? (
          courses.reduce((acc, curr) => acc + curr.rating, 0) /
          totalCourses
        ).toFixed(1)
      : "0";

  return (
    <div className="flex-1">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white">
          Provider Dashboard
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
          Manage your courses, track performance and grow your learning platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {totalCourses}
          </h3>
          <p className="text-slate-500">Total Courses</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800">
          <GraduationCap className="w-10 h-10 text-green-600 mb-4" />
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {beginnerCourses}
          </h3>
          <p className="text-slate-500">Beginner Courses</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800">
          <TrendingUp className="w-10 h-10 text-purple-600 mb-4" />
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {advancedCourses}
          </h3>
          <p className="text-slate-500">Advanced Courses</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800">
          <Star className="w-10 h-10 text-yellow-500 mb-4" />
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {averageRating}
          </h3>
          <p className="text-slate-500">Average Rating</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 mb-10">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          Quick Actions
        </h2>

        <div className="flex gap-4">

          <Link
            href="/CourseProvider/addcourse"
            className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Course
          </Link>

          <Link
            href="/CourseProvider/courses"
            className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
          >
            <BookOpen className="w-5 h-5" />
            Manage Courses
          </Link>

        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            Recent Courses
          </h2>

          <Link
            href="/CourseProvider/courses"
            className="text-blue-600 font-semibold"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <p className="text-slate-500">Loading courses...</p>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">
              No courses uploaded yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {courses.slice(0, 5).map((course) => (
              <div
                key={course._id}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800"
              >
                <div>
                  <h3 className="font-bold dark:text-white">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {course.category}
                  </p>
                </div>

                <div className="flex items-center gap-6">

                  <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {course.difficulty}
                  </span>

                  <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                    <Star className="w-4 h-4 fill-current" />
                    {course.rating}
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}