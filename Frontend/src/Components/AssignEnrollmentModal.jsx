import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const AssignEnrollmentModal = ({ userId, courseId, onClose, onSuccess }) => {
  const [pendingFees, setPendingFees] = useState("");
  const [isNill, setIsNill] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    setLoading(true);
    try {
      await api.post("/api/admin/enrollments/assign", {
        userId,
        courseId,
        pendingFees: isNill ? 0 : pendingFees,
        isNill
      });

      toast.success("Student enrolled successfully 🎉");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Enrollment failed Or Student Already registered");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

        <h2 className="text-xl font-semibold mb-4">Assign Enrollment</h2>

        {/* Pending Fees */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Pending Fees
          </label>
          <input
            type="number"
            value={pendingFees}
            onChange={(e) => setPendingFees(e.target.value)}
            disabled={isNill}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter amount"
          />
        </div>

        {/* Is Nill */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={isNill}
            onChange={(e) => setIsNill(e.target.checked)}
          />
          <label>No pending fees</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignEnrollmentModal;
