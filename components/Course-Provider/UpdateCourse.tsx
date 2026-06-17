"use client";

import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";

import {
  BookOpen,
  Star,
  Layers,
  Upload,
  Video,
  Image as ImageIcon,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Props {
  courseId: string;
}

export default function UpdateCourse({
  courseId,
}: Props) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [videoFile, setVideoFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const [videoPreview, setVideoPreview] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `https://lms-backend-9jj7.onrender.com/api/courses/${courseId}`
        );

        const data = await res.json();

        if (!res.ok) {
          setError("Failed to load course.");
          return;
        }

        setTitle(data.title || "");
        setRating(data.rating || 0);
        setCategory(data.category || "");
        setDifficulty(data.difficulty || "");

        if (data.image) {
          setImagePreview(
            `data:image/jpeg;base64,${data.image}`
          );
        }

        if (
          data.video &&
          data.videoContentType
        ) {
          setVideoPreview(
            `data:${data.videoContentType};base64,${data.video}`
          );
        }
      } catch {
        setError("Error loading course.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];

    setImageFile(file);
    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  const handleVideoChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];

    setVideoFile(file);
    setVideoPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const formData = new FormData();

    formData.append("title", title);
    formData.append(
      "rating",
      rating.toString()
    );
    formData.append(
      "category",
      category
    );
    formData.append(
      "difficulty",
      difficulty
    );

    if (imageFile)
      formData.append(
        "image",
        imageFile
      );

    if (videoFile)
      formData.append(
        "video",
        videoFile
      );

    try {
      const token =
        sessionStorage.getItem(
          "provider_token"
        );

      const res = await fetch(
        `https://lms-backend-9jj7.onrender.com/api/courses/update/${courseId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            "Update failed."
        );
        return;
      }

      setMessage(
        "Course updated successfully!"
      );
    } catch {
      setError(
        "Network error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Accounts",
    "Linux",
    "Machine Learning",
    "Marketing",
    "UI/UX",
    "Web Development",
    "Cyber Security",
    "Cloud Computing",
    "Blockchain",
    "DevOps",
    "Mobile Development",
    "Game Development",
    "Artificial Intelligence",
    "Networking",
    "Database Management",
    "Software Testing",
    "Project Management",
    "Digital Marketing",
    "Graphic Design",
  ];

  if (pageLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Update Course
          </h1>

          <p className="text-slate-500 mt-2">
            Edit course details,
            media, category and
            difficulty level.
          </p>
        </div>

        {/* Alerts */}

        {message && (
          <div className="mb-6 bg-green-100 border border-green-300 text-green-700 p-4 rounded-2xl flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 p-4 rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Left Side */}

          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl">

            <div className="space-y-6">

              <div>
                <label className="flex items-center gap-2 font-semibold mb-2">
                  <BookOpen className="w-5 h-5" />
                  Course Title
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-xl border dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold mb-2">
                  <Star className="w-5 h-5" />
                  Rating
                </label>

                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={rating}
                  onChange={(e) =>
                    setRating(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="w-full p-4 rounded-xl border dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold mb-2">
                  <Layers className="w-5 h-5" />
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-xl border dark:bg-slate-800"
                >
                  {categories.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="font-semibold mb-2 block">
                  Difficulty
                </label>

                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(
                      e.target.value
                    )
                  }
                  className="w-full p-4 rounded-xl border dark:bg-slate-800"
                >
                  <option>
                    Beginner
                  </option>
                  <option>
                    Intermediate
                  </option>
                  <option>
                    Advanced
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* Right Side */}

          <div className="space-y-6">

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl">
              <label className="flex items-center gap-2 font-semibold mb-4">
                <ImageIcon className="w-5 h-5" />
                Course Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="w-full"
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-4 rounded-2xl h-48 w-full object-cover"
                />
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl">
              <label className="flex items-center gap-2 font-semibold mb-4">
                <Video className="w-5 h-5" />
                Course Video
              </label>

              <input
                type="file"
                accept="video/*"
                onChange={
                  handleVideoChange
                }
                className="w-full"
              />

              {videoPreview && (
                <video
                  controls
                  className="mt-4 rounded-2xl w-full"
                  src={
                    videoPreview
                  }
                />
              )}
            </div>
          </div>

          {/* Save Button */}

          <div className="lg:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-5 rounded-2xl font-semibold text-lg hover:opacity-90 transition flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating Course...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}