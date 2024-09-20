import React from "react";

interface PhoneFieldProps {
  label: string;
  name: string;
  register: any;
  errors: any;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  label,
  name,
  register,
  errors,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="tel"
        {...register(name, {
          required: `${label} is required`,
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Phone number must be 10 digits",
          },
        })}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        placeholder="Enter your phone number"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default PhoneField;
