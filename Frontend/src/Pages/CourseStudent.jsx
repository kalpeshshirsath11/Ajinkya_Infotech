import { useEffect, useState } from "react";
import api from "../api/axios"; // adjust path if needed

const CourseStudent = () => {
  const [data, setData] = useState([]);
  const [ld, setLd] = useState(true);
  const [err, setErr] = useState("");

  const formatDate = (d) => {
    if (!d) return "N/A";
    return new Date(d.split(".")[0]).toLocaleString();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get("api/admin/enrollments/me");

        console.log(res.data); // debug
        setData(res.data);
      } catch (e) {
        console.log(e);
        setErr("Failed to load enrollments");
      } finally {
        setLd(false);
      }
    };
    getData();
  }, []);

  if (ld) return <p className="text-center mt-10">Loading...</p>;
  if (err) return <p className="text-center text-red-500 mt-10">{err}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">My Enrollments</h2>

      {Array.isArray(data) && data.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((e) => (
            <div
              key={e.enrollmentId}
              className="bg-white p-5 rounded-2xl shadow-md"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {e.courseName}
              </h3>

              <p><b>Student:</b> {e.userName}</p>
              <p><b>Email:</b> {e.userEmail}</p>
              <p><b>Duration:</b> {e.durationAndCommitment}</p>

              <p>
                <b>Fees:</b>{" "}
                {e.isNill ? (
                  <span className="text-green-600 font-semibold">
                    No Fees
                  </span>
                ) : (
                  <span className="text-red-500">
                    ₹{e.pendingFees}
                  </span>
                )}
              </p>

              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                  {e.enrollmentStatus}
                </span>

                <span
                  className={`px-2 py-1 text-xs rounded ${
                    e.completionStatus === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : e.completionStatus === "IN_PROGRESS"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {e.completionStatus}
                </span>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                Enrolled: {formatDate(e.enrolledAt)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No enrollments found</p>
      )}
    </div>
  );
};

export default CourseStudent;