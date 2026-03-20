import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const AddCourseModal = ({ onClose, onAdded }) => {
  const [form, setForm] = useState({
    courseName: "",
    courseOverview: "",
    courseStructure: "",
    durationAndCommitment: "",
    price: "",
    whoThisCourseIsFor: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/admin/courses", form);
      toast.success("Course added successfully!");
      onAdded();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add course!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl w-full max-w-3xl shadow-xl relative max-h-[90vh] overflow-y-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Add Course</h2>

        <form onSubmit={handleSubmit} className="grid gap-5">

          {/* Course Name */}
          <div>
            <label className="font-medium">Course Name</label>
            <input
              name="courseName"
              value={form.courseName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
              required
            />
          </div>

          {/* Course Overview */}
          <div>
            <label className="font-medium">Course Overview</label>
            <textarea
              name="courseOverview"
              value={form.courseOverview}
              onChange={handleChange}
              rows={3}
              className="w-full border p-3 rounded-xl mt-1"
              required
            />
          </div>

          {/* Course Structure */}
          <div>
            <label className="font-medium">Course Structure</label>
            <textarea
              name="courseStructure"
              value={form.courseStructure}
              onChange={handleChange}
              rows={4}
              className="w-full border p-3 rounded-xl mt-1"
              placeholder="Module 1: ...&#10;Module 2: ..."
              required
            />
          </div>

          {/* Duration + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Duration & Commitment</label>
              <input
                name="durationAndCommitment"
                value={form.durationAndCommitment}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-1"
                required
              />
            </div>

            <div>
              <label className="font-medium">Price (₹)</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-1"
                required
              />
            </div>
          </div>

          {/* Who this course is for */}
          <div>
            <label className="font-medium">Who This Course Is For</label>
            <textarea
              name="whoThisCourseIsFor"
              value={form.whoThisCourseIsFor}
              onChange={handleChange}
              rows={2}
              className="w-full border p-3 rounded-xl mt-1"
              placeholder="Students, job seekers..."
              required
            />
          </div>

          {/* Active checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <label>Active Course</label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
            >
              {loading ? "Saving..." : "Add Course"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-6 py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;