"use client";

import { useState } from "react";
import ChapterForm from "@/components/Course-Provider/ChapterForm";
import { useParams } from "next/navigation";
import Navbar from "@/components/Course-Provider/Navbar";
import Footer from "@/components/Course-Provider/Footer";

export default function AddChapterPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  return (
    <div>
        <Navbar/>
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Add Chapter for Course ID: {courseId}
      </h1>

      <ChapterForm courseId={courseId} />
    </div>
    <Footer/>
    </div>
  );
}
