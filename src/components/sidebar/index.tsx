import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { closeSidebar, toggleSidebar } from "@/store/slices/sidebar.slice";
import {
  FiHome,
  FiBox,
  FiTag,
  FiBarChart,
  FiBook,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import SidebarMenuItem from "./sidebar-menu-item";
import { menuItems } from "./sidebar-menu";
import { motion } from "framer-motion";

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null); // For hover popup

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

  // Function to check if the user has access to a menu item based on roles
  const hasAccess = (roles: string[]) => {
    if (!user || !user.roles) return false;
    return roles.some((role) => user.roles.includes(role));
  };

  return (
    <div className="relative h-full">
      {/* Sidebar itself */}
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
        <div className="flex p-4 h-16 items-center justify-between">
          <div className="flex items-center">
            <FiBook className="text-3xl min-w-[24px]" />
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                width: isOpen ? "auto" : 0,
              }}
              transition={{ duration: 0.5 }}
              className="ml-2 text-lg font-bold text-nowrap overflow-hidden"
            >
              Library Nest
            </motion.span>
          </div>
        </div>

        {/* Dynamic Menu Items */}
        <ul className="mt-2">
          {menuItems.map((item, index) => (
            <SidebarMenuItem
              key={index}
              item={item}
              isOpen={isOpen}
              hasAccess={hasAccess} // Pass the role-based access function
              setHoveredItem={setHoveredItem}
              hoveredItem={hoveredItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
