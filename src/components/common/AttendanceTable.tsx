import { Upload } from "lucide-react";
import { useState } from "react";

interface AttendanceRecord {
  rollNo: string;
  studentName: string;
  date: string;
  status: "present" | "absent" | "leave";
}

interface AttendanceTableProps {
  batchName: string;
  data?: AttendanceRecord[];
}

const AttendanceTable = ({ batchName, data = [] }: AttendanceTableProps) => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>(data);
  const [fileName, setFileName] = useState<string>("");

  const handleExcelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Parse Excel file using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.split("\n");
        const newData: AttendanceRecord[] = [];

        // Skip header row and parse data
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const columns = line.split(",");
          if (columns.length >= 4) {
            newData.push({
              rollNo: columns[0]?.trim() || "",
              studentName: columns[1]?.trim() || "",
              date: columns[2]?.trim() || "",
              status: (columns[3]?.trim().toLowerCase() || "absent") as "present" | "absent" | "leave",
            });
          }
        }

        setAttendanceData(newData);
      } catch (error) {
        console.error("Error parsing file:", error);
      }
    };
    reader.readAsText(file);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {batchName} - Attendance
        </h2>

        {/* Upload Section */}
        <div className="mb-6">
          <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 hover:bg-blue-50">
            <div className="flex items-center gap-3">
              <Upload size={20} className="text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">
                {fileName ? `Loaded: ${fileName}` : "Upload Excel File (.csv)"}
              </span>
            </div>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleExcelUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Stats Section */}
        {attendanceData.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium">Present</p>
              <p className="text-2xl font-bold text-green-600">
                {attendanceData.filter((r) => r.status === "present").length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium">Absent</p>
              <p className="text-2xl font-bold text-red-600">
                {attendanceData.filter((r) => r.status === "absent").length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium">Leave</p>
              <p className="text-2xl font-bold text-yellow-600">
                {attendanceData.filter((r) => r.status === "leave").length}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      {attendanceData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Roll No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">{record.rollNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.studentName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(record.status)}`}
                    >
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            Upload an Excel file to display attendance records
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
