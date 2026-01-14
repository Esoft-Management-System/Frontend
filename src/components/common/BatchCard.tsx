import type { MouseEvent } from "react";

interface BatchCardProps {
  batchName: string;
  studentCount: number;
  isSelected?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const BatchCard = ({ batchName, studentCount, isSelected = false, onClick }: BatchCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{batchName}</h3>
          <p className="text-sm text-gray-600 mt-2">{studentCount} Students</p>
        </div>
        {isSelected && (
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        )}
      </div>
    </div>
  );
};

export default BatchCard;