// src/components/AppLayout.tsx
"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "@/api/auth.service";
import store, { RootState } from "@/store/store";
import { setCredentials, setLoading } from "@/store/slices/auth.slice";

const ReduxWrapped: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!isAuthenticated) {
          dispatch(setLoading({ loading: true }));
          if (!auth?.user) {
            const user = await authenticateUser();
            dispatch(
              setCredentials({
                user,
              })
            );
          }
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      } finally {
        // Always set loading to false, whether it's successful or failed
        dispatch(setLoading({ loading: false }));
        setIsAuthenticated(true);
      }
    };

    fetchUser(); // Call the async function
  }, [auth, dispatch]);
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-500 to-indigo-600">
        <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }
  return <>{children}</>;
};

export default ReduxWrapped;
