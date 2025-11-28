"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Course-Provider/Navbar";
import Footer from "@/components/Course-Provider/Footer";

interface Chapter {
  _id: string;
  title: string;
  description?: string;
  order: number;
  video?: string;
  videoContentType?: string;
}

export default function ProviderCourseChaptersPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchChapters() {
      try {
        const token = sessionStorage.getItem("provider_token");

        const res = await fetch(
          `http://localhost:5000/api/chapters/provider/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          setError("Failed to load chapters.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setChapters(data.chapters || []);
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, [courseId]);

  if (loading) return <p className="p-4">Loading chapters...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-gray-50 dark:bg-[#0d0d0d] min-h-screen">
        {/* Page Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6">
          Your Course Chapters
        </h1>

        {chapters.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300">No chapters found.</p>
        )}

        <div className="space-y-5">
          {chapters.map((chapter, index) => (
            <div
              key={chapter._id}
              className="bg-white dark:bg-[#1a1a1a] shadow-md rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700 transition hover:shadow-lg"
            >
              {/* Title + Order */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {index + 1}. {chapter.title}
                </h2>

                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-100 font-medium">
                  Order {chapter.order}
                </span>
              </div>

              {/* Description */}
              {chapter.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {chapter.description}
                </p>
              )}

              {/* Video preview */}
              {chapter.video && (
                <video
                  controls
                  className="w-full h-48 sm:h-56 object-cover rounded-lg border border-gray-300 dark:border-gray-600 mb-3"
                >
                  <source
                    src={`data:${chapter.videoContentType};base64,${chapter.video}`}
                  />
                </video>
              )}

              {/* Button */}
              <div>
                <Link
                  href={`/Provider/course/${courseId}/chapter/${chapter._id}`}
                  className="inline-block text-sm sm:text-base px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Watch Chapter
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
