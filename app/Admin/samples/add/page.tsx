"use client";
import { useState } from "react";
import axios from "axios";

export default function AddSamplePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/samples/add", {
        name,
        email,
        password,
      });

      alert("Data added successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("Failed to add");
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Sample Data</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Data
      </button>
    </div>
  );
}
