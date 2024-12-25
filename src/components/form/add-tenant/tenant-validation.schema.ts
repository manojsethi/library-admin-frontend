import * as yup from "yup";

export const addTenantSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Invalid email address"
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password cannot exceed 15 characters")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  name: yup.string().required("Name is required"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
});

export type AddTenantFormData = yup.InferType<typeof addTenantSchema>;
