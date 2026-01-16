import { useState } from "react";
import BatchCard from "../../../components/common/BatchCard";
import AttendanceTable from "../../../components/common/AttendanceTable";
import ActionButton from "../../../components/common/ActionButton";
import BatchModal from "../../../components/common/BatchModal";

interface Batch {
  id: string;
  name: string;
}

const Dashboard = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBatch = (batchName: string,) => {
    const newBatch: Batch = {
      id: `batch-${Date.now()}`,
      name: batchName,
    };

    setBatches((prev) => [...prev, newBatch]);
    setSelectedBatch(newBatch.id);
    setIsModalOpen(false);
  };

  const selectedBatchData = batches.find((b) => b.id === selectedBatch);

  return (
    <div className="w-full space-y-8">
      <section>
        <div className="flex items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Select Batch</h2>

          <ActionButton
            label="Add Batch"
            variant="primary"
            icon
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {batches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {batches.map((batch) => (
              <BatchCard
                key={batch.id}
                batchName={batch.name}
                isSelected={selectedBatch === batch.id}
                onClick={() => setSelectedBatch(batch.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl border">
            <p className="text-gray-600 text-lg font-medium">No batches yet</p>
            <p className="text-gray-500 text-sm">
              Click "Add Batch" to create your first batch
            </p>
          </div>
        )}
      </section>

      {selectedBatchData && (
        <section>
          <AttendanceTable batchName={selectedBatchData.name} />
        </section>
      )}

      <BatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBatch}
      />
    </div>
  );
};

export default Dashboard;
