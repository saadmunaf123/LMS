"use client";
import { useState } from "react";

export default function AddCourse() {
  const [form, setForm] = useState({
    title: "",
    instructor: "",
    rating: ""
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("instructor", form.instructor);
    formData.append("rating", form.rating);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("https://lms-backend-9jj7.onrender.com/api/courses/add", {
      method: "POST",
      body: formData
      // ❌ Do NOT set Content-Type manually
    });

    const data = await res.json();
    alert("Course Added Successfully!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Course</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Course Title"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="instructor"
          placeholder="Instructor Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Image File Input */}
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Course
        </button>
      </form>
    </div>
  );
}
