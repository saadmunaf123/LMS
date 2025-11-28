"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Props {
  courseId: string;
}

export default function UpdateCourse({ courseId }: Props) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ===========================================
  // FETCH COURSE DATA
  // ===========================================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        const data = await res.json();

        if (!res.ok) {
          setError("Failed to load course details");
          return;
        }

        setTitle(data.title);
        setRating(data.rating || 0);
        setCategory(data.category || "");
        setDifficulty(data.difficulty || "");

        if (data.image) {
          setImagePreview(`data:image/jpeg;base64,${data.image}`);
        }

        if (data.video && data.videoContentType) {
          setVideoPreview(`data:${data.videoContentType};base64,${data.video}`);
        }
      } catch {
        setError("Error loading course");
      }
    };

    fetchCourse();
  }, [courseId]);

  // ===========================================
  // HANDLERS
  // ===========================================
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // ===========================================
  // SUBMIT
  // ===========================================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("rating", rating.toString());
    formData.append("category", category);
    formData.append("difficulty", difficulty);

    if (imageFile) formData.append("image", imageFile);
    if (videoFile) formData.append("video", videoFile);

    try {
      const res = await fetch(`http://localhost:5000/api/courses/update/${courseId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Update failed");
        return;
      }

      setMessage("Course updated successfully!");
    } catch {
      setError("Error updating course");
    } finally {
      setLoading(false);
    }
  };

  const cat = [
    { value: "Accounts", label: "Accounts" },
    { value: "Linux", label: "Linux" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Marketing", label: "Marketing" },
    { value: "UI/UX", label: "UI/UX" },
    { value: "Web Development", label: "Web Development" },
    { value: "Cyber Security", label: "Cyber Security" },
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "DevOps", label: "DevOps" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "Game Development", label: "Game Development" },
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Networking", label: "Networking" },
    { value: "Database Management", label: "Database Management" },
    { value: "Software Testing", label: "Software Testing" },
    { value: "Project Management", label: "Project Management" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Graphic Design", label: "Graphic Design" },
  ];

  // ===========================================
  // UI
  // ===========================================
  const inputClass =
    "w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">

        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 drop-shadow-sm">
          ✨ Update Course
        </h2>

        {message && (
          <p className="text-green-600 text-center font-semibold bg-green-50 py-2 rounded-xl mb-4 border">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 text-center font-semibold bg-red-50 py-2 rounded-xl mb-4 border">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT SECTION */}
          <div className="space-y-6">

            {/* TITLE */}
            <div>
              <label className="font-semibold text-gray-700">Course Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="font-semibold text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                <option value="">Select Category</option>
                {cat.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* DIFFICULTY */}
            <div>
              <label className="font-semibold text-gray-700">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className={inputClass}
              >
                <option>Select Difficulty</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* RATING */}
            <div>
              <label className="font-semibold text-gray-700">Rating</label>
              <input
                type="number"
                value={rating}
                min={0}
                max={5}
                step={0.1}
                onChange={(e) => setRating(Number(e.target.value))}
                className={inputClass}
              />
            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">

            {/* IMAGE UPLOAD */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200">
              <label className="font-semibold text-gray-700">Course Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  className="mt-3 w-full h-40 object-cover rounded-xl shadow-md"
                  alt="Preview"
                />
              )}
            </div>

            {/* VIDEO UPLOAD */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200">
              <label className="font-semibold text-gray-700">Course Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="mt-2"
              />
              {videoPreview && (
                <video
                  controls
                  className="mt-3 w-full rounded-xl shadow-md"
                  src={videoPreview}
                />
              )}
            </div>

          </div>
        </form>

        {/* SUBMIT BUTTON */}
        <div className="mt-10">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}
