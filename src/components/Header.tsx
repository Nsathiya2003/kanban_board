import { ChevronDown, LayoutDashboard, MoonIcon, SunIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface HeaderProps {
  filter: string;
  setFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  filter,
  setFilter,
  search,
  setSearch,
  selectedDate,
  setSelectedDate,
}) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.style.transition = "background-color 0.3s, color 0.3s";
    if (!darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setDarkMode(!darkMode);
    setTimeout(() => (root.style.transition = ""), 350);
  };

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      root.classList.add("dark");
      setDarkMode(true);
    } else {
      root.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center 
      bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      p-6 rounded-t-2xl shadow-md mb-6 gap-4 md:gap-0">

      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-8 w-8 text-violet-500 dark:text-teal-400" />
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text
          bg-gradient-to-r from-blue-500 to-teal-400 tracking-wide">
          Kanban Board
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full md:w-auto">
        {/* Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm hover:shadow-md"
          />
        </div>

        {/* Filter */}
        <div className="relative inline-block w-48">
          <select
            className="appearance-none w-full px-4 py-2 pr-10 rounded-xl border border-gray-300 
              dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
              focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm hover:shadow-md transition"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="high">High Priority</option>
            <option value="duedate">Due Date</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 dark:text-gray-300 h-5 w-5 pointer-events-none" />
        </div>

        {/* Date picker for due date filter */}
        {filter === "duedate" && (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none
              focus:ring-2 focus:ring-blue-400 transition"
          />
        )}

        {/* Dark/Light Toggle */}
        <button onClick={toggleDarkMode} className="p-2 rounded-full">
          {darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> 
                     : <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-100" />}
        </button>
      </div>
    </div>
  );
};

export default Header;
