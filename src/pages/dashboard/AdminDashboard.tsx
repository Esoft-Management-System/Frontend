import { useNavigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { STAFF_DATA_KEY } from "../../services/api-request";
import { useEffect } from "react";
import { initializeStaffAuth, logoutStaff } from "../../redux/slices/staffSlice";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentStaff } = useAppSelector((state) => state.staff);
  const hasStoredStaff = Boolean(
    localStorage.getItem(STAFF_DATA_KEY) || sessionStorage.getItem(STAFF_DATA_KEY)
  )

  useEffect(() => {
    dispatch(initializeStaffAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!currentStaff && !hasStoredStaff) {
      navigate("/");
    }
  }, [currentStaff, hasStoredStaff, navigate]);

  const handleLogout = () => {
    dispatch(logoutStaff());
    navigate("/");
  };

  const displayName = currentStaff?.fullname || currentStaff?.email || "Admin User";
  const displayRole = currentStaff?.role || "admin";

  return (
    <DashboardLayout
      title="Admin Panel"
      userName={displayName}
      role={displayRole}
      onLogout={handleLogout}
    >
      <p className="text-slate-600 text-sm">Admin tooling will be added here.</p>
    </DashboardLayout>
  );
};

export default AdminDashboard;
