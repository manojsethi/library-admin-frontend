"use client";
import { RootState } from "@/store/store";
import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu } from "react-icons/fi"; // Menu icon from react-icons
import { toggleSidebar } from "@/store/slices/sidebar.slice";

interface HeaderProps {
  location: "public" | "dashboard";
}

const Header: React.FC<HeaderProps> = ({ location }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <header className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white p-4 shadow-lg">
      <div
        className={`flex justify-between items-center ${
          location === "public" ? "container mx-auto" : ""
        }`}
      >
        {location === "dashboard" && (
          <button
            onClick={handleToggleSidebar}
            className="text-2xl cursor-pointer"
          >
            <FiMenu />
          </button>
        )}
        {location === "public" && (
          <div className="text-xl font-bold">Library Nest</div>
        )}

        {/* Navigation Links */}
        <nav className="ml-auto">
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link className="hover:underline" href="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/invite" className="hover:underline">
                    Get Invite
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <Link className="hover:underline" href="/dashboard">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
