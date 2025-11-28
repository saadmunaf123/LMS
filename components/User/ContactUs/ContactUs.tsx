"use client";

import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Contact Support
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            If you need help managing courses, students, or general admin issues,
            feel free to reach out to the support team.
          </p>

          <div className="mt-6 space-y-3">
            <p className="text-gray-700 dark:text-gray-200">
              📧 Email: <strong>lms-admin-support@google.com</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              📞 Phone: <strong>+91 9137466155</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              🕒 Support Hours: Monday – Friday, 9am – 6pm
            </p>
          </div>
        </div>


        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 mt-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-300 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 mt-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-300 font-medium">Message</label>
            <textarea
              name="message"
              rows={4}
              className="w-full p-3 mt-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Write your message..."
              onChange={handleChange}
            ></textarea>
          </div>

          <button className="w-full p-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-semibold rounded-lg transition">
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
}
