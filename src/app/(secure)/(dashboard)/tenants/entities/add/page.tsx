"use client";
import { createTenantEntity } from "@/api/tenant-entity.service";
import DragDropField from "@/components/form/drag-drop-field"; // Import DragDropField
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

interface EntityFormInputs {
  name: string;
  libraryName: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  contact: Contact;
  logo: File[];
}

const AddTenantEntityPage: React.FC = () => {
  const [current, setCurrent] = useState(0); // Tracks current step
  const router = useRouter();
  const [logoFile, setLogoFile] = useState<File | null>(null); // Store the uploaded logo

  const {
    register: entityRegister,
    handleSubmit: handleEntitySubmit,
    formState: { errors: entityErrors },
  } = useForm<EntityFormInputs>({});

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

  const onSubmitEntity = async (data: EntityFormInputs) => {
    try {
      const entityData = {
        ...data,
        logo: logoFile,
      };

      const response = await createTenantEntity(entityData);
      message.success("Tenant Entity Created!");
      router.push("/tenants/entities");
    } catch (error) {
      console.error("Entity registration failed");
    }
  };

  const steps = [
    {
      title: "Entity Information",
      content: (
        <FormStep
          key={current}
          onSubmit={handleEntitySubmit(onSubmitEntity)}
          currentStep={current}
          totalSteps={1}
          onNext={next}
          onPrev={prev}
        >
          <div className="flex flex-1">
            <div className="space-y-4 w-1/2 bg-primary rounded-md p-3 bg-opacity-10 mr-2">
              <div className="font-bold text-lg">Entity Info</div>
              <FormField
                label="Entity Name"
                name="name"
                register={entityRegister}
                errors={entityErrors}
                placeholder="Enter entity name"
              />
              <FormField
                label="Library Name"
                name="libraryName"
                register={entityRegister}
                errors={entityErrors}
                placeholder="Enter library name"
              />
              <FormField
                label="Email"
                name="contact.email"
                register={entityRegister}
                errors={entityErrors}
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
                register={entityRegister}
                errors={entityErrors}
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
              <div className="font-bold text-lg">Entity Address</div>
              <FormField
                label="Street Address"
                name="address.street"
                register={entityRegister}
                errors={entityErrors}
                placeholder="Enter street address"
              />
              <FormField
                label="City"
                name="address.city"
                register={entityRegister}
                errors={entityErrors}
                placeholder="Enter city"
              />
              <FormField
                label="State"
                name="address.state"
                register={entityRegister}
                errors={entityErrors}
                placeholder="Enter state"
              />
              <FormField
                label="Country"
                name="address.country"
                register={entityRegister}
                errors={entityErrors}
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

  return <Stepper steps={steps} currentStep={current} />;
};

export default AddTenantEntityPage;
