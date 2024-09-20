"use client";
import { authenticateUser } from "@/api/auth.service";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { setCredentials, setLoading } from "@/store/slices/auth.slice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useSelector((state: RootState) => state.auth);
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-500 to-indigo-600">
        <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <Header location="public" />
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-violet-500 to-indigo-600">
        {children}
      </main>
      <Footer />
    </>
  );
}
