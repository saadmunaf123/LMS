"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/User/Footer";
import Navbar from "@/components/User/Navbar";

interface Chapter {
    _id: string;
    title: string;
    description?: string;
    video?: string;
    videoContentType?: string;
}

export default function WatchChapterPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const chapterId = params.chapterId as string;

    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchChapter() {
            try {
                const token = sessionStorage.getItem("token");

                if (!token) {
                    setError("Unauthorized: Please login again.");
                    return;
                }

                const res = await fetch(
                    `http://localhost:5000/api/chapters/${courseId}/${chapterId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) {
                    setError("Failed to load chapter");
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setChapter(data.chapter);
            } catch (err) {
                setError("Something went wrong while loading chapter");
            } finally {
                setLoading(false);
            }
        }

        fetchChapter();
    }, [courseId, chapterId]);

    if (loading)
        return (
            <div className="p-6 text-center text-lg text-gray-700 dark:text-gray-300">
                Loading video...
            </div>
        );

    if (error)
        return <p className="p-6 text-center text-red-500 text-lg">{error}</p>;

    if (!chapter)
        return (
            <p className="p-6 text-center text-gray-600 dark:text-gray-300">
                Chapter not found.
            </p>
        );

    return (
        <div>
            <Navbar />
            <div className="p-6 bg-gray-100 dark:bg-[#0b0b0b] min-h-screen flex justify-center">
                <div className="w-full max-w-3xl space-y-6">
                    {/* Chapter Title */}
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {chapter.title}
                    </h1>

                    {/* Video Player Card (Smaller Now) */}
                    <div className="bg-black rounded-xl shadow-xl overflow-hidden border border-gray-700">
                        {chapter.video ? (
                            <video controls className="w-full rounded-lg max-h-[420px]">
                                <source
                                    src={`data:${chapter.videoContentType};base64,${chapter.video}`}
                                    type={chapter.videoContentType}
                                />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <p className="text-red-500 font-semibold p-6 bg-white dark:bg-[#1a1a1a]">
                                No video available.
                            </p>
                        )}
                    </div>

                    {/* Description Section (New + Clean) */}
                    {chapter.description && (
                        <div className="bg-white dark:bg-[#151515] rounded-xl p-5 shadow border border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Chapter Description
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                                {chapter.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
