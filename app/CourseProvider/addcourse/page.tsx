'use client';

import { useState } from 'react';
import {
  FileImage,
  Video,
  Star,
  BookOpen,
  Upload,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Course-Provider/Navbar';

export default function AddCourse() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    rating: '',
    category: 'Accounts',
    difficulty: 'Beginner',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<
    'success' | 'error' | ''
  >('');

  const categories = [
    'Web Development',
    'Data Science',
    'Artificial Intelligence',
    'UI/UX',
    'Machine Learning',
    'Marketing',
    'Linux',
    'Accounts',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideo = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage('');
    setMessageType('');

    if (!form.title.trim()) {
      setMessage('Course title is required.');
      setMessageType('error');
      return;
    }

    if (!form.rating) {
      setMessage('Please provide a rating.');
      setMessageType('error');
      return;
    }

    const ratingValue = Number(form.rating);

    if (ratingValue < 1 || ratingValue > 5) {
      setMessage('Rating must be between 1 and 5.');
      setMessageType('error');
      return;
    }

    if (!imageFile) {
      setMessage('Course image is required.');
      setMessageType('error');
      return;
    }

    if (!videoFile) {
      setMessage('Course video is required.');
      setMessageType('error');
      return;
    }

    const token = sessionStorage.getItem(
      'provider_token'
    );

    if (!token) {
      setMessage('Please login first.');
      setMessageType('error');
      return;
    }

    const fd = new FormData();

    fd.append('title', form.title);
    fd.append('rating', form.rating);
    fd.append('category', form.category);
    fd.append('difficulty', form.difficulty);

    fd.append('image', imageFile);
    fd.append('video', videoFile);

    try {
      setLoading(true);

      const res = await fetch(
        'https://lms-backend-9jj7.onrender.com/api/courses/add',
        {
          method: 'POST',
          body: fd,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.error || 'Failed to create course'
        );
        setMessageType('error');
        return;
      }

      setMessage(
        'Course created successfully! Redirecting...'
      );
      setMessageType('success');

      setTimeout(() => {
        if (data.courseId) {
          router.push(
            `/CourseProvider/addchapters/${data.courseId}`
          );
        }
      }, 1500);
    } catch (error) {
      console.error(error);

      setMessage(
        'Network error. Please try again.'
      );
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      {/* Mobile Block */}
      <div className="lg:hidden min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-4 text-red-500">
            Desktop Only
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            This page is optimized for desktop
            devices. Please use a laptop or desktop
            computer.
          </p>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Create New Course
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Build your next course and start
              teaching students.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-teal-600 text-white px-5 py-2 rounded-full font-medium">
              1. Course Details
            </div>

            <div className="w-12 h-[2px] bg-gray-300"></div>

            <div className="bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-5 py-2 rounded-full font-medium">
              2. Add Chapters
            </div>
          </div>

          {/* Alerts */}
          {message && (
            <div
              className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${messageType === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
                }`}
            >
              {messageType === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}

              <span>{message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* FORM */}
            <div className="xl:col-span-2">
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Title */}
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Course Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Complete Web Development Bootcamp"
                      className="w-full p-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>

                  {/* Rating + Category */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        Rating
                      </label>

                      <div className="relative">
                        <Star className="absolute left-4 top-4 text-yellow-500" />

                        <input
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          name="rating"
                          value={form.rating}
                          onChange={handleChange}
                          placeholder="4.8"
                          className="w-full pl-12 p-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        Category
                      </label>

                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white"
                      >
                        {categories.map((item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Difficulty
                    </label>

                    <select
                      name="difficulty"
                      value={form.difficulty}
                      onChange={handleChange}
                      className="w-full p-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Beginner">
                        Beginner
                      </option>

                      <option value="Intermediate">
                        Intermediate
                      </option>

                      <option value="Advanced">
                        Advanced
                      </option>
                    </select>
                  </div>

                  {/* Uploads */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Image */}
                    <div>
                      <label className="block font-semibold mb-3 text-gray-700 dark:text-gray-300">
                        Course Thumbnail
                      </label>

                      <label className="border-2 border-dashed border-teal-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-teal-50 dark:hover:bg-slate-800 transition">
                        <FileImage className="w-10 h-10 text-teal-500 mb-2" />

                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Upload Image
                        </span>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImage}
                          className="hidden"
                        />
                      </label>

                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mt-4 rounded-xl h-52 w-full object-cover"
                        />
                      )}
                    </div>

                    {/* Video */}
                    <div>
                      <label className="block font-semibold mb-3 text-gray-700 dark:text-gray-300">
                        Course Introduction Video
                      </label>

                      <label className="border-2 border-dashed border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition">
                        <Video className="w-10 h-10 text-blue-500 mb-2" />

                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Upload Video
                        </span>

                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideo}
                          className="hidden"
                        />
                      </label>

                      {videoPreview && (
                        <video
                          controls
                          className="mt-4 rounded-xl w-full"
                        >
                          <source
                            src={videoPreview}
                          />
                        </video>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Upload className="animate-spin" />
                        Creating Course...
                      </>
                    ) : (
                      <>
                        <BookOpen />
                        Create Course
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* LIVE PREVIEW */}
            <div>
              <div className="sticky top-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden">
                <div className="h-52 bg-gradient-to-r from-teal-500 to-blue-600">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Course Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-white">
                      Course Preview
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="font-bold text-2xl text-gray-900 dark:text-white">
                    {form.title ||
                      'Your Course Title'}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {form.category}
                    </span>

                    <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                      {form.difficulty}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-yellow-500">
                    <Star
                      className="fill-current"
                      size={18}
                    />

                    <span className="font-semibold">
                      {form.rating || '0.0'}
                    </span>
                  </div>

                  <div className="mt-6 text-gray-500 dark:text-gray-400 text-sm">
                    This is how your course will
                    appear to students.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}