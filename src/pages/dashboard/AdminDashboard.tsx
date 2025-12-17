import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { STAFF_DATA_KEY } from "../../services/api-request";
import { initializeStaffAuth, logoutStaff, fetchAdminSummary } from "../../redux/slices/staffSlice";
import { staffService } from "../../services/staff.service";
import { toast } from "react-toastify";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Users,
  Key,
  LogOut,
  Clock,
  UserCheck,
  UserX,
  Mail,
  Briefcase,
  User,
  Loader2
} from "lucide-react";

interface StaffRequestRow {
  _id: string;
  staffId?: string;
  fullName?: string;
  fullname?: string;
  email?: string;
  designation?: string;
  status?: string;
  createdAt?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentStaff, adminSummary, adminSummaryLoading, adminSummaryError } = useAppSelector(
    (state) => state.staff
  );

  const hasStoredStaff = Boolean(
    localStorage.getItem(STAFF_DATA_KEY) || sessionStorage.getItem(STAFF_DATA_KEY)
  );

  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(initializeStaffAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!currentStaff && !hasStoredStaff) {
      navigate("/");
    }
  }, [currentStaff, hasStoredStaff, navigate]);

  useEffect(() => {
    dispatch(fetchAdminSummary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = async (id: string, action: "approve" | "reapprove" | "reject") => {
    try {
      setActionId(id + action);
      if (action === "approve") await staffService.approveStaffRequest(id);
      if (action === "reapprove") await staffService.reapproveStaffRequest(id);
      if (action === "reject") await staffService.rejectStaffRequest(id);
      toast.success(`${action === "reject" ? "Rejected" : "Updated"} successfully`);
      await dispatch(fetchAdminSummary());
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? "Action failed";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setActionId(null);
    }
  };

  const handleLogout = () => {
    dispatch(logoutStaff());
    navigate("/");
  };

  const displayName = currentStaff?.fullname || currentStaff?.email || "Admin User";
  const displayRole = currentStaff?.role || "admin";

  const loading = adminSummaryLoading;
  const error = adminSummaryError;
  const pendingRequests = adminSummary?.pending || [];
  const pendingTempPassword = adminSummary?.awaitingPasswordChange || [];

  const renderStatCard = (icon: React.ReactNode, title: string, value: number, color: string, bgColor: string) => (
    <div className={`p-5 rounded-xl border ${bgColor} ${color} border-opacity-20`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${bgColor} ${color} bg-opacity-20`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const renderTable = (rows: StaffRequestRow[], type: "request" | "temp") => (
    <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Staff Details</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Designation</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr>
                <td className="px-5 py-8 text-center text-slate-400" colSpan={4}>
                  <div className="flex flex-col items-center justify-center">
                    <Users className="h-10 w-10 text-slate-300 mb-2" />
                    <p className="text-sm">No records found</p>
                  </div>
                </td>
              </tr>
            )}
            {rows.map((row) => {
              const name = row.fullName || row.fullname || "-";
              const staffId = row.staffId || (row as any)?.staffCode || (row as any)?.staffID || "-";
              const email = row.email || "-";
              const designation = row.designation || "-";
              const status = row.status || (type === "temp" ? "Pending password change" : "Pending");
              const rowId = row._id || (row as any).id || (row as any)._id || "";
              const approving = actionId === rowId + "approve";
              const reapproving = actionId === rowId + "reapprove";
              const rejecting = actionId === rowId + "reject";

              return (
                <tr key={rowId || `${email}-${status}`} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <p className="text-xs text-slate-500 truncate max-w-[200px]">{email}</p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">ID: {staffId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3 w-3 text-slate-400" />
                      <span className="text-slate-700">{designation}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {type === "temp" ? (
                        <Key className="h-3 w-3 text-amber-500" />
                      ) : (
                        <Clock className="h-3 w-3 text-blue-500" />
                      )}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        type === "temp" 
                          ? "bg-amber-50 text-amber-700 border border-amber-100" 
                          : "bg-blue-50 text-blue-700 border border-blue-100"
                      }`}>
                        {status}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {type === "request" && (
                        <>
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleAction(rowId, "approve")}
                            disabled={approving || rejecting || reapproving}
                          >
                            {approving ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <UserCheck className="h-3 w-3" />
                            )}
                            {approving ? "Approving..." : "Approve"}
                          </button>
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleAction(rowId, "reject")}
                            disabled={approving || rejecting || reapproving}
                          >
                            {rejecting ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <UserX className="h-3 w-3" />
                            )}
                            {rejecting ? "Rejecting..." : "Reject"}
                          </button>
                        </>
                      )}

                      {type === "temp" && (
                        <>
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleAction(rowId, "reapprove")}
                            disabled={approving || rejecting || reapproving}
                          >
                            {reapproving ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3 w-3" />
                            )}
                            {reapproving ? "Re-approving..." : "Re-approve"}
                          </button>
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleAction(rowId, "reject")}
                            disabled={approving || rejecting || reapproving}
                          >
                            {rejecting ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <UserX className="h-3 w-3" />
                            )}
                            {rejecting ? "Rejecting..." : "Reject"}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <DashboardLayout
      title="Admin Dashboard"
      userName={displayName}
      role={displayRole}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderStatCard(
            <Users className="h-5 w-5" />,
            "Pending Requests",
            pendingRequests.length,
            "text-blue-700",
            "bg-blue-50"
          )}
          {renderStatCard(
            <Key className="h-5 w-5" />,
            "Awaiting Password",
            pendingTempPassword.length,
            "text-amber-700",
            "bg-amber-50"
          )}
          {renderStatCard(
            <CheckCircle className="h-5 w-5" />,
            "Total Staff",
            (pendingRequests.length + pendingTempPassword.length),
            "text-emerald-700",
            "bg-emerald-50"
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
            <XCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-slate-100 rounded-xl bg-white shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Admin Menu</p>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-medium border border-blue-100 hover:bg-blue-100 transition-colors">
                  <Users className="h-4 w-4" />
                  Staff Management
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                  <UserCheck className="h-4 w-4" />
                  Approvals
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                  <Key className="h-4 w-4" />
                  Security
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                  <Briefcase className="h-4 w-4" />
                  Departments
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border border-slate-100 rounded-xl bg-white shadow-sm p-4">
              <p className="text-sm font-semibold text-slate-700 mb-4">Quick Actions</p>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-slate-50 text-slate-700 font-medium border border-slate-200 hover:bg-slate-100 transition-colors text-sm">
                  <RefreshCw className="h-4 w-4" />
                  Refresh Data
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 text-red-700 font-medium border border-red-200 hover:bg-red-100 transition-colors text-sm">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Panels */}
          <div className="lg:col-span-2 space-y-6">
            {/* Staff Requests Panel */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Staff Requests</h2>
                    <p className="text-sm text-slate-500">Approve or reject new staff registrations</p>
                  </div>
                </div>
                {loading && (
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                )}
              </div>
              {renderTable(pendingRequests, "request")}
            </section>

            {/* Pending Password Change Panel */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Key className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Pending Password Change</h2>
                    <p className="text-sm text-slate-500">Staff awaiting password setup</p>
                  </div>
                </div>
                {loading && (
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                )}
              </div>
              {renderTable(pendingTempPassword, "temp")}
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;