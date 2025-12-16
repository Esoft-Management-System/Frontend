import { useNavigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/staff");
  };

  return (
    <DashboardLayout
      title="Staff Panel"
      userName="Staff User"
      role="staff"
      onLogout={handleLogout}
    >
      <p className="text-slate-600 text-sm">Staff widgets will live here.</p>
    </DashboardLayout>
  );
};

export default StaffDashboard;
