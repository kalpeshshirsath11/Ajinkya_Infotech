import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const UpdateCourseModal = ({ course, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    courseName: "",
    courseOverview: "",
    courseStructure: "",
    durationAndCommitment: "",
    whoThisCourseIsFor: "",
    price: "",
    isActive: true,
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (course) {
      setForm(course);
      setTimeout(() => setShow(true), 10); // smooth open
    }
  }, [course]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 200); // wait for animation before unmount
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/api/admin/courses/${course.id}`, form);
      toast.success("Course updated successfully!");
      onUpdated();
      handleClose();
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  if (!course) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-51 transition-all duration-200
        ${show ? "bg-black/40" : "bg-black/0"}`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl border border-orange-200/40 relative
          transform transition-all duration-200
          ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Update Course
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <div>
            <label className="block font-semibold mb-1">Course Name</label>
            <input
              name="courseName"
              value={form.courseName}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Course Overview</label>
            <textarea
              name="courseOverview"
              value={form.courseOverview}
              onChange={handleChange}
              rows={2}
              className="w-full p-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Course Structure</label>
            <textarea
              name="courseStructure"
              value={form.courseStructure}
              onChange={handleChange}
              rows={2}
              className="w-full p-3 border rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">
                Duration & Commitment
              </label>
              <input
                name="durationAndCommitment"
                value={form.durationAndCommitment}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Who This Course Is For
            </label>
            <input
              name="whoThisCourseIsFor"
              value={form.whoThisCourseIsFor}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="cursor-pointer"
            />
            Active Course
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold cursor-pointer"
            >
              Update
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-xl font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourseModal;
