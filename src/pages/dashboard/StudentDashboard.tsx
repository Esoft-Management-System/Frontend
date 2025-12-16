import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { initializeStudentAuth, logoutStudent } from "../../redux/slices/studentSlice";
import { STUDENT_DATA_KEY } from "../../services/api-request";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentStudent } = useAppSelector((state) => state.student);
  const hasStoredStudent = Boolean(
    localStorage.getItem(STUDENT_DATA_KEY) || sessionStorage.getItem(STUDENT_DATA_KEY)
  );

  useEffect(() => {
    dispatch(initializeStudentAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!currentStudent && !hasStoredStudent) {
      navigate("/");
    }
  }, [currentStudent, hasStoredStudent, navigate]);

  const handleLogout = () => {
    dispatch(logoutStudent());
    navigate("/");
  };

  const displayName = currentStudent?.fullName || currentStudent?.email || "Student User";
  const displayRole = currentStudent?.role || "student";

  return (
    <DashboardLayout
      title="Student Panel"
      userName={displayName}
      role={displayRole}
      onLogout={handleLogout}
    >
      <div className="space-y-3">
        <p className="text-lg font-semibold text-slate-900">Welcome back, {displayName}.</p>
        <p className="text-slate-600 text-sm">You are signed in as a {displayRole}. This shared panel will later surface role-specific widgets.</p>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
