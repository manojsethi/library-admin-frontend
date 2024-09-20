import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "@/components/app-layout";

export const metadata: Metadata = {
  title: "Library Nest",
  description: "App Riva Labs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="flex flex-col min-h-screen">
          <AppLayout>{children}</AppLayout>
        </div>
      </body>
    </html>
  );
}
