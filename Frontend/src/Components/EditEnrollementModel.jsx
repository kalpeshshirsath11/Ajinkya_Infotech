import { useState, useEffect } from "react";
import api from "../api/axios";

const EditEnrollmentModal = ({ enrollment, onClose, onUpdated }) => {
  const [pendingFees, setPendingFees] = useState(enrollment.pendingFees || "");
  const [isNill, setIsNill] = useState(enrollment.isNill ? "YES" : "NO");
  const [status, setStatus] = useState(enrollment.status || "NOT_STARTED");
  const [loading, setLoading] = useState(false);

  // Auto set fees = 0 when Nill = YES
  useEffect(() => {
    if (isNill === "YES") {
      setPendingFees(0);
    }
  }, [isNill]);

  const handleUpdate = async () => {
    setLoading(true);

    try {
      await api.put(`/api/admin/enrollments/edit/${enrollment.enrollmentId}`, {
        pendingFees: pendingFees,
        isNill: isNill === "YES",
        status: status,
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Edit Enrollment</h2>

        {/* Pending Fees */}
        <div className="mb-4">
          <label className="text-sm font-medium">Pending Fees</label>
          <input
            type="number"
            value={pendingFees}
            disabled={isNill === "YES"}
            onChange={(e) => setPendingFees(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Is Nill */}
        <div className="mb-4">
          <label className="text-sm font-medium">Is Nill</label>
          <select
            value={isNill}
            onChange={(e) => setIsNill(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          >
            <option value="NO">NO</option>
            <option value="YES">YES</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEnrollmentModal;
