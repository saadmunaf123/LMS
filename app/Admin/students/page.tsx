"use client";

import AdminNavbar from "@/components/Admin/Navbar";
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiBook,
  FiUsers,
  FiSearch,
} from "react-icons/fi";

interface Student {
  _id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
}

export default function StudentListPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://lms-backend-9jj7.onrender.com/api/student/all")
      .then((res) => res.json())
      .then((data) => setStudents(data.students))
      .catch((err) => console.log(err));
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
    <AdminNavbar/>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 px-8 pb-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Student Management
          </h1>

          <p className="text-gray-500 mt-2">
            View all registered students
          </p>
        </div>

        {/* STATS + SEARCH */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* TOTAL STUDENTS */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">

              <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900">
                <FiUsers className="text-blue-600 text-2xl" />
              </div>

              <div>
                <p className="text-gray-500">
                  Total Students
                </p>

                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {students.length}
                </h2>
              </div>

            </div>
          </div>

          {/* SEARCH */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">

            <div className="relative">
              <FiSearch className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search student..."
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
                    Student
                  </th>

                  <th className="px-6 py-4 text-left">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left">
                    Enrolled Courses
                  </th>

                </tr>
              </thead>

              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student._id}
                      className="
                        border-t
                        border-gray-200
                        dark:border-gray-800
                        hover:bg-blue-50
                        dark:hover:bg-gray-800
                        transition
                      "
                    >
                      {/* STUDENT */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              w-12
                              h-12
                              rounded-full
                              bg-blue-600
                              text-white
                              flex
                              items-center
                              justify-center
                              font-bold
                              text-lg
                            "
                          >
                            {student.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {student.name}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <FiMail />
                          {student.email}
                        </div>

                      </td>

                      {/* ENROLLED COURSES */}
                      <td className="px-6 py-5">

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            px-3
                            py-1
                            rounded-full
                            bg-green-100
                            text-green-700
                            font-medium
                          "
                        >
                          <FiBook />
                          {student.enrolledCourses.length}
                        </span>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="
                        py-12
                        text-center
                        text-gray-500
                      "
                    >
                      No students found.
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