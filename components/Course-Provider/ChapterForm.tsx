"use client";

import { useState } from "react";
import {
  BookOpen,
  Video,
  ListOrdered,
  CheckCircle,
  Loader2,
  Upload,
} from "lucide-react";

export default function ChapterForm({
  courseId,
}: {
  courseId: string;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(1);
  const [video, setVideo] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    if (!title || !description || !video) {
      setError("Please fill all fields and upload a video.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("order", order.toString());
      formData.append("video", video);

      const res = await fetch(
        `https://lms-backend-9jj7.onrender.com/api/chapters/${courseId}`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer " +
              sessionStorage.getItem("provider_token"),
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok && data.chapter) {
        setAdded(true);
        setMessage("Chapter added successfully!");

        setTitle("");
        setDescription("");
        setVideo(null);

        // Automatically move to next chapter number
        setOrder((prev) => prev + 1);
      } else {
        setError(data.error || "Failed to add chapter");
      }
    } catch (err) {
      console.error(err);
      setError("Network error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Add New Chapter
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Create engaging lessons by adding chapter information and video
          content.
        </p>
      </div>

      {/* Success Message */}
      {message && (
        <div className="mb-6 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl">
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="space-y-6">

        {/* Chapter Title */}
        <div>
          <label className="flex items-center gap-2 font-semibold mb-2 text-slate-700 dark:text-slate-300">
            <BookOpen className="w-5 h-5" />
            Chapter Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Introduction to React"
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what students will learn in this chapter..."
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none resize-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Video Upload */}
        <div>
          <label className="flex items-center gap-2 font-semibold mb-2 text-slate-700 dark:text-slate-300">
            <Video className="w-5 h-5" />
            Chapter Video
          </label>

          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-blue-500 transition">
            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                setVideo(e.target.files?.[0] || null)
              }
              className="w-full"
            />

            <div className="mt-4 flex justify-center">
              <Upload className="w-8 h-8 text-slate-400" />
            </div>

            <p className="text-sm text-slate-500 mt-2">
              Upload MP4, WebM or MOV video
            </p>

            {video && (
              <div className="mt-3 text-green-600 font-medium">
                ✓ {video.name}
              </div>
            )}
          </div>
        </div>

        {/* Chapter Order */}
        <div>
          <label className="flex items-center gap-2 font-semibold mb-2 text-slate-700 dark:text-slate-300">
            <ListOrdered className="w-5 h-5" />
            Chapter Order
          </label>

          <input
            type="number"
            min={1}
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">

          <button
            type="button"
            disabled={loading}
            onClick={handleAdd}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              "➕ Add Chapter"
            )}
          </button>

          {added && (
            <a
              href="/CourseProvider/providerhome"
              className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold text-center hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              🚀 Publish Course
            </a>
          )}
        </div>
      </div>
    </div>
  );
}