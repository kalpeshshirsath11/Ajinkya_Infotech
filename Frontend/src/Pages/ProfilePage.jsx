import React, { useEffect, useState } from "react";
import api from "../api/axios";

const ProfilePage = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const fetchCourses = async () => {
      try {
        const res = await api.get("api/admin/enrollments/me");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">

      {/* 🔹 Profile Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6 mb-10 border border-gray-200">

        <img
          src={user?.image || "https://via.placeholder.com/120"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-orange-300 shadow-md"
        />

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.name}
          </h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>

      </div>

      {/* 🔹 Courses Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          My Courses
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">No courses enrolled</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course.enrollmentId}
                className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold text-orange-600">
                  {course.courseName}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {course.durationAndCommitment}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {course.enrollmentStatus}
                  </span>

                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    {course.completionStatus}
                  </span>

                  <span className={`px-3 py-1 rounded-full ${
                    course.pendingFees > 0
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    ₹{course.pendingFees} Pending
                  </span>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full w-[20%]"></div>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  Enrolled:{" "}
                  {new Date(course.enrolledAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;