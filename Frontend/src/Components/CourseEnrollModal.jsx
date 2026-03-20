import { useEffect, useState } from "react";
import api from "../api/axios";
import AssignEnrollmentModal from "./AssignEnrollmentModal";



const CourseEnrollModal = ({ studentId, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/api/courses");
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((c) =>
    c.courseName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Enroll in Course</h2>
          <button onClick={onClose} className="text-red-500">X</button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search course by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        {/* Course List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCourses.map((course) => (
            <div
              key={course.courseId}
              className="border rounded-lg p-4 mb-3 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{course.courseName}</h3>
                <p className="text-sm text-gray-500">
                  Duration: {course.duration}
                </p>
                <p className="text-sm text-gray-500">
                  Fees: ₹{course.fees}
                </p>
              </div>

              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setSelectedCourse(course)}
                >
                Enroll
                </button>

            </div>
          ))}
        </div>
      </div>
      {selectedCourse && (
  <AssignEnrollmentModal
    userId={studentId}
    courseId={selectedCourse.id}
    onClose={() => setSelectedCourse(null)}
    onSuccess={() => {
      setSelectedCourse(null);
      onClose(); // close course list modal
    }}
  />
)}

    </div>
  );
};

export default CourseEnrollModal;
