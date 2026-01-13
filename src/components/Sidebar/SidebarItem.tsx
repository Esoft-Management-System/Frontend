import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

type Props = {
  lable: string;
  path: string;
  icon: LucideIcon;
}
const SidebarItem = ({ lable, path, icon: Icon }: Props) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
    >
      <Icon size={18} />
      <span>{lable}</span>
    </NavLink>
  )
}

export default SidebarItem
