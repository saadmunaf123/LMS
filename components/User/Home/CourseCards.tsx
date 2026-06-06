'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';


interface Course {
  _id: string;
  title: string;
  provider: { 
    _id: string;
    name: string;
    email: string;
  };
  image: string;
  rating: number;
  category: string;
  difficulty: string;
}

interface CourseCardsProps {
  selectedCategories: string[];
  selectedDifficulties: string[];
}

const CourseCards = ({ selectedCategories, selectedDifficulties}: CourseCardsProps) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const topContainerRef = useRef<HTMLDivElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);

  // Scroll functions for each section
  const scrollLeftTop = () => topContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRightTop = () => topContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  const scrollLeftBottom = () => bottomContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRightBottom = () => bottomContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

useEffect(() => {
  // fetch("http://localhost:5000/api/courses/all")
  fetch("https://lms-backend-9jj7.onrender.com/api/courses/all")
    .then((res) => res.json())
    .then((data) => {
      console.log("Courses fetched:", data);
      setCourses(Array.isArray(data) ? data : []);
    })
    .catch(err => {
      console.error(err);
      setCourses([]);
    });
}, []);

const filteredCourses = courses.filter((course) => {
  const categoryMatch = 
  selectedCategories.length === 0 || selectedCategories.includes(course.category);

  const difficultyMatch = selectedDifficulties.length === 0 ||
  selectedDifficulties.includes(course.difficulty);

  return categoryMatch && difficultyMatch;
})


  return (
    <section className="container py-10 relative space-y-16">
      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Popular Courses
        </h2>

        {/* Scroll Buttons */}
        <button
          onClick={scrollLeftTop}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>

        <button
          onClick={scrollRightTop}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={topContainerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth hide-scrollbar pb-3 snap-x snap-mandatory relative z-10"
        >
          {courses.map((course) => (
            <div
              key={course._id}
              className="group bg-white dark:bg-gray-800 rounded-4xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden snap-center flex-shrink-0 w-[260px] h-[230px] flex flex-col"
            >
              <Link href={`/User/courses/${course._id}`} className="block w-full h-full">
              <div className="relative w-full h-[60%] overflow-hidden">
                <Image
                  src={`data:image/jpeg;base64,${course.image}`}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="p-3 flex flex-col justify-between h-[40%]">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white mb-1 truncate">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    By {course.provider?.name}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 mt-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-800 dark:text-gray-200 text-sm">
                    {course.rating}
                  </span>
                </div>
              </div>
              </Link>
            </div>
          ))}
          <div className="flex-shrink-0 w-4"></div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Filtered Courses
        </h2>

        {/* Scroll Buttons */}
        <button
          onClick={scrollLeftBottom}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>

        <button
          onClick={scrollRightBottom}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>

        {/* Filtered Cards */}
        <div
          ref={bottomContainerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth hide-scrollbar pb-3 snap-x snap-mandatory relative z-10"
        >
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="group bg-white dark:bg-gray-800 rounded-4xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden snap-center flex-shrink-0 w-[260px] h-[230px] flex flex-col"
            >
              <div className="relative w-full h-[60%] overflow-hidden">
                <Image
                  src={`data:image/jpeg;base64,${course.image}`}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="p-3 flex flex-col justify-between h-[40%]">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white mb-1 truncate">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    By {course.provider?.name}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 mt-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-800 dark:text-gray-200 text-sm">
                    {course.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-4"></div>
        </div>
      </div>
    </section>
  );
};

export default CourseCards;
