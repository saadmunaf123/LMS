'use client';
import { useState } from "react";
import { FileText, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Course-Provider/Navbar";

export default function AddCourse() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    rating: "",
    category: "Accounts",
    difficulty: "Beginner",
  });

  const cat = [
    "Accounts", "Linux", "Machine Learning", "Marketing", "UI/UX", "Web Development",
    "Data Science", "Cyber Security", "Cloud Computing", "Blockchain", "DevOps",
    "Mobile Development", "Game Development", "Artificial Intelligence", "Networking",
    "Database Management", "Software Testing", "Project Management", "Digital Marketing",
    "Graphic Design"
  ];

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = sessionStorage.getItem("provider_token");
    if (!token) {
      alert("You must be logged in to add a course.");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("rating", form.rating);
    fd.append("category", form.category);
    fd.append("difficulty", form.difficulty);

    if (imageFile) fd.append("image", imageFile);
    if (videoFile) fd.append("video", videoFile);

    try {
      const res = await fetch("http://localhost:5000/api/courses/add", {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Course added successfully");

        // ⭐ Navigate to add chapters page
        if (data.courseId) {
          router.push(`/CourseProvider/addchapters/${data.courseId}`);
        } else {
          console.warn("courseId missing in backend response");
        }

      } else {
        alert(data.error || "Failed to add course");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add course due to network error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            Add New Course
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Course Title</label>
              <input
                name="title"
                placeholder="Enter course title"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Rating</label>
              <input
                name="rating"
                type="number"
                step="0.1"
                placeholder="Enter course rating"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl 
             bg-white dark:bg-gray-700 
             text-gray-900 dark:text-gray-100 
             focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  {cat.map((categ, index) => (
                    <option
                      key={index}
                      value={categ}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      {categ}
                    </option>
                  ))}
                </select>

              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Difficulty</label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl 
             bg-white dark:bg-gray-700 
             text-gray-900 dark:text-gray-100 
             focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option className="bg-white dark:bg-gray-700">Beginner</option>
                  <option className="bg-white dark:bg-gray-700">Intermediate</option>
                  <option className="bg-white dark:bg-gray-700">Advanced</option>
                </select>

              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2">
                <FileText className="w-5 h-5" /> Upload Image (optional)
              </label>
              <input type="file" accept="image/*" onChange={handleImage} className="w-full" />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2">
                <Video className="w-5 h-5" /> Upload Video (mp4, webm)
              </label>
              <input type="file" accept="video/*" onChange={handleVideo} className="w-full" />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-semibold py-2 rounded-md hover:bg-teal-700
                       dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Add Course
            </button>
          </form>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
