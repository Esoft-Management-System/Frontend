import { Search, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Last marked: Today, 2:30 PM</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-50 ml-2 outline-none text-sm text-gray-700 w-48"
          />
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-50 rounded-lg transition">
            <Clock size={20} className="text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-50 rounded-lg transition">
            <User size={20} className="text-gray-600" />
          </button>

          <Link 
            to="/" 
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;