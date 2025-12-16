import type { FC, ReactNode } from "react";
import UserHeader from "../components/UserHeader";

interface DashboardLayoutProps {
  title?: string;
  userName: string;
  role: string;
  onLogout: () => void;
  children?: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  title = "Dashboard",
  userName,
  role,
  onLogout,
  children,
}) => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <header className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{role}</p>
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          </div>
          <UserHeader userName={userName} role={role} onLogout={onLogout} />
        </header>
        <main className="mt-6 bg-white border border-slate-200 rounded-xl shadow-sm p-6 min-h-[60vh]">
          {children || (
            <p className="text-slate-600 text-sm">Select a section to get started.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
