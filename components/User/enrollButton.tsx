"use client";

export default function EnrollButton({ courseId }: { courseId: string }) {
  const handleEnroll = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login as a student first");
      window.location.href = "/User/signup";
      return;
    }

    try {
      const res = await fetch(`https://lms-backend-9jj7.onrender.com/api/student/enroll/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || "Enrollment failed");
        return;
      }

      alert("Enrolled successfully!");
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleEnroll}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      Enroll Now
    </button>
  );
}
