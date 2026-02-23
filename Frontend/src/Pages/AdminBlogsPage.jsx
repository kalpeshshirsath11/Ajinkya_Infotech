import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      toast.error("Failed to load blogs");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await api.delete(`/api/admin/blogs/${id}`);
      toast.success("Blog deleted");
      fetchBlogs();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // 🔥 Convert HTML → Plain text
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          onClick={() => navigate("/admin/blogs/add")}
        >
          + Add Blog
        </button>

        <input
          type="text"
          placeholder="Search blog..."
          className="border px-3 py-2 rounded w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BLOG CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            <h2 className="text-lg font-semibold">{blog.title}</h2>

            {/* CLEAN TEXT PREVIEW (NO HTML TAGS) */}
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {stripHtml(blog.content).slice(0, 140)}...
            </p>

            <div className="flex justify-between mt-4">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
              >
                Update
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No blogs found
        </p>
      )}
    </div>
  );
};

export default AdminBlogsPage;
