"use client";


import Footer from "@/components/Course-Provider/Footer";
import HomeContent from "@/components/Course-Provider/Home/HomeContent";
import Profile from "@/components/Course-Provider/Home/Profile";
import Navbar from "@/components/Course-Provider/Navbar";
import Link from "next/link";

export default function ProviderHome() {
  return (
    <div>
      <Navbar/>
    <div className="flex">
      <div className="flex-1">
        <HomeContent/>
      </div>
     <div className="h-screen border-l border-gray-200 flex flex-col">
  <Profile/>
</div>

    </div>
    <Footer/>
    </div>
  );
}
