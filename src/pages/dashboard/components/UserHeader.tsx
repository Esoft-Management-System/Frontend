import type { FC } from "react";

interface UserHeaderProps {
  userName: string;
  role: string;
  onLogout: () => void;
}

const getInitials = (name: string) => {
  const safeName = name.trim();
  if (!safeName) return "?";
  const parts = safeName.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const UserHeader: FC<UserHeaderProps> = ({ userName, role, onLogout }) => {
  const initials = getInitials(userName);

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-sm">
        {initials}
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-slate-900">{userName}</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">{role}</p>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="ml-4 px-3 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default UserHeader;
