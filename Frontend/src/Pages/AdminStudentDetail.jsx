import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import EditEnrollmentModal from "../Components/EditEnrollementModel";
import CourseEnrollModal from "../Components/CourseEnrollModal";

const AdminStudentDetail = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  // Fetch student with enrollments
  const fetchStudent = async () => {
    try {
      const { data } = await api.get(`/api/admin/enrollments/students/${id}`);
      setUser(data);
    } catch (err) {
      console.error("Error fetching student", err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const removeEnrollment = async (enrollmentId) => {
    try {
      await api.delete(`/api/admin/enrollments/${enrollmentId}`);
      fetchStudent();
    } catch (err) {
      console.error("Error deleting enrollment", err);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-24 px-4 sm:px-6 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <img
              src={user?.imageUrl}
              alt=""
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl sm:text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600 text-sm sm:text-base break-words">
              {user?.email}
            </p>
            <p className="text-sm sm:text-base">
              {user?.mobileNumber || "No phone number"}
            </p>
          </div>

          {/* Enrollments Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-4 sm:p-6 overflow-x-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Enrollments
              </h2>

              <button
                onClick={() => setShowCourseModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                + Enroll
              </button>
            </div>

            {/* Table */}
            <table className="min-w-[600px] w-full text-left">
              <thead className="bg-orange-100">
                <tr>
                  <th className="p-3 text-sm sm:text-base">Course</th>
                  <th className="p-3 text-sm sm:text-base">Pending Fees</th>
                  <th className="p-3 text-sm sm:text-base">Status</th>
                  <th className="p-3 text-sm sm:text-base">Actions</th>
                </tr>
              </thead>

              <tbody>
                {user?.enrollments?.length > 0 ? (
                  user.enrollments.map((e) => (
                    <tr key={e.enrollmentId} className="border-b">
                      <td className="p-3 text-sm sm:text-base">
                        {e.courseName}
                      </td>

                      <td className="p-3 text-sm sm:text-base">
                        {e.isNill ? "Nill" : `₹${e.pendingFees}`}
                      </td>

                      <td className="p-3 text-sm sm:text-base">
                        {e.status}
                      </td>

                      <td className="p-3 flex gap-4">
                        <button
                          onClick={() => setSelectedEnrollment(e)}
                          className="text-blue-600 cursor-pointer"
                        >
                          Edit
                        </button>

                        {/* Optional delete button */}
                        {/* 
                        <button
                          onClick={() => removeEnrollment(e.enrollmentId)}
                          className="text-red-600"
                        >
                          Delete
                        </button> 
                        */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      No enrollments yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      {/* Edit Enrollment Modal */}
      {selectedEnrollment && (
        <EditEnrollmentModal
          enrollment={selectedEnrollment}
          onClose={() => setSelectedEnrollment(null)}
          onUpdated={fetchStudent}
        />
      )}

      {/* Course Selection Modal */}
      {showCourseModal && (
        <CourseEnrollModal
          studentId={id}
          onClose={() => setShowCourseModal(false)}
          onSuccess={fetchStudent}   // 🔥 refresh after assign
        />
      )}
    </>
  );
};

export default AdminStudentDetail;
