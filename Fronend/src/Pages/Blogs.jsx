import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../Context/BlogContext";

const Blogs = () => {
  const { blogs, loading, fetchBlogs } = useBlogs();
  const navigate = useNavigate();

  // 🔹 Fetch blogs from API
  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-600">
        Loading blogs...
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-orange-600">
            Ajinkya Infotech Blogs
          </h1>
          <p className="text-gray-600 mt-3">
            Insights, tutorials, and career guidance from industry experts
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs
            .filter((blog) => blog.published)
            .map((blog) => (
              <div
                key={blog.id}
                onClick={() => navigate(`/blogs/${blog.slug}`)}
                className="
                  cursor-pointer
                  bg-orange-400/20
                  backdrop-blur-xl
                  border border-white/30
                  rounded-3xl
                  overflow-hidden
                  shadow-xl shadow-orange-400/20
                  hover:-translate-y-2
                  transition-all duration-500
                "
              >
                {/* Image */}
                <div className="h-44 bg-orange-100">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-orange-400 text-sm">
                      No Cover Image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(blog.createdAt).toDateString()}
                  </p>

                  <h2 className="text-lg font-semibold text-orange-600 mb-3">
                    {blog.title}
                  </h2>

                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {blog.content}
                  </p>

                  <div className="mt-4 text-orange-600 font-medium text-sm">
                    Read More →
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Empty state */}
        {!loading && blogs.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No blogs available
          </p>
        )}
      </div>
    </section>
  );
};

export default Blogs;
