import { Bell, ClipboardList, LayoutDashboard, LogOut, User, Users } from "lucide-react";

export const staffSidebarItems = [
  {
    lable: "Dashboard",
    path: "/staff/dashboard",
    icon: LayoutDashboard,
  },
  {
    lable: "Students",
    path: "/staff/students",
    icon: Users,
  },
  {
    label: "Results",
    path: "/staff/results",
    icon: ClipboardList,
  },
  {
    label: "Notifications",
    path: "/staff/notifications",
    icon: Bell,
  },
  {
    label: "Profile",
    path: "/staff/profile",
    icon: User,
  },
  {
    label: "Logout",
    path: "/logout",
    icon: LogOut,
  },
]