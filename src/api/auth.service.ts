// src/services/auth.service.ts

import axiosInstance from "../utils/axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authenticateUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
