'use client';
import Image from "next/image";
import hero from "@/store/hero_banner.jpg";

const HeroBanner = () => {
  return (
    <section
      className="relative w-full h-[60vh] min-h-[320px] overflow-hidden flex items-center"
      aria-label="Hero banner"
    >
      {/* Background image */}
      <Image src={hero} alt="Hero" fill className="object-cover" priority />

      {/* Gray overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[600px] text-white text-left sm:text-left md:text-left">
          <h1 className="m-0 text-[clamp(1.6rem,4vw,2.5rem)] leading-tight font-extrabold">
            Unlock Your Potential.
          </h1>
          <h1 className="m-0 text-[clamp(1.6rem,4vw,2.5rem)] leading-tight font-extrabold">
            Learn On-Demand Saad
          </h1>
          <p className="mt-3 text-[clamp(0.95rem,1.3vw,1.1rem)] text-gray-200">
            Explore courses, track progress, and accelerate your career with expert-led content.
          </p>

          <button
            className="mt-5 bg-orange-500 text-white font-semibold px-6 py-2.5 rounded-full
                       hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 
                       transition-all duration-300 shadow-md"
          >
            Browse Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
