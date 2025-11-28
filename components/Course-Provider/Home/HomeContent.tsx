import Link from 'next/link'
import React from 'react'

const HomeContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6 m-0">
      
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-teal-600 dark:text-teal-500 mb-4">
        Course Provider Panel
      </h1>

      {/* Description */}
      <p className="text-gray-600 max-w-xl text-lg mb-10">
        Welcome! This portal is exclusively for companies and organizations that provide courses.
        Upload, manage, and showcase your courses easily.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-6">
        <Link
          href="/CourseProvider/courses"
          className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-700
                       dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors duration-200 shadow"
        >
          View Courses
        </Link>

        <Link
          href="/CourseProvider/addcourse"
          className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          Add New Course
        </Link>
      </div>

    </div>
  )
}

export default HomeContent
