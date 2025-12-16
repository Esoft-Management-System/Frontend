import { useNavigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <DashboardLayout
      title="Admin Panel"
      userName="Admin"
      role="admin"
      onLogout={handleLogout}
    >
      <p className="text-slate-600 text-sm">Admin tooling will be added here.</p>
    </DashboardLayout>
  );
};

export default AdminDashboard;
