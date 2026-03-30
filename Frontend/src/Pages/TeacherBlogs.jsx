import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddBlogModal from "../Components/AddBlogModel";
import UpdateBlogModal from "../Components/UpdateBlogModel";

const TeacherBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchMyBlogs = async () => {
    try {
      const res = await api.get("/blogs/my");
      console.log("API RESPONSE:", res.data);
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="h-[400px] flex justify-center items-center">
        <p className="text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          My Blogs
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus />
          Create Blog
        </button>
      </div>

      {/* EMPTY STATE */}
      {blogs.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No blogs found. Start by creating one 🚀
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-md border hover:shadow-lg transition overflow-hidden"
            >

              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt="blog"
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-4 flex flex-col justify-between h-[180px]">

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-500 line-clamp-3">
                    {blog.content
                      ?.replace(/<[^>]+>/g, "")
                      .slice(0, 100)}...
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">

                  {/* ✅ FIXED EDIT */}
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* ADD MODAL */}
      <AddBlogModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        refresh={fetchMyBlogs}
      />

      {/* UPDATE MODAL */}
      <UpdateBlogModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onUpdated={fetchMyBlogs}
      />

    </div>
  );
};

export default TeacherBlogs;