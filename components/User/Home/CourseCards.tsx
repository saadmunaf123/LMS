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
  selectedRatings: number[];
  searchTerm: string;
}

const CourseCards = ({ selectedCategories, selectedDifficulties, selectedRatings, searchTerm }: CourseCardsProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const topContainerRef = useRef<HTMLDivElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);

  // Scroll functions for each section
  const scrollLeftTop = () => topContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRightTop = () => topContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  const scrollLeftBottom = () => bottomContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRightBottom = () => bottomContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  useEffect(() => {
    // fetch("http://localhost:5000/api/courses/all")
    setLoading(true);

    fetch("https://lms-backend-9jj7.onrender.com/api/courses/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Courses fetched:", data);
        setCourses(Array.isArray(data) ? data : []);
      })

      .catch(err => {
        console.error(err);
        setCourses([]);
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter((course) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.some(category => category.toLowerCase() === course.category?.toLowerCase());

    const difficultyMatch =
      selectedDifficulties.length === 0 ||
      selectedDifficulties.some(
        difficulty =>
          difficulty.toLowerCase() === course.difficulty?.toLowerCase()
      );

    const ratingMatch =
      selectedRatings.length === 0 ||
      selectedRatings.some
        (rating =>
          course.rating >= rating
        );

    const searchMatch =
      searchTerm.trim() === '' ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.provider?.name.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && difficultyMatch && ratingMatch && searchMatch;
  })

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-4xl shadow-md overflow-hidden flex-shrink-0 w-[260px] h-[230px] animate-pulse">

      <div className="w-full h-[60%] bg-gray-300 dark:bg-gray-700"></div>

      <div className="p-3 h-[40%] flex flex-col justify-between">
        <div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>

        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
      </div>

    </div>
  );
};


  return (
    <section className="container py-10 relative space-y-16">

      {/* BOTTOM SECTION */}
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Courses
        </h2>

        {loading && (
          <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Loading courses...
          </div>
        )}

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
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
            : filteredCourses.map((course) => (
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

      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          All Courses
        </h2>

        {loading && (
          <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Loading courses...
          </div>
        )}

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
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
            : courses.map((course) => (
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

    </section>
  );
};

export default CourseCards;
