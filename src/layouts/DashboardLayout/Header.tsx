import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="text-lg font-semibold">Staff Dashboard</div>
      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm text-blue-600">Home</Link>
      </div>
    </header>
  );
};

export default Header;
