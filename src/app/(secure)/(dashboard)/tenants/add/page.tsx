"use client";
import { registerTenantUser } from "@/api/tenant.service";
import FormField from "@/components/form/form-field";
import FormStep from "@/components/form/form-step";
import Stepper from "@/components/form/stepper";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Contact {
  phone: string;
  email: string;
}

interface AddTenantFormInputs {
  email: string;
  password: string;
  name: string;
  phone: string;
}

const AddTenantPage: React.FC = () => {
  const [current, setCurrent] = useState(0); // Tracks current step
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTenantFormInputs>({});

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onSubmitUser = async (data: AddTenantFormInputs) => {
    try {
      const response = await registerTenantUser(data);
      setUserId(response._id);
      // next();
      router.push("/tenants");

      message.success("Registration successful!");
    } catch (error) {
      message.error("User registration failed");
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
          totalSteps={1}
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
  ];

  return <Stepper steps={steps} currentStep={current} />;
};

export default AddTenantPage;
