import Footer from "@/components/Course-Provider/Footer";
import Navbar from "@/components/Course-Provider/Navbar";
import UpdateCourse from "@/components/Course-Provider/UpdateCourse";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ⬅️ FIX

  return (
    <div>
      <Navbar/>
      <UpdateCourse courseId={id} />
      <Footer/>
    </div>
  );
}
