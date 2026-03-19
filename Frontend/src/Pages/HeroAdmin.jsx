import { useEffect, useState } from "react";
import api from "../api/axios";

const HeroAdmin = () => {
  const [heroes, setHeroes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    displayOrder: 1,
  });

  const [loading, setLoading] = useState(false);

  const fetchHeroes = async () => {
    try {
      const res = await api.get("/api/hero/active");
      setHeroes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      imageUrl: "",
      displayOrder: 1,
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`/api/hero/${editingId}`, form);
      } else {
        await api.post("/api/hero", {
          ...form,
          active: true,
        });
      }

      resetForm();
      fetchHeroes();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/hero/${id}`); // FIXED
      fetchHeroes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (hero) => {
    setForm(hero);
    setEditingId(hero.id);
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Hero Section Management
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md mb-10 grid gap-4"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 rounded focus:ring-2 focus:ring-orange-400"
            required
          />

          {/* 🔥 IMAGE PREVIEW */}
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="preview"
              className="h-40 object-cover rounded border"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x200?text=Invalid+Image")
              }
            />
          )}

          <input
            name="displayOrder"
            type="number"
            value={form.displayOrder}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-orange-400"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Slide"
                : "Add Slide"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* LIST */}
        {heroes.length === 0 ? (
          <p className="text-gray-500">No hero slides available</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {heroes.map((hero) => (
              <div
                key={hero.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border"
              >
                <img
                  src={hero.imageUrl}
                  alt="hero"
                  className="h-40 w-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x200?text=Image+Error")
                  }
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {hero.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {hero.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-400">
                      Order: {hero.displayOrder}
                    </span>

                    <div className="flex gap-2">
                    <button
                    onClick={() => handleEdit(hero)}
                     className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-3 py-1 rounded-md shadow hover:opacity-90 transition"
                      >
                      Edit
                    </button>

                    <button
                    onClick={() => handleDelete(hero.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
                    >
                  Delete
                  </button>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroAdmin;