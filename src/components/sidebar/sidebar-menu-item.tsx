import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";
import React, { useState } from "react";
import SidebarSubMenu from "./sidebar-sub-menu";
import HoverPopup from "./hover-pop-up";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export interface MenuItem {
  title: string;
  url?: string;
  roles: string[];
  icon?: JSX.Element; // Include icon in the menu item structure
  submenu?: MenuItem[];
}

interface SidebarMenuItemProps {
  item: MenuItem;
  isOpen: boolean;
  menuKey: any;
  hasAccess: (roles: string[]) => boolean; // Function to check role-based access
  setHoveredItem: React.Dispatch<React.SetStateAction<string | null>>;
  hoveredItem: string | null;
  parentUrl?: string;
  isSubmenu?: boolean; // Whether this item is inside a submenu
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  menuKey,
  isOpen,
  hasAccess,
  setHoveredItem,
  hoveredItem,
  parentUrl = "",
  isSubmenu = false, // Default is false, used for controlling pop-up behavior
}) => {
  const [expanded, setExpanded] = useState(false); // Track whether this item is expanded

  // Toggle submenu and prevent event propagation to parent menus
  const toggleSubmenu = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event bubbling to the parent
    setExpanded(!expanded);
  };

  const handleMouseEnter = () => {
    if (!isOpen && item.submenu) {
      setHoveredItem(item.title);
    }
  };

  const handleMouseLeave = () => {
    if (!isOpen && item.submenu) {
      setHoveredItem(null);
    }
  };

  // If the user doesn't have access, return null
  if (!hasAccess(item.roles)) {
    return null;
  }

  // Combine parent URL and current item URL if both exist
  const fullUrl = parentUrl && item.url ? `${parentUrl}${item.url}` : item.url;
  const pathname = usePathname();

  return (
    <li
      key={menuKey}
      className={`flex flex-col p-2 relative ${
        expanded ? "bg-purple-300 bg-opacity-20" : ""
      } ${isSubmenu ? "ml-2" : ""}`} // Add margin-left for submenus
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex ${
          !expanded && pathname == fullUrl ? "bg-purple-950 bg-opacity-40" : ""
        } ${
          !expanded && pathname != fullUrl
            ? "hover:bg-purple-950 hover:bg-opacity-20"
            : ""
        } rounded-md items-center justify-between w-full cursor-pointer pl-3 py-2`}
        onClick={item.submenu ? toggleSubmenu : undefined} // Toggle submenu on chevron click
      >
        <div className="flex items-center w-full">
          {item.icon && (
            <span className="text-xl min-w-[24px]">{item.icon}</span>
          )}

          {/* Show title and link only when sidebar is open */}
          {isOpen && (
            <>
              {item.url && !item.submenu ? (
                <Link className="w-full" href={fullUrl || ""}>
                  <span className={`ml-4 transition-all duration-300`}>
                    {item.title}
                  </span>
                </Link>
              ) : (
                <span className="ml-4 transition-all duration-300">
                  {item.title}
                </span>
              )}
            </>
          )}
        </div>

        {item.submenu && isOpen && (
          <span
            className="ml-auto mr-1"
            onClick={toggleSubmenu} // Toggle submenu on chevron click
          >
            {expanded ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        )}
      </div>

      {/* Render submenu when expanded */}
      {expanded && item.submenu && isOpen && (
        <SidebarSubMenu
          submenuItems={item.submenu}
          isOpen={isOpen}
          parentUrl={fullUrl || ""}
        />
      )}

      {/* Submenu pop-up when hovered over and not expanded */}
      {!isOpen && item.submenu && hoveredItem === item.title && (
        <HoverPopup item={item} parentUrl={fullUrl || ""} />
      )}
    </li>
  );
};

export default SidebarMenuItem;
