"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/User/Footer";
import Navbar from "@/components/User/Navbar";

interface Chapter {
  _id: string;
  title: string;
  description?: string;
  order: number;
  video?: string;
  videoContentType?: string;
}

export default function CourseChaptersPage() {
  const params = useParams();
  const courseId = params["courseId"] as string;

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = sessionStorage.getItem("token");

        const checkRes = await fetch(
          `https://lms-backend-9jj7.onrender.com/api/student/enroll/check/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const checkData = await checkRes.json();
        setEnrolled(checkData.enrolled);

        const res = await fetch(
          `http://localhost:5000/api/chapters/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          setError("Failed to fetch chapters");
          setLoading(false);
          return;
        }

        const data = await res.json();
        const chapterList = data.chapters || [];

        setChapters(chapterList);
      } catch (err) {
        setError("Something went wrong while loading chapters");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [courseId]);

  if (loading)
    return (
      <div className="p-6 text-center text-lg font-medium text-gray-700 dark:text-gray-300">
        Loading chapters...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-500 text-center text-lg">{error}</div>
    );

  if (chapters.length === 0)
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        No chapters found for this course.
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 dark:bg-[#0b0b0b] min-h-screen">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          📘 Course Chapters
        </h1>

        {/* Chapters List */}
        <div className="space-y-5 max-w-4xl mx-auto">
          {chapters.map((chapter, index) => (
            <div
              key={chapter._id}
              className="bg-white dark:bg-[#151515] rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 
                     hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Chapter {index + 1}: {chapter.title}
                </h2>

                <span className="px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                  Order {chapter.order}
                </span>
              </div>

              {chapter.description && (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {chapter.description}
                </p>
              )}

              {/* Action */}
              <div className="mt-4">
                {enrolled ? (
                  <Link
                    href={`/User/courses/chapters/${courseId}/${chapter._id}`}
                    className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 
                             text-white font-semibold rounded-xl transition-all"
                  >
                    ▶ Watch Chapter
                  </Link>
                ) : (
                  <p className="text-red-500 font-medium">Enroll to watch this chapter</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
