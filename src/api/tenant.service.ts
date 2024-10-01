// src/services/tenant.service.ts

import axiosInstance from "../utils/axios";

export const registerTenantUser = async (userData: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedTenants = async (
  page: number,
  limit: number,
  filters = {}
) => {
  try {
    const response = await axiosInstance.post("/users/all", {
      page,
      limit,
      filter: filters,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a tenant user by ID
export const deleteTenantUser = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
