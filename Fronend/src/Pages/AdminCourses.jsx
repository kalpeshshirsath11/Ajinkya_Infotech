import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import UpdateCourseModal from "../Components/UpdateCourseModel";

import { toast } from "react-toastify";


const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState(null);
  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/api/admin/courses");
      setCourses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
  if (!window.confirm("Delete this course?")) return;

  try {
    await api.delete(`/api/admin/courses/${id}`);
    setCourses(courses.filter((c) => c.id !== id));

    toast.success("Course deleted successfully!");
  } catch (err) {
    console.error("Delete failed", err);
    toast.error("Error occurred while deleting course!");
  }
};


  const filtered = courses.filter((c) =>
    c.courseName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Manage Courses
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full mb-10 p-3 rounded-xl border border-orange-200 
                     focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-xl
                         border border-orange-200/40
                         hover:shadow-2xl hover:-translate-y-2
                         transition-all duration-300
                         p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {course.courseName}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.courseOverview}
                </p>

                <p className="text-sm mb-1">
                  <b>Duration:</b> {course.durationAndCommitment}
                </p>

                <p className="text-sm mb-1">
                  <b>Price:</b> ₹{course.price}
                </p>

                <p
                  className={`text-sm font-semibold ${
                    course.isActive
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {course.isActive ? "Active" : "Inactive"}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 
                     text-white py-2 rounded-xl font-medium cursor-pointer"
                >
                    Update
                </button>


                <button
                  onClick={() => deleteCourse(course.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 
                             text-white py-2 rounded-xl font-medium cursor-pointer"
                            
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <p className="text-gray-500 mt-10 text-center">
            No courses found.
          </p>
        )}
      </div>
      {selectedCourse && (
  <UpdateCourseModal
    course={selectedCourse}
    onClose={() => setSelectedCourse(null)}
    onUpdated={fetchCourses}
  />
)}

    </div>
  );
};

export default AdminCourses;
