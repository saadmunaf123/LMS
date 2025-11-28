"use client";

import { useState } from "react";

export default function ChapterForm({ courseId }: { courseId: string }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [order, setOrder] = useState(1);
    const [video, setVideo] = useState<File | null>(null);
    const [added, setAdded] = useState(false);

    const handleAdd = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("order", order.toString());

        if (video) formData.append("video", video);

const res = await fetch(
  `http://localhost:5000/api/chapters/${courseId}`,
  {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("provider_token"),
    },
    body: formData,
  }
);




        const data = await res.json();
        console.log(data);

        if (data.chapter) {
            alert("Chapter Added!");
            setAdded(true);
        }
    };

    return (
        <div
            className="max-w-xl mx-auto mt-8 p-8 rounded-xl shadow-xl 
                 bg-gray-100 text-gray-900 
                 dark:bg-gray-900 dark:text-gray-100"
        >
            <h2 className="text-2xl font-bold mb-6">Add Chapter</h2>

            {/* Title */}
            <div className="mb-4">
                <label className="block mb-1 font-medium">Chapter Title</label>
                <input
                    className="w-full p-3 rounded-lg border 
                     bg-white text-gray-900
                     dark:bg-gray-800 dark:border-gray-700 dark:text-white
                     focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter chapter title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                    className="w-full p-3 h-28 rounded-lg border resize-none
                     bg-white text-gray-900
                     dark:bg-gray-800 dark:border-gray-700 dark:text-white
                     focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Video Upload */}
            <div className="mb-4">
                <label className="block mb-1 font-medium">Upload Chapter Video</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files?.[0] || null)}
                    className="w-full p-3 rounded-lg border 
                     bg-white text-gray-900
                     dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>

            {/* Order */}
            <div className="mb-4">
                <label className="block mb-1 font-medium">Order</label>
                <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full p-3 rounded-lg border 
                     bg-white text-gray-900
                     dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
                <button
                    className="w-full bg-teal-600 text-white font-semibold py-2 rounded-md hover:bg-teal-700
                       dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors duration-200"
                    onClick={handleAdd}
                >
                    Add Chapter
                </button>

                {added && (
                    <a
                        href="/CourseProvider/providerhome"
                        className="w-full py-3 rounded-lg font-semibold text-center
                       bg-green-600 text-white hover:bg-green-700 
                       active:scale-95 transition"
                    >
                        Finish
                    </a>
                )}
            </div>
        </div>
    );
}
