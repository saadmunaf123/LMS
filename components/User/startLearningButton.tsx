"use client";

import { useRouter } from "next/navigation";

interface StartLearningButtonProps {
  courseId: string;   // <-- Type added
}

export default function StartLearningButton({ courseId }: StartLearningButtonProps) {
  const router = useRouter();

  const goToChapters = () => {
    router.push(`/User/courses/chapters/${courseId}`);
  };

  return (
    <button
      onClick={goToChapters}
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Start Learning
    </button>
  );
}
      