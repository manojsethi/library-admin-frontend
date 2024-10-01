import React from "react";
import SidebarSubMenu from "./sidebar-sub-menu";
import { MenuItem } from "./sidebar-menu-item";

interface HoverPopupProps {
  item: MenuItem;
  parentUrl?: string;
}

const HoverPopup: React.FC<HoverPopupProps> = ({ item, parentUrl = "" }) => {
  return (
    <div className="absolute left-full bg-white text-black shadow-lg rounded-md z-50 p-2 space-y-2">
      <div className="border-b-2 text-center">
        <span className="font-bold">{item.title}</span>
      </div>
      {/* Render recursive hover submenu */}
      <div className="-ml-4">
        <SidebarSubMenu
          submenuItems={item.submenu || []}
          isOpen={false} // Hover view
          parentUrl={parentUrl}
          isHoverPopup={true} // Pass hover state
        />
      </div>
    </div>
  );
};

export default HoverPopup;
