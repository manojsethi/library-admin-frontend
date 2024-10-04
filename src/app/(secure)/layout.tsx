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

  const findRolesForPath = (
    items: any[],
    parentUrl: string = ""
  ): string[] | null => {
    let matchedRoles: string[] | null = null;

    for (const item of items) {
      const fullUrl = buildFullUrl(parentUrl, item.url || "");

      // Continue searching even if the fullUrl matches, only return after full check
      if (fullUrl === pathName) {
        matchedRoles = item.roles; // Store the roles but keep searching
      }

      if (item.submenu) {
        const rolesInSubmenu = findRolesForPath(item.submenu, fullUrl);
        if (rolesInSubmenu) {
          return rolesInSubmenu; // Immediately return if submenu has a match
        }
      }
    }

    return matchedRoles; // Only return after all checks are complete
  };

  const hasAccess = (allowedRoles: string[]) => {
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
