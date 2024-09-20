// src/services/tenant.service.ts

import axiosInstance from "../utils/axios";

// Service to create tenant information with FormData
export const createTenant = async (tenantData: {
  name: string;
  libraryName: string;
  userId: string;
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

  formData.append("name", tenantData.name);
  formData.append("libraryName", tenantData.libraryName);
  formData.append("userId", tenantData.userId);
  formData.append("address[street]", tenantData.address.street);
  formData.append("address[city]", tenantData.address.city);
  formData.append("address[state]", tenantData.address.state);
  formData.append("address[country]", tenantData.address.country);
  formData.append("contact[phone]", tenantData.contact.phone);
  formData.append("contact[email]", tenantData.contact.email);

  if (tenantData.logo) {
    formData.append("logo", tenantData.logo); // Append logo file if exists
  }

  try {
    const response = await axiosInstance.post("/tenants/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
