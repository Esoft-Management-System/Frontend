import { X } from "lucide-react";
import { useState } from "react";

interface BatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (batchName: string, studentCount: number) => void;
}

const BatchModal = ({ isOpen, onClose, onSubmit }: BatchModalProps) => {
  const [batchName, setBatchName] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (!batchName.trim()) {
      setError("Batch name is required");
      return;
    }

    if (!studentCount || parseInt(studentCount) <= 0) {
      setError("Student count must be a positive number");
      return;
    }

    onSubmit(batchName, parseInt(studentCount));
    setBatchName("");
    setStudentCount("");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add New Batch</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Batch Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Batch Name
              </label>
              <input
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                placeholder="e.g., Batch 22"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Student Count Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Number of Students
              </label>
              <input
                type="number"
                value={studentCount}
                onChange={(e) => setStudentCount(e.target.value)}
                placeholder="e.g., 30"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Add Batch
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchModal;
