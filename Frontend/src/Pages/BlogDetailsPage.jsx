import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import api from "../api/axios";
const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`blogs/${slug}`);
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
    <section className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 leading-tight max-w-4xl mx-auto">
            {blog.title}
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            {new Date(blog.createdAt).toDateString()}
          </p>
        </motion.div>

        {/* COVER IMAGE */}
        {blog.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-14 rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-[420px] object-cover"
            />
          </motion.div>
        )}

        {/* BLOG CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl border border-orange-100 px-6 md:px-14 py-10 md:py-14"
        >
          <article
            className="
              prose 
              prose-lg 
              max-w-3xl 
              mx-auto

              prose-headings:text-orange-600
              prose-headings:font-bold

              prose-p:text-gray-700
              prose-p:leading-relaxed

              prose-li:text-gray-700

              prose-strong:text-gray-900

              prose-blockquote:border-orange-400
              prose-blockquote:text-gray-700

              prose-img:rounded-xl
              prose-img:shadow-md

              prose-pre:bg-gray-900
              prose-pre:text-white
              prose-pre:rounded-xl
              prose-pre:p-4
            "
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default BlogDetails;
