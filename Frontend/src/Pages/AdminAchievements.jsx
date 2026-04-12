import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminAchievements() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    titleM: "",
    contentM: "",
    image: null
  });

  // ✅ Fetch data
  const fetchData = async () => {
    try {
      const res = await api.get("/api/admin/achievements");
      setData(res.data);
    } catch (err) {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Handle file
  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  //  Submit (Add / Update)
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("titleM", form.titleM);
    formData.append("contentM", form.contentM);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editId) {
        await api.put(`/api/admin/achievements/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        });
        toast.success("Achievement updated successfully 🎉");
      } else {
        await api.post("/api/admin/achievements", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        });
        toast.success("Achievement added successfully 🎉");
      }

      // Reset
      setOpen(false);
      setEditId(null);
      setForm({
        title: "",
        content: "",
        titleM: "",
        contentM: "",
        image: null
      });

      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    }
  };

  // ✅ Edit
  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      content: item.content,
      titleM: item.titleM,
      contentM: item.contentM,
      image: null
    });
    setOpen(true);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/admin/achievements/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success("Deleted successfully 🗑️");
      fetchData();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  // ✅ Open Add Modal
  const openAddModal = () => {
    setEditId(null);
    setForm({
      title: "",
      content: "",
      titleM: "",
      contentM: "",
      image: null
    });
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Heading */}
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        Admin Achievements
      </h1>

      {/* Add Button */}
      <div className="text-center mb-8">
        <button
          onClick={openAddModal}
          className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
        >
          + Add Achievement
        </button>
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-2xl shadow-lg p-4"
          >
            <img
              src={item.image}
              alt="achievement"
              className="w-full h-40 object-cover rounded-xl mb-3"
            />

            <h3 className="text-lg font-bold text-orange-600">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              {item.content}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(item)}
                className="bg-orange-500 text-white px-3 py-1 rounded-lg"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ ADD MODAL */}
      {open && !editId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-2xl w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              Add Achievement
            </h2>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 mb-3 rounded"
            />

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="titleM"
              value={form.titleM}
              onChange={handleChange}
              placeholder="Title (Marathi)"
              className="w-full border p-2 mb-3 rounded"
            />

            <textarea
              name="contentM"
              value={form.contentM}
              onChange={handleChange}
              placeholder="Content (Marathi)"
              className="w-full border p-2 mb-3 rounded"
            />

            <input type="file" onChange={handleFile} className="mb-4" />

            <div className="flex justify-between">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ✅ UPDATE MODAL */}
      {open && editId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-2xl w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              Update Achievement
            </h2>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="titleM"
              value={form.titleM}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <textarea
              name="contentM"
              value={form.contentM}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input type="file" onChange={handleFile} className="mb-4" />

            <div className="flex justify-between">
              <button
                onClick={() => {
                  setOpen(false);
                  setEditId(null);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}