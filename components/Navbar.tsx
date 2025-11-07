'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const navitem = [
  { name: 'Home', href: '/home' },
  { name: 'My Courses', href: '/mycourses' },
  { name: 'Contact', href: '/contact' },
  { name: 'About Us', href: '/aboutus' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`transition-all duration-300 z-50 ${
        isSticky
          ? 'fixed top-0 left-0 w-full bg-gray-100/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md'
          : 'relative bg-gray-100 dark:bg-slate-900'
      } p-4`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="font-poppins text-slate-800 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
          Study<span className="text-emerald-600 dark:text-emerald-400">Stream</span>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-slate-800 dark:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Links + Button (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          {navitem.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="relative text-gray-700 dark:text-gray-300 font-semibold pb-[2px] transition-colors duration-200 
                         hover:text-orange-500 dark:hover:text-orange-400 after:content-[''] after:absolute after:left-1/2 
                         after:-bottom-[2px] after:h-[4px] after:w-full after:rounded-full 
                         after:bg-orange-400 after:transform after:-translate-x-1/2 
                         after:scale-x-0 hover:after:scale-x-100 after:origin-left 
                         after:transition-transform after:duration-300"
            >
              {item.name}
            </a>
          ))}

          <button onClick={() => router.push('/signup')}
           className="bg-orange-500 text-white font-semibold px-4 py-[10px] rounded-md leading-none 
                             hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 
                             transition-colors duration-200">
            Login / Signup
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 bg-gray-50 dark:bg-slate-800 rounded-lg shadow-md p-4">
          {navitem.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block text-gray-800 dark:text-gray-200 font-semibold hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={() => router.push('/signup')}
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md 
                       hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 
                       transition-colors duration-200"
          >
            Login / Signup
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
