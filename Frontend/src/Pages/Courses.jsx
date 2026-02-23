import React, { useEffect, useState } from "react";
import { FaClock, FaRupeeSign, FaBookOpen } from "react-icons/fa";
import axios from "axios";
import api from "../api/axios";

const dummyCourses = [
  {
    courseName: "Spring Boot Mastery",
    courseOverview: "Complete backend development course with Spring Boot and JPA.",
    courseStructure: "Core concepts, REST APIs, Projects",
    durationAndCommitment: "8 weeks",
    whoThisCourseIsFor: "Beginners & Java Developers",
    price: 2999,
    isActive: true,
  },
  {
    courseName: "Full Stack Java Developer",
    courseOverview: "End-to-end full stack development with real-world projects.",
    courseStructure: "Frontend, Backend, Database",
    durationAndCommitment: "12 weeks",
    whoThisCourseIsFor: "Students & Job Seekers",
    price: 4999,
    isActive: true,
  },
];

const Courses = () => {
  const [courses, setCourses] = useState(dummyCourses);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          "api/courses"
        );
        setCourses(response.data);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section
      className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100
                 min-h-screen py-20 px-6"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-14 animate-fade-in">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-wide
                     bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500
                     bg-clip-text text-transparent"
        >
          Our Courses
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Industry-focused courses designed to build strong fundamentals,
          practical skills, and job-ready confidence.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-orange-600 font-semibold">
          Loading courses...
        </p>
      )}

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <div
            key={index}
            className="group bg-white/80 backdrop-blur-md rounded-2xl
                       border border-orange-200/60 shadow-lg
                       hover:shadow-2xl hover:-translate-y-2
                       transition-all duration-300 ease-out
                       animate-slide-up"
          >
            {/* Card Header */}
            <div
              className="p-6 rounded-t-2xl
                         bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400
                         text-white"
            >
              <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
                <FaBookOpen />
                {course.courseName}
              </h2>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4 text-gray-700">
              <p className="text-sm leading-relaxed">
                {course.courseOverview}
              </p>

              <div className="text-sm">
                <span className="font-semibold text-orange-600">
                  Structure:
                </span>{" "}
                {course.courseStructure}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <FaClock className="text-orange-500" />
                <span>{course.durationAndCommitment}</span>
              </div>

              <div className="text-sm">
                <span className="font-semibold text-orange-600">
                  For:
                </span>{" "}
                {course.whoThisCourseIsFor}
              </div>
            </div>

            {/* Card Footer */}
            <div
              className="px-6 py-4 flex items-center justify-between
                         border-t border-orange-200/60"
            >
              <div className="flex items-center gap-1 text-lg font-bold text-orange-600">
                <FaRupeeSign className="text-base" />
                {course.price}
              </div>

              <button
                className="px-5 py-2 rounded-full text-sm font-semibold
                           bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400
                           text-white hover:opacity-90 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
