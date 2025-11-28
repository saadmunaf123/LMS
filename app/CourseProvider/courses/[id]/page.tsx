import Image from "next/image";

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

export default async function Page({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let course: Course | null = null;

  try {
    const res = await fetch(`http://localhost:5000/api/courses/${id}`, { cache: "no-store" });
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
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center sm:text-left mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{course.title}</h1>
        <p className="text-gray-600 text-lg sm:text-xl">Instructor: {course.instructor}</p>
      </div>

      {/* Image & Video Section */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        {course.image && (
          <div className="flex-shrink-0 w-full sm:w-1/2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={`data:image/jpeg;base64,${course.image}`}
              alt={course.title}
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="flex-1">
          {course.video && course.videoContentType ? (
            <video
              controls
              className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <source src={`data:${course.videoContentType};base64,${course.video}`} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="h-64 sm:h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm shadow-inner">
              No video available
            </div>
          )}
        </div>
      </div>

      {/* Course Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <div className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
          <p className="font-semibold text-gray-700">Rating</p>
          <p className="text-gray-900 text-lg">{course.rating}</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
          <p className="font-semibold text-gray-700">Category</p>
          <p className="text-gray-900 text-lg">{course.category || "N/A"}</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
          <p className="font-semibold text-gray-700">Difficulty</p>
          <p className="text-gray-900 text-lg">{course.difficulty || "N/A"}</p>
        </div>
      </div>

      {/* Optional: Add a "Start Learning" button */}
      <div className="mt-8 text-center sm:text-left">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-300">
          Start Learning
        </button>
      </div>
    </div>
  );
}
