import {
  FiHome,
  FiBarChart,
  FiUsers,
  FiPlusCircle,
  FiList,
  FiBox,
  FiTag,
} from "react-icons/fi";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    roles: ["admin"],
    icon: <FiHome />, // Home icon for Dashboard
  },
  {
    title: "Dashboard",
    url: "/tenants/dashboard",
    roles: ["tenant-admin"],
    icon: <FiHome />, // Home icon for Tenant Dashboard
  },
  {
    title: "Tenants",
    roles: ["admin"],
    url: "/tenants",
    icon: <FiUsers />, // Users icon for Tenants section
    submenu: [
      {
        title: "List",
        url: "/",
        roles: ["admin"],
        icon: <FiList />, // List icon for listing tenants
      },
      {
        title: "Add",
        url: "/add",
        roles: ["admin"],
        icon: <FiPlusCircle />,
      },
    ],
  },
  {
    title: "Tenant Entities",
    roles: ["admin"],
    url: "/tenants/entities",
    icon: <FiList />,
  },
  {
    title: "Tenant Entities",
    roles: ["tenant-admin"],
    url: "/tenants/entities",
    icon: <FiBox />, // Box icon for Entities section
    submenu: [
      {
        title: "List",
        url: "/",
        roles: ["tenant-admin"],
        icon: <FiList />, // List icon for listing entities
      },
      {
        title: "Add",
        url: "/add",
        roles: ["tenant-admin"],
        icon: <FiPlusCircle />, // Plus Circle icon for adding an entity
      },
    ],
  },
];
