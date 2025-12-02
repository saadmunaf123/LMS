import Image from "next/image";
import EnrollButton from "@/components/User/enrollButton";
import StartLearningButton from "@/components/User/startLearningButton";
import Navbar from "@/components/User/Navbar";
import Footer from "@/components/User/Footer";
import EnrollSection from "@/components/User/EnrollSection";

interface Course {
  _id: string;
  title: string;
  instructor: string;
  image?: string;
  video?: string;
  videoContentType?: string;
  rating: number;
  category?: string;
  difficulty?: string;
}

export default async function Page({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let course: Course | null = null;

  try {
    const res = await fetch(`https://lms-backend-9jj7.onrender.com/api/courses/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch");
    course = await res.json();
  } catch (err) {
    console.error("Error fetching course:", err);
  }

  if (!course) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold text-lg">
        Course not found or failed to load
      </div>
    );
  }

return (
  <div className="bg-gray-50 dark:bg-[#0d0d0d]">
    <Navbar />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-12">

      {/* PAGE HEADER */}
      <section className="space-y-3 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          {course.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Instructor:{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            {course.instructor}
          </span>
        </p>
      </section>

      {/* MEDIA SECTION */}
{/* MEDIA SECTION */}
<section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

  {/* IMAGE */}
  {course.image && (
    <div className="w-full rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 h-[280px] sm:h-[340px] md:h-[420px] lg:h-[450px]">
      <Image
        src={`data:image/jpeg;base64,${course.image}`}
        alt={course.title}
        width={800}
        height={500}
        className="object-cover w-full h-full"
      />
    </div>
  )}

  {/* VIDEO */}
  <div className="w-full rounded-3xl overflow-hidden shadow-xl bg-black border border-gray-200 dark:border-gray-800 h-[280px] sm:h-[340px] md:h-[420px] lg:h-[450px] flex items-center justify-center">
    {course.video && course.videoContentType ? (
      <video
        controls
        className="w-full h-full object-cover"
      >
        <source
          src={`data:${course.videoContentType};base64,${course.video}`}
        />
      </video>
    ) : (
      <p className="text-gray-400 dark:text-gray-500 text-sm">
        No video available
      </p>
    )}
  </div>
</section>


      {/* INFO CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#111] rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Rating</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {course.rating}
          </p>
        </div>

        <div className="bg-white dark:bg-[#111] rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Category</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {course.category || "N/A"}
          </p>
        </div>

        <div className="bg-white dark:bg-[#111] rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Difficulty</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {course.difficulty || "N/A"}
          </p>
        </div>
      </section>

      {/* ENROLL SECTION */}
      <section className="pt-4 flex justify-center sm:justify-start">
        <EnrollSection courseId={id} />
      </section>
    </div>

    <Footer />
  </div>
);

}
