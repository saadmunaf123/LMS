"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Course-Provider/Navbar";
import Footer from "@/components/Course-Provider/Footer";
import ChapterForm from "@/components/Course-Provider/ChapterForm";
import { BookOpen, Layers } from "lucide-react";

export default function AddChapterPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Add Course Chapters
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Build your course by adding structured chapters and learning videos.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 mb-8 shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <p className="mt-2 text-sm font-semibold text-green-600">
                Course Created
              </p>
            </div>

            <div className="flex-1 h-1 bg-green-500 mx-4"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold animate-pulse">
                2
              </div>
              <p className="mt-2 text-sm font-semibold text-blue-600">
                Add Chapters
              </p>
            </div>

            <div className="flex-1 h-1 bg-slate-300 dark:bg-slate-700 mx-4"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold">
                3
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Publish
              </p>
            </div>

          </div>
        </div>

        <ChapterForm courseId={courseId} />
      </div>

      <Footer />
    </div>
  );
}