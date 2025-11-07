'use client';
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-300 py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        
        {/* About Section */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">StudyStream</h2>
          <p className="text-sm">
            Learn from the best courses, enhance your skills, and grow your career. Explore trending topics and stay ahead in your industry.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-600 transition">Home</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Courses</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">About Us</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social & Subscribe */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Follow Us</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-orange-600 transition"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-orange-600 transition"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-orange-600 transition"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-orange-600 transition"><Linkedin className="w-5 h-5" /></a>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Subscribe</h3>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
            />
            <button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} StudyStream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
