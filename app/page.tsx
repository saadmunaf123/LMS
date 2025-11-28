import HeroBanner from "@/components/User/Home/HeroBanner";
import HomeSection from "./User/layouts/Home/HomeSection";
import Navbar from "@/components/User/Navbar";
import Footer from "@/components/User/Footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
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
    <Footer/>
    </div>
  );
}
