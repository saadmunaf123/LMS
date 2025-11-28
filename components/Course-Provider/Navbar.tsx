'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const navitem = [
  { name: 'Home', href: '/' },
  { name: 'Enrollers', href: '/contact' },
  { name: 'Contact Us', href: '/aboutus' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`transition-all duration-300 z-50 ${
        isSticky
          ? 'fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700'
          : 'relative bg-white dark:bg-gray-900'
      } p-4`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="font-poppins text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
          Study<span className="text-teal-600 dark:text-teal-400">Stream</span>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-900 dark:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navitem.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="relative text-gray-700 dark:text-gray-300 font-medium pb-[2px] transition-colors duration-200
                         hover:text-teal-600 dark:hover:text-teal-400
                         after:content-[''] after:absolute after:left-1/2 after:-bottom-[2px]
                         after:h-[3px] after:w-full after:rounded-full after:bg-teal-500
                         after:transform after:-translate-x-1/2 after:scale-x-0 hover:after:scale-x-100
                         after:origin-left after:transition-transform after:duration-300"
            >
              {item.name}
            </a>
          ))}

          <button
            onClick={() => router.push('/signup')}
            className="bg-teal-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-teal-700
                       dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors duration-200"
          >
            Login / Signup
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4">
          {navitem.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block text-gray-800 dark:text-gray-200 font-semibold hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={() => router.push('/signup')}
            className="w-full bg-teal-600 text-white font-semibold py-2 rounded-md hover:bg-teal-700
                       dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors duration-200"
          >
            Login / Signup
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
