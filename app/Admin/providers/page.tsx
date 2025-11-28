"use client";
import React, { useEffect, useState } from "react";

interface Provider {
  _id: string;
  name: string;
  email: string;
  coursesUploaded: string[];
}

export default function ProviderListPage() {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/provider/all")
      .then((res) => res.json())
      .then((data) => setProviders(data.providers))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Provider Details</h1>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Courses Uploaded</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {providers.map((provider) => (
              <tr
                key={provider._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="py-3 px-6">{provider.name}</td>
                <td className="py-3 px-6">{provider.email}</td>
                <td className="py-3 px-6">{provider.coursesUploaded.length}</td>
                <td className="py-3 px-6 text-center">
                  {/* View & Delete Buttons */}
                  <div className="flex justify-center gap-3">
                    <a
                      href={`/Admin/providers/${provider._id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View
                    </a>

                    <button
                      onClick={() => handleDelete(provider._id)}
                      className="text-red-600 dark:text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {providers.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No providers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // DELETE PROVIDER FUNCTION
  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this provider?")) return;

    fetch(`http://localhost:5000/api/provider/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setProviders((prev) => prev.filter((p) => p._id !== id));
      })
      .catch(() => alert("Delete failed"));
  }
}
