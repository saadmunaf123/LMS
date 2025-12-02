"use client";

import { useEffect, useState } from "react";
import EnrollButton from "./enrollButton";
import StartLearningButton from "./startLearningButton";

export default function EnrollSection({ courseId } : { courseId: string }) {
const [loading, setLoading] = useState(true);
const [enrolled, setEnrolled] = useState(false);

useEffect(() => {
const fetchStatus = async () => {
const token = sessionStorage.getItem("token");
if (!token) {
setLoading(false);
return;
}


  try {
    const res = await fetch(
      `https://lms-backend-9jj7.onrender.com/api/student/enroll/check/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      setEnrolled(data.enrolled);
    } else {
      console.error("Enrollment check failed:", data);
    }
  } catch (err) {
    console.error("Error checking enrollment:", err);
  }

  setLoading(false);
};

fetchStatus();


}, [courseId]);

if (loading) return <div>Loading...</div>;

return ( <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
{enrolled ? ( <StartLearningButton courseId={courseId} />
) : ( <EnrollButton courseId={courseId} />
)} </div>
);
}
