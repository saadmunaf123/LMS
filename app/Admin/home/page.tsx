"use client";
import AdminNavbar from "@/components/Admin/Navbar";
import { FaDatabase, FaPlusCircle, FaBook, FaListAlt, FaUserTie, FaUserGraduate } from "react-icons/fa";

export default function AdminHome() {
  return (
    <div>
      <AdminNavbar/>
    <div className="pt-20 p-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* View Data */}
        {/* <a
          href="/Admin/samples"
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
        >
          <FaDatabase className="text-5xl mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold">View Data</h2>
          <p className="text-gray-600 dark:text-gray-300">Check all stored entries</p>
        </a> */}

        {/* Add Data */}
        {/* <a
          href="/Admin/samples/add"
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
        >
          <FaPlusCircle className="text-5xl mb-4 text-green-600" />
          <h2 className="text-xl font-semibold">Add Data</h2>
          <p className="text-gray-600 dark:text-gray-300">Insert new dataset</p>
        </a> */}

        {/* Add Course */}
        {/* <a
          href="/Admin/addcourse"
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
        >
          <FaBook className="text-5xl mb-4 text-purple-600" />
          <h2 className="text-xl font-semibold">Add Course</h2>
          <p className="text-gray-600 dark:text-gray-300">Upload new course details</p>
        </a> */}

        {/* View Courses */}
        <a
          href="/Admin/allcourses"
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
        >
          <FaListAlt className="text-5xl mb-4 text-orange-500" />
          <h2 className="text-xl font-semibold">View Courses</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage uploaded courses</p>
        </a>

        {/* Provider Details */}
        <a
          href="/Admin/providers"
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
        >
          <FaUserTie className="text-5xl mb-4 text-indigo-600" />
          <h2 className="text-xl font-semibold">Provider Details</h2>
          <p className="text-gray-600 dark:text-gray-300">View course providers</p>
        </a>

        {/* Student Details */}
        <a
          href="/Admin/students"
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
        >
          <FaUserGraduate className="text-5xl mb-4 text-teal-600" />
          <h2 className="text-xl font-semibold">Student Details</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage student accounts</p>
        </a>

      </div>
    </div>
    </div>
  );
}
