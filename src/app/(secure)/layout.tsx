"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { menuItems } from "@/components/sidebar/sidebar-menu";
import { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const [authenticating, setIsAuthenticating] = useState(true);
  const router = useRouter();
  const pathName = usePathname();
  const allMenuItems = menuItems;
  if (!user) router.push("/login");

  const buildFullUrl = (parentUrl: string, subItemUrl: string) => {
    return `${parentUrl.replace(/\/$/, "")}/${(subItemUrl || "").replace(
      /^\//,
      ""
    )}`.replace(/\/$/, "");
  };

  const findRolesForPath = (items: any[], parentUrl: string = ""): string[] => {
    let matchedRoles = new Set<string>();

    for (const item of items) {
      const fullUrl = buildFullUrl(parentUrl, item.url || "");

      // If the full URL matches, add the roles
      if (fullUrl === pathName) {
        item.roles.forEach((role: string) => matchedRoles.add(role)); // Add roles to the Set
      }

      // Check if there are submenus and recursively find roles for the path
      if (item.submenu) {
        const submenuRoles = findRolesForPath(item.submenu, fullUrl);
        submenuRoles.forEach((role) => matchedRoles.add(role));
      }
    }

    return Array.from(matchedRoles); // Return all matched roles, including nested ones
  };

  const hasAccess = (allowedRoles: string[]) => {
    debugger;
    return allowedRoles.some((role) => user?.roles.includes(role));
  };
  useEffect(() => {
    setIsAuthenticating(true);
    const allowedRoles = findRolesForPath(menuItems);

    if (allowedRoles) {
      if (!hasAccess(allowedRoles)) {
        router.push("/404");
      } else setIsAuthenticating(false);
    }
  }, [pathName]);

  if (isLoading || authenticating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-500 to-indigo-600">
        <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  } else
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="flex-none border-r-2">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header location="dashboard" />

          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    );
}
