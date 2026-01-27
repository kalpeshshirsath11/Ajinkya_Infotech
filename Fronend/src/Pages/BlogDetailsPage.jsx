import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/blogs/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to load blog", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-600 text-lg">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Blog not found 😕
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-28 pb-24 bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 leading-tight">
            {blog.title}
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            {new Date(blog.createdAt).toDateString()}
          </p>
        </motion.div>

        {/* COVER IMAGE */}
        {blog.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        )}

        {/* CONTENT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="
            bg-white
            rounded-3xl
            shadow-xl
            border border-orange-100
            px-8 md:px-14
            py-10 md:py-14
          "
        >
          <article className="
            prose
            prose-lg
            prose-orange
            max-w-none
            prose-headings:font-bold
            prose-headings:text-orange-600
            prose-p:text-gray-700
            prose-li:text-gray-700
            prose-strong:text-gray-900
          ">
            {blog.content}
          </article>
        </motion.div>

      </div>
    </section>
  );
};

export default BlogDetails;
