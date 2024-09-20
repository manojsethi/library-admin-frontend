import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  FiHome,
  FiBarChart,
  FiBox,
  FiTag,
  FiBook,
  FiChevronDown, // Arrow icon for submenu
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { closeSidebar } from "@/store/slices/sidebar.slice";

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null); // State to track selected menu

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth < 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        dispatch(closeSidebar()); // Close the sidebar when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  const handleMenuClick = (menuItem: string) => {
    // Toggle submenu visibility for the selected menu
    setSelectedMenu((prev) => (prev === menuItem ? null : menuItem));
  };

  return (
    <div
      ref={sidebarRef}
      className={`
          ${isOpen ? "w-64" : "w-16"} 
         bg-gradient-to-b from-violet-500 to-indigo-600 text-white h-full fixed md:relative top-0 left-0 transition-all duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          `}
    >
      {/* Sidebar Heading with Logo */}
      <div className="flex p-4 h-16">
        <FiBook className="text-3xl  min-w-[24px]" />
        <span
          className={`ml-2 transition-all duration-1000 text-lg font-bold ${
            isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden md:w-auto"
          }`}
        >
          Library Nest
        </span>
      </div>

      {/* Menu Items */}
      <ul className="p-4 space-y-4">
        {/* Dashboard */}
        <li className="flex items-center">
          <FiHome className="text-xl min-w-[24px]" />
          <span
            className={`ml-4 transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden md:w-auto"
            }`}
          >
            Dashboard
          </span>
        </li>

        {/* Products with Submenu */}
        <li className="flex flex-col items-start">
          <div
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={() => handleMenuClick("products")}
          >
            <div className="flex items-center">
              <FiBox className="text-xl min-w-[24px]" />
              <span
                className={`ml-4 transition-all duration-300 ${
                  isOpen
                    ? "opacity-100"
                    : "opacity-0 w-0 overflow-hidden md:w-auto"
                }`}
              >
                Products
              </span>
            </div>
            {/* Arrow icon that rotates based on submenu visibility */}
            {isOpen && (
              <FiChevronDown
                className={`text-xl transition-transform duration-300 ${
                  selectedMenu === "products" ? "rotate-180" : ""
                }`}
              />
            )}
          </div>

          {/* Submenu for Products */}
          {selectedMenu === "products" && isOpen && (
            <ul className="ml-8 space-y-2 text-sm mt-2">
              <li className="flex items-center">Product 1</li>
              <li className="flex items-center">Product 2</li>
              <li className="flex items-center">Product 3</li>
            </ul>
          )}
        </li>

        {/* Statistics */}
        <li className="flex items-center">
          <FiBarChart className="text-xl min-w-[24px]" title="Statistics" />
          <span
            className={`ml-4 transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden md:w-auto"
            }`}
          >
            Statistics
          </span>
        </li>

        {/* Offers */}
        <li className="flex items-center">
          <FiTag className="text-xl min-w-[24px]" />
          <span
            className={`ml-4 transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden md:w-auto"
            }`}
          >
            Offers
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
