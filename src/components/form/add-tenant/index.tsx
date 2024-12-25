import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddTenantFormData, addTenantSchema } from "./tenant-validation.schema";
import { registerTenantUser } from "@/api/tenant.service";
import { toast } from "react-toastify";

interface AddTenantFormProps {
  onSubmit: (data: AddTenantFormData) => Promise<void>;
}

const AddTenantForm: React.FC<AddTenantFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTenantFormData>({
    resolver: yupResolver(addTenantSchema),
  });
  const handleFormSubmit = async (data: AddTenantFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
      autoComplete="off"
    >
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 items-end">
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">Name</label>
          <input
            type="text"
            {...register("name")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Fullname"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">Phone</label>
          <input
            type="tel"
            {...register("phone")}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        <div className="justify-end w-full lg:bottom-[1.5px] lg:relative">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full"
          >
            Add Tenant
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTenantForm;
