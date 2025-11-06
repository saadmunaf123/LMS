'use client';
import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const FeaturedCourses = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      {/* 🖥️ Large Devices — Original Vertical Sidebar */}
      <div className="hidden lg:flex flex-col gap-6">
        {/* 🔍 Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Search
          </h2>
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* 📂 Categories */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 mt-2">
            Categories
          </h2>
          <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
            {[
              'Web Development',
              'Data Science',
              'Artificial Intelligence',
              'UI/UX Design',
              'Machine Learning',
              'Marketing',
              'Linux',
              'Accounts',
            ].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <input type="checkbox" className="accent-emerald-600" />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* ⭐ Ratings */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Ratings
          </h2>
          <div className="flex flex-col gap-2">
            {[5, 4, 3].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <input type="checkbox" className="accent-emerald-600" />
                {rating} Stars & Up
              </label>
            ))}
          </div>
        </div>

        {/* 🎓 Difficulty */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Difficulty
          </h2>
          <div className="flex flex-col gap-2">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <input type="checkbox" className="accent-emerald-600" />
                {level}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 📱 Small & Medium Devices — Responsive Collapsible Layout */}
      <div className="flex flex-col gap-3 lg:hidden">
        {/* Top bar with Search + Filter Button */}
        <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-grow min-w-[200px] p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Collapsible Filter Panel */}
        {showFilters && (
          <div className="animate-slide-down bg-white dark:bg-slate-900 p-4 rounded-lg shadow-lg flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
            {/* 📂 Categories */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-2 max-h-[130px] overflow-y-auto custom-scrollbar">
                {[
                  'Web Dev',
                  'Data Sci',
                  'AI',
                  'UI/UX',
                  'ML',
                  'Marketing',
                  'Linux',
                  'Accounts',
                ].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm"
                  >
                    <input type="checkbox" className="accent-emerald-600" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* ⭐ Ratings */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
                Ratings
              </h3>
              <div className="flex flex-wrap gap-3">
                {[5, 4, 3].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm"
                  >
                    <input type="checkbox" className="accent-emerald-600" />
                    {rating}★ & Up
                  </label>
                ))}
              </div>
            </div>

            {/* 🎓 Difficulty */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
                Difficulty
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm"
                  >
                    <input type="checkbox" className="accent-emerald-600" />
                    {level}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCourses;
