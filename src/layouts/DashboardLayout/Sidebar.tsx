import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen flex flex-col border-r border-gray-100">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">School</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard/staff" className="px-3 py-2 rounded hover:bg-gray-50">Dashboard</Link>
          <Link to="/dashboard/staff/attendance" className="px-3 py-2 rounded hover:bg-gray-50">Attendance</Link>
          <Link to="/dashboard/staff/students" className="px-3 py-2 rounded hover:bg-gray-50">Students</Link>
          <Link to="/dashboard/staff/notifications" className="px-3 py-2 rounded hover:bg-gray-50">Notifications</Link>
          <Link to="/dashboard/staff/profile" className="px-3 py-2 rounded hover:bg-gray-50">Profile</Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
