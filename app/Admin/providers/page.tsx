"use client";

import AdminNavbar from "@/components/Admin/Navbar";
import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiTrash2,
  FiEye,
  FiUsers,
  FiMail,
  FiBookOpen,
} from "react-icons/fi";

interface Provider {
  _id: string;
  name: string;
  email: string;
  coursesUploaded: string[];
}

export default function ProviderListPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [search, setSearch] = useState("");

  const [deleteProviderId, setDeleteProviderId] = useState<string | null>(
    null
  );

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  useEffect(() => {
    fetch("https://lms-backend-9jj7.onrender.com/api/provider/all")
      .then((res) => res.json())
      .then((data) => setProviders(data.providers))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `https://lms-backend-9jj7.onrender.com/api/provider/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setProviders((prev) =>
        prev.filter((provider) => provider._id !== id)
      );

      setDeleteProviderId(null);

      setMessage("Provider deleted successfully");
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (err) {
      console.error(err);

      setMessage("Failed to delete provider");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  const filteredProviders = providers.filter(
    (provider) =>
      provider.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      provider.email
        .toLowerCase()
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
            className={`px-6 py-4 rounded-xl shadow-2xl text-white font-medium ${
              messageType === "success"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Provider Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered providers
          </p>
        </div>

        {/* STATS + SEARCH */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900">
                <FiUsers className="text-blue-600 text-2xl" />
              </div>

              <div>
                <p className="text-gray-500">
                  Total Providers
                </p>

                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {providers.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <div className="relative">
              <FiSearch className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search provider by name or email..."
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
                    Provider
                  </th>

                  <th className="px-6 py-4 text-left">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left">
                    Courses
                  </th>

                  <th className="px-6 py-4 text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProviders.length > 0 ? (
                  filteredProviders.map((provider) => (
                    <tr
                      key={provider._id}
                      className="
                        border-t
                        border-gray-200
                        dark:border-gray-800
                        hover:bg-blue-50
                        dark:hover:bg-gray-800
                        transition
                      "
                    >
                      {/* NAME */}
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
                            {provider.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {provider.name}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <FiMail />
                          {provider.email}
                        </div>
                      </td>

                      {/* COURSES */}
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
                          <FiBookOpen />
                          {provider.coursesUploaded.length}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5">

                        {deleteProviderId === provider._id ? (
                          <div className="flex gap-2">

                            <button
                              onClick={() =>
                                handleDelete(provider._id)
                              }
                              className="
                                px-4
                                py-2
                                rounded-lg
                                bg-red-600
                                text-white
                                hover:bg-red-700
                              "
                            >
                              Confirm
                            </button>

                            <button
                              onClick={() =>
                                setDeleteProviderId(null)
                              }
                              className="
                                px-4
                                py-2
                                rounded-lg
                                bg-gray-200
                                text-gray-800
                                hover:bg-gray-300
                              "
                            >
                              Cancel
                            </button>

                          </div>
                        ) : (
                          <div className="flex gap-2">

                            <a
                              href={`/Admin/providers/${provider._id}`}
                              className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-lg
                                bg-blue-100
                                text-blue-600
                                hover:bg-blue-200
                              "
                            >
                              <FiEye />
                              View
                            </a>

                            <button
                              onClick={() =>
                                setDeleteProviderId(
                                  provider._id
                                )
                              }
                              className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-lg
                                bg-red-100
                                text-red-600
                                hover:bg-red-200
                              "
                            >
                              <FiTrash2 />
                              Delete
                            </button>

                          </div>
                        )}

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="
                        py-12
                        text-center
                        text-gray-500
                      "
                    >
                      No providers found.
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