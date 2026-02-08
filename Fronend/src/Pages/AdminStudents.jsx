import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AdminStudents = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("api/admin/enrollments/getUsers");
        setUsers(data);
      } catch (err) {
        console.error("Error fetching students", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filtered = users.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    (s.mobileNumber && s.mobileNumber.includes(search))
  );

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Students</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 mb-6 px-4 py-3 rounded-xl
                     border border-orange-300/40 shadow-sm outline-none"
        />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-orange-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="2" className="p-6 text-center text-gray-500">
                    Loading students...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-6 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => navigate(`/admin/students/${user.id}`)}
                    className="cursor-pointer hover:bg-orange-50 transition"
                  >
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.mobileNumber || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
