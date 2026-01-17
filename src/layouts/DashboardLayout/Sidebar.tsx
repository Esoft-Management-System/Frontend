import { LayoutDashboard, Users, ClipboardList, Bell, User, LogOut } from "lucide-react";
import SidebarItem from "../../components/Sidebar/SidebarItem";

const Sidebar = () => {
  const menuItems = [
    {
      lable: "Dashboard",
      path: "/dashboard/staff",
      icon: LayoutDashboard,
    },
    {
      lable: "Students",
      path: "/dashboard/staff/students",
      icon: Users,
    },
    {
      lable: "Results",
      path: "/dashboard/staff/results",
      icon: ClipboardList,
    },
    {
      lable: "Notifications",
      path: "/dashboard/staff/notifications",
      icon: Bell,
    },
    {
      lable: "Profile",
      path: "/dashboard/staff/profile",
      icon: User,
    },
  ];

  return (
    <aside className="w-64 bg-white h-screen flex flex-col border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ESOFT</h1>
            <p className="text-xs text-gray-500">Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-4 flex-1">
        {menuItems.map((item) => (
          <SidebarItem key={item.path} {...item} />
        ))}
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <SidebarItem 
            lable="Logout" 
            path="/" 
            icon={LogOut} 
          />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
