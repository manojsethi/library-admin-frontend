"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const router = useRouter();

  if (!user) router.push("/login");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-500 to-indigo-600">
        <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

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
