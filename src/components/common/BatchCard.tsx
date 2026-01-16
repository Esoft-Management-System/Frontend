import { useState } from "react";
import { Trash2 } from "lucide-react";

interface BatchCardProps {
  batchName: string;
  isSelected?: boolean;
  onClick: () => void;
}

const BatchCard = ({ batchName,  isSelected = false, onClick }: BatchCardProps) => {

  // store batch inside card
  const [isDeleted, setIsDeleted] = useState(false);

  // delete logic inside component
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleted(true); // hides card
  };

  // when deleted, show nothing
  if (isDeleted) return null;

  return (
    <div
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 group
        ${isSelected ? "border-blue-600 bg-blue-50 shadow-md"
                     : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {batchName}
        </h3>

        {isSelected && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
      </div>

      

      {/* DELETE BUTTON - hover only */}
      <button
        className="absolute bottom-3 right-3 p-2 bg-white shadow-sm rounded-lg
                   opacity-0 group-hover:opacity-100 transition
                   hover:bg-red-50"
        onClick={handleDelete}
      >
        <Trash2 size={15} className="text-red-500" />
      </button>
    </div>
  );
};

export default BatchCard;