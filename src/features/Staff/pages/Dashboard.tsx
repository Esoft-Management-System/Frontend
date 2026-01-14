import { useState } from "react";
import BatchCard from "../../../components/common/BatchCard";
import AttendanceTable from "../../../components/common/AttendanceTable";
import ActionButton from "../../../components/common/ActionButton";
import BatchModal from "../../../components/common/BatchModal";

interface Batch {
  id: string;
  name: string;
  studentCount: number;
}

const Dashboard = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBatch = (batchName: string, studentCount: number) => {
    const newBatch: Batch = {
      id: `batch-${Date.now()}`,
      name: batchName,
      studentCount: studentCount,
    };

    setBatches([...batches, newBatch]);
    
    // Auto-select the newly added batch
    setSelectedBatch(newBatch.id);
    
    // Close modal
    setIsModalOpen(false);
  };

  const selectedBatchData = batches.find((b) => b.id === selectedBatch);

  return (
    <div className="w-full space-y-8">
      {/* Batch Selection Section */}
      <section>
        <div className="flex items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Select Batch</h2>
          <div className="flex gap-3 items-center">
            {/* Batch Dropdown */}
            {batches.length > 0 && (
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a batch...</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name} ({batch.studentCount} students)
                  </option>
                ))}
              </select>
            )}
            <ActionButton 
              label="Add Batch" 
              variant="primary" 
              icon 
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {/* Batch Cards Grid or Empty State */}
        {batches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {batches.map((batch) => (
              <BatchCard
                key={batch.id}
                batchName={batch.name}
                studentCount={batch.studentCount}
                isSelected={selectedBatch === batch.id}
                onClick={() => setSelectedBatch(batch.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
            <div className="space-y-4">
              <p className="text-gray-600 text-lg font-medium">No batches yet</p>
              <p className="text-gray-500 text-sm">Click "Add Batch" button to create your first batch</p>
            </div>
          </div>
        )}
      </section>

      {/* Attendance Table Section - Only show if a batch is selected */}
      {selectedBatchData && (
        <section>
          <AttendanceTable 
            batchName={selectedBatchData.name}
          />
        </section>
      )}

      {/* Batch Modal */}
      <BatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBatch}
      />
    </div>
  );
};

export default Dashboard;
