"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import DragDropField from "@/components/form/drag-drop-field";
import {
  addTenantEntitySchema,
  AddTenantEntityFormData,
} from "./tenant-entity-validation.schema";
import { message } from "antd";

interface AddTenantEntityFormProps {
  onSubmit: (
    data: AddTenantEntityFormData,
    logoFile: File | null
  ) => Promise<void>;
}

const AddTenantEntityForm: React.FC<AddTenantEntityFormProps> = ({
  onSubmit,
}) => {
  const router = useRouter();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTenantEntityFormData>({
    resolver: yupResolver(addTenantEntitySchema),
  });

  const handleLogoDrop = (acceptedFiles: File[]) => {
    setLogoFile(acceptedFiles[0]);
    setLogoError(null);
  };

  const clearLogo = () => {
    setLogoFile(null);
    setLogoError(null);
  };

  const handleFormSubmit = async (data: AddTenantEntityFormData) => {
    if (!logoFile) {
      setLogoError("Library logo is required");
      return;
    }
    await onSubmit(data, logoFile);
    reset();
    clearLogo();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
      autoComplete="off"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">
            Entity Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Entity Name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">
            Library Name
          </label>
          <input
            type="text"
            {...register("libraryName")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Library Name"
          />
          {errors.libraryName && (
            <p className="text-red-500 text-xs">{errors.libraryName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">Email</label>
          <input
            type="email"
            {...register("contact.email")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Contact Email"
          />
          {errors.contact?.email && (
            <p className="text-red-500 text-xs">
              {errors.contact.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">Phone</label>
          <input
            type="tel"
            {...register("contact.phone")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Phone Number"
          />
          {errors.contact?.phone && (
            <p className="text-red-500 text-xs">
              {errors.contact.phone.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            {...register("address.street")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Street Address"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">City</label>
          <input
            type="text"
            {...register("address.city")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="City"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">State</label>
          <input
            type="text"
            {...register("address.state")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="State"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">
            Pincode
          </label>
          <input
            type="text"
            {...register("address.pincode")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Pincode"
          />
        </div>
      </div>

      <div className="flex items-end gap-4">
        <div className="w-3/4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Library Logo
          </label>
          <DragDropField
            onDrop={handleLogoDrop}
            file={logoFile}
            clearFile={clearLogo}
          />
          {logoError && <p className="text-red-500 text-xs">{logoError}</p>}
        </div>
        <div className="w-1/4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full"
          >
            Add Entity
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTenantEntityForm;
