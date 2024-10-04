// src/services/tenant.service.ts

import axiosInstance from "../utils/axios";

// Service to create tenant information with FormData
export const createTenantEntity = async (entityData: {
  name: string;
  libraryName: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  logo: File | null; // Include file
}) => {
  const formData = new FormData();

  formData.append("name", entityData.name);
  formData.append("libraryName", entityData.libraryName);
  formData.append("address[street]", entityData.address.street);
  formData.append("address[city]", entityData.address.city);
  formData.append("address[state]", entityData.address.state);
  formData.append("address[country]", entityData.address.country);
  formData.append("contact[phone]", entityData.contact.phone);
  formData.append("contact[email]", entityData.contact.email);

  if (entityData.logo) {
    formData.append("logo", entityData.logo); // Append logo file if exists
  }

  try {
    const response = await axiosInstance.post(
      "/tenant-entities/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedTenantEntities = async (
  page: number,
  limit: number,
  filters = {}
) => {
  try {
    const response = await axiosInstance.post("/tenant-entities/all", {
      page,
      limit,
      filter: filters,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
