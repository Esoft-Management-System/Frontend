import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { initializeStaffAuth, logoutStaff } from "../../redux/slices/staffSlice";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentStaff } = useAppSelector((state) => state.staff);

  useEffect(() => {
    dispatch(initializeStaffAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!currentStaff) {
      navigate("/staff");
      return;
    }
    if (currentStaff.role !== "staff" && currentStaff.role !== "admin") {
      navigate("/staff");
    }
  }, [currentStaff, navigate]);

  const handleLogout = () => {
    dispatch(logoutStaff());
    navigate("/staff");
  };

  const displayName = currentStaff?.fullname || currentStaff?.email || currentStaff?.staffId || "Staff";
  const displayEmail = currentStaff?.email || "";
  const displayRole = currentStaff?.role || "staff";

  return (
    <DashboardLayout
      title="Staff Panel"
      userName={displayName}
      role={displayRole}
      onLogout={handleLogout}
    >
      <div className="space-y-2 text-slate-700 text-sm">
        <div className="font-semibold text-slate-900 text-base">Welcome back, {displayName}.</div>
        {displayEmail && <div>Email: {displayEmail}</div>}
        <div>Role: {displayRole}</div>
        <div>Staff ID: {currentStaff?.staffId ?? "N/A"}</div>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
