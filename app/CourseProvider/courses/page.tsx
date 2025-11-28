'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Edit } from 'lucide-react';
import Footer from '@/components/Course-Provider/Footer';
import Navbar from '@/components/Course-Provider/Navbar';

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

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = sessionStorage.getItem('provider_token');
    // if (!token) {
    //   setError('Provider token not found. Please log in.');
    //   setLoading(false);
    //   return;
    // }

    fetch('http://localhost:5000/api/courses/my-courses', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error('Response body:', text);
          throw new Error('Failed to fetch provider courses');
        }
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

  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-200 text-green-900';
      case 'Intermediate':
        return 'bg-yellow-200 text-yellow-900';
      case 'Advanced':
        return 'bg-red-200 text-red-900';
      default:
        return 'bg-gray-200 text-gray-900';
    }
  };

  const renderCourseCard = (course: Course) => (
    <div
      key={course._id}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl w-full sm:w-[260px] md:w-[280px] lg:w-[300px]"
    >
      <div className="relative w-full h-48">
        <Image
          src={`data:image/jpeg;base64,${course.image}`}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
          {course.title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
          By {course.provider?.name || "Unknown"}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadgeColor(
                course.difficulty
              )}`}
            >
              {course.difficulty}
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-200">
              {course.category || "General"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-yellow-500 font-semibold">
            <Star className="w-4 h-4 fill-current" />
            {course.rating.toFixed(1)}
          </div>
        </div>

        {/* 👉 NEW BUTTON — View Chapters */}
        <Link
          href={`/CourseProvider/coursechapters/${course._id}`}
          className="mt-3 inline-block w-full text-center py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition"
        >
          📖 View Chapters
        </Link>

        {/* Update Course */}
        <Link
          href={`/CourseProvider/courses/update/${course._id}`}
          className="mt-3 inline-block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
        >
          <Edit className="w-4 h-4 inline mr-1" /> Update
        </Link>
      </div>
    </div>
  );


  if (loading)
    return (
      <div className="text-center py-20 text-gray-700 dark:text-gray-300 text-lg">
        Loading courses...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-500 text-lg">{error}</div>
    );
  if (courses.length === 0)
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
        No courses uploaded yet.
      </div>
    );

  return (
    <div>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Your Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {courses.map(renderCourseCard)}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Courses;
