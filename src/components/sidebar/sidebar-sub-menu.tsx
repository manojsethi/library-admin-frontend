import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";
import React, { useState } from "react";
import { MenuItem } from "./sidebar-menu-item";
import { usePathname } from "next/navigation";

interface SidebarSubMenuProps {
  submenuItems: MenuItem[];
  isOpen: boolean;
  parentUrl?: string;
  isHoverPopup?: boolean; // To control whether the submenu is inside a hover pop-up
}

const SidebarSubMenu: React.FC<SidebarSubMenuProps> = ({
  submenuItems,
  isOpen,
  parentUrl = "",
  isHoverPopup = false,
}) => {
  // Use an object to track expanded states for each submenu item by title
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>(
    {}
  );
  const pathname = usePathname();

  const buildFullUrl = (subItemUrl?: string) => {
    let url = `${parentUrl.replace(/\/$/, "")}/${(subItemUrl || "").replace(
      /^\//,
      ""
    )}`; // Build full URL ensuring no extra slashes
    url = url.replace(/\/$/, "");

    return url;
  };

  const toggleSubmenu = (event: React.MouseEvent, subItemTitle: string) => {
    event.stopPropagation(); // Prevent event bubbling to the parent
    setExpandedStates((prev) => ({
      ...prev,
      [subItemTitle]: !prev[subItemTitle],
    }));
  };

  return (
    <ul className={`${isHoverPopup ? "ml-4" : "ml-6"} space-y-2 py-1`}>
      {submenuItems.map((subItem, index) => {
        const fullUrl = buildFullUrl(subItem.url); // Use the URL builder function

        return (
          <li
            key={index}
            className={`flex flex-col rounded-md px-1 ${
              expandedStates[subItem.title] ? "bg-black bg-opacity-5" : ""
            }`}
          >
            <div
              className={`flex items-center w-full cursor-pointer px-2 py-1 rounded-md ${
                !expandedStates[subItem.title] && pathname != fullUrl
                  ? "hover:bg-purple-950 hover:bg-opacity-20"
                  : ""
              } ${pathname == fullUrl ? "bg-purple-950 bg-opacity-40" : ""}`}
            >
              {subItem.icon && (
                <span className="text-xl min-w-[24px]">{subItem.icon}</span>
              )}
              {subItem.url && !subItem.submenu ? (
                <Link className="w-full" href={fullUrl}>
                  <span className="ml-2">{subItem.title}</span>
                </Link>
              ) : (
                <span className="ml-2">{subItem.title}</span>
              )}

              {/* Check if the submenu item has its own children */}
              {subItem.submenu && (
                <span
                  className="ml-auto cursor-pointer mr-1"
                  onClick={(e) => toggleSubmenu(e, subItem.title)} // Toggle submenu
                >
                  {expandedStates[subItem.title] ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </span>
              )}
            </div>

            {/* If expanded, recursively render subchildren */}
            {expandedStates[subItem.title] && subItem.submenu && (
              <SidebarSubMenu
                submenuItems={subItem.submenu}
                isOpen={isOpen}
                parentUrl={fullUrl} // Pass full URL down
                isHoverPopup={isHoverPopup} // Pass hover state down
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarSubMenu;
