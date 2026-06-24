"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiBook,
  FiUser,
  FiStar,
  FiTrash2,
  FiSearch,
} from "react-icons/fi";
import AdminNavbar from "@/components/Admin/Navbar";

interface ProviderInfo {
  name: string;
  email: string;
}

interface Course {
  _id: string;
  title: string;
  provider: ProviderInfo;
  image?: string;
  rating: number;
}

export default function CourseTablePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");

  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(
    null
  );

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  useEffect(() => {
    fetch("https://lms-backend-9jj7.onrender.com/api/courses/all")
      .then((res) => res.json())
      .then((data: Course[]) => setCourses(data))
      .catch(console.error);
  }, []);

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const token = sessionStorage.getItem("adminToken");

      const response = await fetch(
        `https://lms-backend-9jj7.onrender.com/api/courses/delete/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("DELETE STATUS:", response.status);
      console.log("DELETE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.error);
      }

      setCourses((prev) =>
        prev.filter((course) => course._id !== courseId)
      );

      setDeleteCourseId(null);

      setMessage("Course deleted successfully");
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      console.error(error);

      setMessage("Failed to delete course");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      course.provider?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 px-8 pb-8">

        {/* TOAST */}
        {message && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
            <div
              className={`px-6 py-4 rounded-xl shadow-2xl font-medium animate-in fade-in slide-in-from-top-2 ${messageType === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
                }`}
            >
              {message}
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Course Management
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage all courses uploaded by providers.
            </p>
          </div>

          {/* STATS + SEARCH */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">

            {/* TOTAL COURSES */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
              <p className="text-gray-500">
                Total Courses
              </p>

              <h2 className="text-4xl font-bold text-blue-600 mt-2">
                {courses.length}
              </h2>
            </div>

            {/* SEARCH */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
              <div className="relative">
                <FiSearch className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search course or provider..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    rounded-xl
                    border
                    border-gray-300
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-white
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">

                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2">
                        <FiBook />
                        Course
                      </div>
                    </th>

                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2">
                        <FiUser />
                        Provider
                      </div>
                    </th>

                    <th className="px-6 py-4 text-left">
                      Thumbnail
                    </th>

                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2">
                        <FiStar />
                        Rating
                      </div>
                    </th>

                    <th className="px-6 py-4 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <tr
                        key={course._id}
                        className="
                          border-t
                          border-gray-200
                          dark:border-gray-800
                          hover:bg-blue-50
                          dark:hover:bg-gray-800
                          transition
                        "
                      >
                        {/* TITLE */}
                        <td className="px-6 py-5">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {course.title}
                          </div>
                        </td>

                        {/* PROVIDER */}
                        <td className="px-6 py-5">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {course.provider?.name}
                          </div>

                          <div className="text-sm text-gray-500">
                            {course.provider?.email}
                          </div>
                        </td>

                        {/* IMAGE */}
                        <td className="px-6 py-5">
                          {course.image ? (
                            <Image
                              src={`data:image/jpeg;base64,${course.image}`}
                              alt={course.title}
                              width={120}
                              height={70}
                              className="rounded-lg object-cover shadow"
                            />
                          ) : (
                            <div className="w-[120px] h-[70px] rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-500">
                              No Image
                            </div>
                          )}
                        </td>

                        {/* RATING */}
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                            ⭐ {course.rating}
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td className="px-6 py-5">
                          {deleteCourseId === course._id ? (
                            <div className="flex gap-2 flex-wrap">

                              <button
                                onClick={() =>
                                  handleDeleteCourse(course._id)
                                }
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                              >
                                Yes, Delete
                              </button>

                              <button
                                onClick={() =>
                                  setDeleteCourseId(null)
                                }
                                className="px-4 py-2 rounded-lg bg-slate-300 text-slate-900 hover:bg-slate-400 transition"
                              >
                                Cancel
                              </button>

                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                setDeleteCourseId(course._id)
                              }
                              className="
                                flex items-center gap-2
                                px-4 py-2
                                rounded-lg
                                bg-red-100
                                text-red-600
                                hover:bg-red-200
                                transition
                              "
                            >
                              <FiTrash2 />
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-gray-500"
                      >
                        No courses found.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}