"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Sample {
    _id: string;
    name: string;
    email: string;
    password?: string;
}

const TablePage: React.FC = () => {
    const [data, setData] = useState<Sample[]>([]);

    // Fetch all users
    const fetchData = () => {
        axios.get("https://lms-backend-9jj7.onrender.com/api/samples/all")
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ✅ Delete user
    const deleteUser = (id: string) => {
        axios.delete(`https://lms-backend-9jj7.onrender.com/api/samples/delete/${id}`)
            .then(() => {
                alert("User deleted");
                fetchData(); // refresh table
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Samples Data</h1>

            <table className="w-full border-collapse border border-gray-300">
  <thead className="bg-gray-100">
    <tr>
      <th className="border p-2">Name</th>
      <th className="border p-2">Email</th>
      <th className="border p-2">Password</th>
      <th className="border p-2">Action</th>
    </tr>
  </thead>

  <tbody>
    {data.map((item) => (
      <tr key={item._id}>
        <td className="border p-2">{item.name}</td>
        <td className="border p-2">{item.email}</td>
        <td className="border p-2">{item.password}</td>
        <td className="border p-2 text-center">
          <button
            onClick={() => deleteUser(item._id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
    );
};

export default TablePage;
