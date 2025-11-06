'use client';
import CourseCards from '@/components/Home/CourseCards';
import FeaturedCourses from '@/components/Home/FeaturedCourses';
import React from 'react';

const HomeSection = () => {
  return (
    <section className="w-full py-10 bg-gray-50 dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">

      {/* Main container */}
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white">
            Featured <span className="text-orange-500">Courses</span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Discover our most popular and trending courses curated to boost your skills and career growth.
          </p>
        </div>

        {/* Filter + Cards layout */}
        <div className="flex flex-col md:flex-row gap-8 ">
          {/* Filter / Sidebar area */}
          <aside className="md:w-1/4 w-full p-2 rounded-lg shadow-md h-fit">
            <FeaturedCourses />
          </aside>

          {/* Course cards area */}
          <main className="flex-1 overflow-hidden">
            <CourseCards />
          </main>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
