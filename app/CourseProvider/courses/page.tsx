'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Edit,
  Trash2,
  BookOpen,
  Search,
  GraduationCap,
  Layers,
  TrendingUp,
} from 'lucide-react';

import Navbar from '@/components/Course-Provider/Navbar';
import Footer from '@/components/Course-Provider/Footer';

interface Course {
  _id: string;
  title: string;
  provider?: {
    _id: string;
    name: string;
    email: string;
  };
  image: string;
  rating: number;
  category: string;
  difficulty: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    const token = sessionStorage.getItem('provider_token');

    fetch('http://lms-backend-9jj7.onrender.com/api/courses/my-courses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch courses');
        return res.json();
      })
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load courses.');
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === 'All' ||
      course.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  const beginnerCount = courses.filter(
    (c) => c.difficulty === 'Beginner'
  ).length;

  const intermediateCount = courses.filter(
    (c) => c.difficulty === 'Intermediate'
  ).length;

  const advancedCount = courses.filter(
    (c) => c.difficulty === 'Advanced'
  ).length;

  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';

      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';

      case 'Advanced':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const token = sessionStorage.getItem('provider_token');

      const response = await fetch(
        `http://lms-backend-9jj7.onrender.com/api/courses/delete/${courseId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete course');
      }

      setCourses((prev) =>
        prev.filter((course) => course._id !== courseId)
      );

      setDeleteCourseId(null);

      setMessage('Course deleted successfully');
      setMessageType('success');

      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);

    } catch (error) {
      console.error(error);

      setMessage('Failed to delete course');
      setMessageType('error');

      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    }
  };

  return (
    <div>
      <Navbar />

      <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
        <div className="max-w-7xl mx-auto">

          {/* HERO */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 md:p-10 text-white shadow-xl mb-10">
            <h1 className="text-4xl md:text-5xl font-bold">
              My Courses Dashboard
            </h1>

            <p className="mt-3 text-blue-100 text-lg">
              Manage, update and monitor all your published courses.
            </p>
          </div>

          {message && (
            <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce">
              <div
                className={`min-w-[300px] text-center px-6 py-4 rounded-xl shadow-2xl font-medium ${messageType === 'success'
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                  }`}
              >
                {message}
              </div>
            </div>
          )}

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">Total Courses</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {courses.length}
                  </h2>
                </div>
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">Beginner</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {beginnerCount}
                  </h2>
                </div>
                <GraduationCap className="w-10 h-10 text-green-600" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">Intermediate</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {intermediateCount}
                  </h2>
                </div>
                <Layers className="w-10 h-10 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">Advanced</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {advancedCount}
                  </h2>
                </div>
                <TrendingUp className="w-10 h-10 text-red-500" />
              </div>
            </div>
          </div>

          {/* SEARCH + FILTER */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg mb-10">
            <div className="flex flex-col md:flex-row gap-4">

              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={difficultyFilter}
                onChange={(e) =>
                  setDifficultyFilter(e.target.value)
                }
                className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none"
              >
                <option>All</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-20 text-lg">
              Loading courses...
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="text-center text-red-500 py-20">
              {error}
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            filteredCourses.length === 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center shadow-lg">
                <BookOpen className="w-16 h-16 mx-auto text-slate-400 mb-4" />

                <h3 className="text-2xl font-bold mb-2">
                  No Courses Found
                </h3>

                <p className="text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}

          {/* COURSES GRID */}
          {!loading &&
            !error &&
            filteredCourses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {filteredCourses.map((course) => (
                  <div
                    key={course._id}
                    className="
                    group
                    bg-white
                    dark:bg-slate-900
                    rounded-3xl
                    overflow-hidden
                    shadow-lg
                    hover:shadow-2xl
                    hover:-translate-y-2
                    transition-all
                    duration-300
                  "
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={`data:image/jpeg;base64,${course.image}`}
                        alt={course.title}
                        fill
                        className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-110
                      "
                      />
                    </div>

                    <div className="p-6">

                      <h3 className="text-xl font-bold mb-2 truncate">
                        {course.title}
                      </h3>

                      <p className="text-slate-500 text-sm mb-4">
                        By {course.provider?.name || 'Unknown'}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
                            course.difficulty
                          )}`}
                        >
                          {course.difficulty}
                        </span>

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {course.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-5">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">
                          {course.rating.toFixed(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3">

                        <Link
                          href={`/CourseProvider/coursechapters/${course._id}`}
                          className="
                          text-center
                          py-3
                          rounded-xl
                          bg-purple-600
                          hover:bg-purple-700
                          text-white
                          font-medium
                          transition
                        "
                        >
                          Chapters
                        </Link>

                        <Link
                          href={`/CourseProvider/courses/update/${course._id}`}
                          className=" text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition flex items-center justify-center gap-2">
                          <Edit className="w-4 h-4" />
                          Update
                        </Link>
                        <button
                          onClick={() => setDeleteCourseId(course._id)}
                          className="py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition flex items-center justify-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                      {deleteCourseId === course._id && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                          <p className="text-sm text-red-700 mb-3">
                            Delete this course permanently?
                          </p>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteCourse(course._id)}
                              className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >
                              Yes, Delete
                            </button>

                            <button
                              onClick={() => setDeleteCourseId(null)}
                              className="flex-1 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:hover:bg-slate-700 transition">
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </section>

      <Footer />
    </div>
  );
}