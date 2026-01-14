import { Upload } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";

interface AttendanceRecord {
  rollNo: string;
  studentName: string;
  date: string;
  status: "present" | "absent" | "leave";
}

interface AttendanceTableProps {
  batchName: string;
}

const AttendanceTable = ({ batchName }: AttendanceTableProps) => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [fileName, setFileName] = useState<string>("");

  // SAFE STATUS PARSER (FIXES TS ERROR)
  const parseStatus = (value: any): "present" | "absent" | "leave" => {
    const status = String(value).toLowerCase().trim();
    if (status === "present") return "present";
    if (status === "leave") return "leave";
    return "absent";
  };

  // FILE UPLOAD HANDLER
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json<any>(sheet);

      const formatted: AttendanceRecord[] = json
        .filter((row) => row["Roll No"] || row["rollNo"]) // remove empty rows
        .map((row) => ({
          rollNo: String(row["Roll No"] || row["rollNo"] || "").trim(),
          studentName: String(
            row["Student Name"] || row["studentName"] || ""
          ).trim(),
          date: String(row["Date"] || "").trim(),
          status: parseStatus(row["Status"]),
        }));

      setAttendanceData(formatted);
    };

    reader.readAsBinaryString(file);
  };

  // ✅ COUNT HELPER
  const count = (status: "present" | "absent" | "leave") =>
    attendanceData.filter((r) => r.status === status).length;

  // ✅ STATUS BADGE STYLE
  const badgeStyle = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-700";
      case "absent":
        return "bg-red-100 text-red-700";
      case "leave":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="text-lg font-semibold mb-4">
        {batchName} - Attendance
      </h2>

      {/* Upload */}
      <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg py-3 text-sm cursor-pointer bg-gray-50">
        <Upload size={18} />
        <span>
          {fileName ? `Loaded: ${fileName}` : "Upload Excel / CSV file"}
        </span>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {/* Stats */}
      {attendanceData.length > 0 && (
        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm">Present</p>
            <p className="text-2xl font-bold text-green-600">
              {count("present")}
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm">Absent</p>
            <p className="text-2xl font-bold text-red-600">
              {count("absent")}
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm">Leave</p>
            <p className="text-2xl font-bold text-yellow-600">
              {count("leave")}
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      {attendanceData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="text-left py-3">Roll No</th>
                <th className="text-left py-3">Student Name</th>
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.map((r, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-3">{r.rollNo}</td>
                  <td className="py-3">{r.studentName}</td>
                  <td className="py-3">{r.date}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${badgeStyle(
                        r.status
                      )}`}
                    >
                      {r.status.charAt(0).toUpperCase() +
                        r.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-6">
          Upload an Excel / CSV file to view attendance
        </p>
      )}
    </div>
  );
};

export default AttendanceTable;