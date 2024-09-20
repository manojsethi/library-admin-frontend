"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormStep from "@/components/form/form-step";
import FormField from "@/components/form/form-field";
import DragDropField from "@/components/form/drag-drop-field"; // Import DragDropField
import { registerUser } from "@/api/auth.service";
import { message } from "antd";
import { createTenant } from "@/api/tenant.service";

interface Contact {
  phone: string;
  email: string;
}

interface RegisterFormInputs {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface TenantFormInputs {
  name: string;
  libraryName: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  contact: Contact;
  logo: File[]; // Add logo field for tenant form
}

const RegisterPage: React.FC = () => {
  const [current, setCurrent] = useState(0); // Tracks current step
  const router = useRouter();
  const [logoFile, setLogoFile] = useState<File | null>(null); // Store the uploaded logo
  const [userId, setUserId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({});

  const {
    register: tenantRegister,
    handleSubmit: handleTenantSubmit,
    formState: { errors: tenantErrors },
  } = useForm<TenantFormInputs>({});

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleLogoDrop = (acceptedFiles: File[]) => {
    setLogoFile(acceptedFiles[0]); // Only store the first file
  };

  const clearLogo = () => {
    setLogoFile(null); // Clear the selected file
  };

  const onSubmitUser = async (data: RegisterFormInputs) => {
    try {
      const response = await registerUser(data);
      setUserId(response._id);
      next();
      message.success("Registration successful!");
    } catch (error) {
      message.error("User registration failed");
    }
  };

  const onSubmitTenant = async (data: TenantFormInputs) => {
    try {
      const tenantData = {
        ...data,
        userId,
        logo: logoFile,
      };

      const response = await createTenant(tenantData);
      message.success("Tenant Created!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Tenant registration failed");
    }
  };

  const steps = [
    {
      title: "User Information",
      content: (
        <FormStep
          key={current}
          onSubmit={handleSubmit(onSubmitUser)}
          currentStep={current}
          totalSteps={2}
          onNext={next}
          onPrev={prev}
        >
          <FormField
            label="Email"
            name="email"
            register={register}
            errors={errors}
            placeholder="Enter your email"
            type="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            }}
          />
          <FormField
            label="Password"
            name="password"
            register={register}
            errors={errors}
            type="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              maxLength: {
                value: 15,
                message: "Password cannot exceed 15 characters",
              },
              pattern: {
                value:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            }}
            placeholder="Enter your password"
          />
          <FormField
            label="Name"
            name="name"
            register={register}
            errors={errors}
            placeholder="Enter your full name"
          />
          <FormField
            label="Phone"
            name="phone"
            register={register}
            errors={errors}
            type="tel"
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            }}
            placeholder="Enter your phone number"
          />
        </FormStep>
      ),
    },
    {
      title: "Tenant Information",
      content: (
        <FormStep
          key={current}
          onSubmit={handleTenantSubmit(onSubmitTenant)}
          currentStep={current}
          totalSteps={2}
          onNext={next}
          onPrev={prev}
        >
          <div className="flex flex-1">
            <div className="space-y-4 w-1/2 bg-primary rounded-md p-3 bg-opacity-10 mr-2">
              <div className="font-bold text-lg">Tenant Info</div>
              <FormField
                label="Tenant Name"
                name="name"
                register={tenantRegister}
                errors={tenantErrors}
                placeholder="Enter tenant name"
              />
              <FormField
                label="Library Name"
                name="libraryName"
                register={tenantRegister}
                errors={tenantErrors}
                placeholder="Enter library name"
              />
              <FormField
                label="Email"
                name="contact.email"
                register={tenantRegister}
                errors={tenantErrors}
                type="email"
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                }}
                placeholder="Enter contact email"
              />
              <FormField
                label="Phone"
                name="contact.phone"
                register={tenantRegister}
                errors={tenantErrors}
                type="tel"
                rules={{
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                }}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-4 w-1/2 bg-primary rounded-md p-3 bg-opacity-10">
              <div className="font-bold text-lg">Tenant Address</div>
              <FormField
                label="Street Address"
                name="address.street"
                register={tenantRegister}
                errors={tenantErrors}
                placeholder="Enter street address"
              />
              <FormField
                label="City"
                name="address.city"
                register={tenantRegister}
                errors={tenantErrors}
                placeholder="Enter city"
              />
              <FormField
                label="State"
                name="address.state"
                register={tenantRegister}
                errors={tenantErrors}
                placeholder="Enter state"
              />
              <FormField
                label="Country"
                name="address.country"
                register={tenantRegister}
                errors={tenantErrors}
                placeholder="Enter country"
              />
            </div>
          </div>
          <div className="space-y-4 w-full bg-primary rounded-md p-3 bg-opacity-10">
            <div className="font-bold text-lg">Library Logo</div>
            <DragDropField
              onDrop={handleLogoDrop}
              file={logoFile}
              clearFile={clearLogo}
            />
          </div>
        </FormStep>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center bg-gray-100">
      <div className="font-bold text-2xl mb-4">Register New Tenant</div>
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 flex items-center justify-center p-4 font-semibold ${
                index == current ? "border-b-2 border-primary" : ""
              }`}
            >
              <div
                className={`${
                  index == current ? "bg-primary-light" : "bg-primary"
                } flex justify-center text-white items-center w-8 aspect-square rounded-full mr-4`}
              >
                {index + 1}
              </div>
              <p>{step.title}</p>
            </div>
          ))}
        </div>
        <div className="steps-content mt-4">{steps[current].content}</div>
      </div>
    </div>
  );
};

export default RegisterPage;
