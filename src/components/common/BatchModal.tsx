import { X } from "lucide-react";
import { useState } from "react";

interface BatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (batchName: string) => void;
  onDelete: (batchName: string) => void;
  batches?: string[];
}

const BatchModal = ({
  isOpen,
  onClose,
  onSubmit,
  batches = [],
}: BatchModalProps) => {
  const [batchName, setBatchName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (!batchName.trim()) {
      setError("Batch name is required");
      return;
    }

    onSubmit(batchName.trim());
    setBatchName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* WHITE LIQUID BLUR OVERLAY */}
      <div
        className="fixed inset-0 bg-white/60 backdrop-blur-lg z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full border border-white/40">
          
          {/* HEADER */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Batches
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Add New Batch
              </label>
              <input
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                placeholder="e.g., Batch 22"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg 
                         font-semibold hover:bg-blue-700 transition"
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
