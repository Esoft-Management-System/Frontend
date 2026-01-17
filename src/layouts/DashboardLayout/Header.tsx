import { useEffect, useState } from "react";

const Header = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setTime(`Last marked: Today, ${formattedTime}`);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">{time}</p>
      </div>
    </header>
  );
};

export default Header
