"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  LogOut,
  Shield,
} from "lucide-react";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const pathname = usePathname();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    window.location.href = "/Admin";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      href: "/Admin/home",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/Admin/allcourses",
      label: "Courses",
      icon: BookOpen,
    },
    {
      href: "/Admin/providers",
      label: "Providers",
      icon: Users,
    },
    {
      href: "/Admin/students",
      label: "Students",
      icon: GraduationCap,
    },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${
          isSticky
            ? "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-lg"
            : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link
            href="/Admin/home"
            className="flex items-center gap-3"
          >
            <div
              className="
                w-12 h-12
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                flex
                items-center
                justify-center
                text-white
                shadow-lg
              "
            >
              <Shield size={24} />
            </div>

            <div>
              <h1 className="font-bold text-lg text-gray-900 dark:text-white">
                Admin Panel
              </h1>

              <p className="text-xs text-gray-500">
                LMS Management
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-3">

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2
                    px-4 py-2
                    rounded-xl
                    font-medium
                    transition-all
                    ${
                      active
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}

            {/* ADMIN BADGE */}
            <div
              className="
                flex
                items-center
                gap-3
                ml-4
                px-4
                py-2
                rounded-xl
                bg-gray-100
                dark:bg-gray-800
              "
            >
              <div
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                A
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Administrator
                </p>

                <p className="text-xs text-green-600">
                  ● Online
                </p>
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="
                ml-3
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-red-600
                text-white
                hover:bg-red-700
                transition
              "
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
          >
            {open ? (
              <X className="w-7 h-7 text-gray-800 dark:text-white" />
            ) : (
              <Menu className="w-7 h-7 text-gray-800 dark:text-white" />
            )}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
            md:hidden
            border-t
            border-gray-200
            dark:border-gray-800
            bg-white
            dark:bg-gray-900
            shadow-lg
          "
        >
          <div className="p-4 space-y-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    ${
                      pathname === item.href
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                bg-red-600
                text-white
                hover:bg-red-700
              "
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}