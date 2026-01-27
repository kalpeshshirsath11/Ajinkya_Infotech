import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const BlogsContext = createContext(null);

// optional: central axios instance
const api = axios.create({
  baseURL: "http://localhost:8082",
});

export const BlogsProvider = ({ children }) => {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // attach token automatically
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // 📥 Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Fetch blogs error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Create blog
  const createBlog = async (blogData) => {
    try {
      const res = await api.post("/blogs", blogData);
      setBlogs((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.error("Create blog error:", err.response?.data || err.message);
      throw err;
    }
  };

  // ❌ Delete blog
  const deleteBlog = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Delete blog error:", err.response?.data || err.message);
      throw err;
    }
  };

  // auto load blogs after login
  useEffect(() => {
    if (token) fetchBlogs();
    else setBlogs([]);
  }, [token]);

  return (
    <BlogsContext.Provider
      value={{
        blogs,
        loading,
        fetchBlogs,
        createBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
};

// custom hook
export const useBlogs = () => useContext(BlogsContext);
