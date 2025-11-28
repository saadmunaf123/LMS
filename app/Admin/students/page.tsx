"use client";
import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiBook } from "react-icons/fi";

interface Student {
  _id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
}

export default function StudentListPage() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/student/all")
      .then((res) => res.json())
      .then((data) => setStudents(data.students))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Student Details</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Email</th>
              <th className="p-3 text-left font-semibold">Enrolled Courses</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-blue-600" />
                    {s.name}
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <FiMail className="text-purple-600" />
                    {s.email}
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <FiBook className="text-green-600" />
                    {s.enrolledCourses.length}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
