import { useNavigate } from "react-router-dom";
import { FaUsers, FaBookOpen, FaPenFancy,FaImages } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const Card = ({ icon, title, onClick }) => (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow-xl
                 border border-orange-200/40
                 hover:shadow-2xl hover:-translate-y-2
                 transition-all duration-300
                 flex flex-col items-center justify-center
                 h-64"
    >
      <div className="text-5xl text-orange-500 mb-6">{icon}</div>
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-12">
          Admin Control Panel
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <Card
            icon={<FaUsers />}
            title="Students"
            onClick={() => navigate("/admin/students")}
          />

          <Card
            icon={<FaBookOpen />}
            title="Courses"
            onClick={() => navigate("/admin/course")}
          />

          <Card
            icon={<FaPenFancy />}
            title="Blogs"
            onClick={() => navigate("/admin/blogs")}
          />
          <Card
            icon={<FaImages />}
            title="Hero Section"
            onClick={() => navigate("/admin/hero")}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
