"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiBook, FiUser, FiStar } from "react-icons/fi";

// PROVIDER IS POPULATED → { name, email }
interface ProviderInfo {
  name: string;
  email: string;
}

interface Course {
  _id: string;
  title: string;
  provider: ProviderInfo;   // UPDATED & CORRECT
  image?: string;
  rating: number;
}

export default function CourseTablePage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses/all")
      .then((res) => res.json())
      .then((data: Course[]) => setCourses(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        All Courses
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">

              {/* TITLE */}
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200 font-semibold">
                <div className="flex items-center gap-1">
                  <FiBook /> Title
                </div>
              </th>

              {/* PROVIDER */}
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200 font-semibold">
                <div className="flex items-center gap-1">
                  <FiUser /> Provider
                </div>
              </th>

              {/* IMAGE */}
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200 font-semibold">
                Image
              </th>

              {/* RATING */}
              <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200 font-semibold">
                <div className="flex items-center gap-1">
                  <FiStar /> Rating
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course._id}
                className={
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-700"
                }
              >
                {/* TITLE */}
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                  {course.title}
                </td>

                {/* PROVIDER NAME */}
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {course.provider?.name || "Unknown"}
                </td>

                {/* IMAGE */}
                <td className="px-6 py-4 flex items-center">
                  {course.image ? (
                    <Image
                      src={`data:image/jpeg;base64,${course.image}`}
                      alt={course.title}
                      width={100}
                      height={60}
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-14 bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-sm text-gray-500 dark:text-gray-300 rounded">
                      No Image
                    </div>
                  )}
                </td>

                {/* RATING */}
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-semibold">
                  {course.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
