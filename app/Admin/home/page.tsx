"use client";

import AdminNavbar from "@/components/Admin/Navbar";
import {
  FaListAlt,
  FaUserTie,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function AdminHome() {
  const dashboardCards = [
    {
      title: "Manage Courses",
      description: "View, edit and delete courses",
      icon: <FaListAlt size={35} />,
      link: "/Admin/allcourses",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Providers",
      description: "Manage all course providers",
      icon: <FaUserTie size={35} />,
      link: "/Admin/providers",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Students",
      description: "Manage student accounts",
      icon: <FaUserGraduate size={35} />,
      link: "/Admin/students",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
  <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
    
    <AdminNavbar />

    <div className="flex-1 p-12">
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-12">

      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-xl text-white">

            <div className="flex items-center gap-4 mb-4">
              <FaChalkboardTeacher size={50} />
              <div>
                <h1 className="text-4xl font-bold">
                  Admin Dashboard
                </h1>

                <p className="text-blue-100 mt-2">
                  Welcome back. Manage courses, providers and students from one place.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {dashboardCards.map((card, index) => (
              <a
                key={index}
                href={card.link}
                className="
                  group
                  bg-white
                  dark:bg-gray-900
                  rounded-3xl
                  shadow-lg
                  hover:shadow-2xl
                  border
                  border-gray-200
                  dark:border-gray-800
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  overflow-hidden
                "
              >
                <div
                  className={`bg-gradient-to-r ${card.color} p-6 text-white`}
                >
                  {card.icon}
                </div>

                <div className="p-6">

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    {card.description}
                  </p>

                </div>
              </a>
            ))}

          </div>
        </div>

        {/* DASHBOARD INFO */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-orange-600">
              Courses
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              View all uploaded courses, manage content and remove outdated material.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-indigo-600">
              Providers
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Monitor course creators and manage provider accounts.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-teal-600">
              Students
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Track registered students and their learning activities.
            </p>
          </div>

        </div>

      </div>
      </div>
    </div>
    </div>
  );
}