"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Course {
  _id: string;
  title: string;
  instructor: string;
  image: string;
  rating: number;
}

export default function CourseDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{course.title}</h1>

      <p>
        <strong>Instructor:</strong> {course.instructor}
      </p>

      <p>
        <strong>Rating:</strong> {course.rating}
      </p>

      <Image
        src={course.image}
        alt="Course"
        style={{
          width: "300px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      />
    </div>
  );
}
