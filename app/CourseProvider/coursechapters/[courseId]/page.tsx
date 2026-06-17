"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Course-Provider/Navbar";
import Footer from "@/components/Course-Provider/Footer";

import {
  BookOpen,
  PlayCircle,
  Video,
  Layers3,
  ArrowRight,
  Loader2,
} from "lucide-react";

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
          `https://lms-backend-9jj7.onrender.com/api/chapters/provider/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          setError("Failed to load chapters.");
          return;
        }

        const data = await res.json();
        setChapters(data.chapters || []);
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, [courseId]);

  const totalVideos = chapters.filter((c) => c.video).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          <span className="text-xl">Loading Chapters...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-3xl text-center">
          <h2 className="text-red-400 text-2xl font-bold mb-2">
            Failed To Load
          </h2>
          <p className="text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-4">
            <BookOpen className="w-4 h-4" />
            Course Content
          </div>

          <h1 className="text-5xl font-bold text-white mb-3">
            Course Chapters
          </h1>

          <p className="text-slate-400 text-lg">
            Manage and review all chapters uploaded for this course.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Total Chapters</p>
                <h2 className="text-4xl font-bold text-white mt-2">
                  {chapters.length}
                </h2>
              </div>

              <BookOpen className="w-10 h-10 text-cyan-400" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Video Chapters</p>
                <h2 className="text-4xl font-bold text-white mt-2">
                  {totalVideos}
                </h2>
              </div>

              <Video className="w-10 h-10 text-purple-400" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Completion</p>
                <h2 className="text-4xl font-bold text-white mt-2">
                  100%
                </h2>
              </div>

              <Layers3 className="w-10 h-10 text-green-400" />
            </div>
          </div>
        </div>

        {/* Empty State */}
        {chapters.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">
            <BookOpen className="w-20 h-20 text-slate-600 mx-auto mb-4" />

            <h2 className="text-2xl font-bold text-white mb-2">
              No Chapters Yet
            </h2>

            <p className="text-slate-400">
              This course doesn't contain any chapters.
            </p>
          </div>
        )}

        {/* Chapter Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {chapters.map((chapter, index) => (
            <div
              key={chapter._id}
              className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Video */}
              {chapter.video && (
                <div className="relative">
                  <video
                    controls
                    className="w-full h-64 object-cover"
                  >
                    <source
                      src={`data:${chapter.videoContentType};base64,${chapter.video}`}
                    />
                  </video>
                </div>
              )}

              <div className="p-6">
                {/* Top */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-cyan-400 text-sm font-medium mb-1">
                      Chapter {index + 1}
                    </div>

                    <h2 className="text-2xl font-bold text-white">
                      {chapter.title}
                    </h2>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">
                    Order {chapter.order}
                  </span>
                </div>

                {/* Description */}
                {chapter.description && (
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {chapter.description}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <PlayCircle className="w-5 h-5" />
                    Video Lesson
                  </div>

                  <Link
                    href={`/Provider/course/${courseId}/chapter/${chapter._id}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:opacity-90 transition"
                  >
                    Watch Chapter
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}