import HeroBanner from "@/components/Home/HeroBanner";
import HomeSection from "./layouts/Home/HomeSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="w-full">
          <HeroBanner />
        </section>

        {/* Home Section */}
        <section className="w-full">
          <HomeSection />
        </section>
      </main>
    </div>
  );
}
