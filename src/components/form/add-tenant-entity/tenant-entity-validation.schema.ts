import * as yup from "yup";

export const addTenantEntitySchema = yup.object({
  name: yup.string().required("Entity name is required"),
  libraryName: yup.string().required("Library name is required"),
  address: yup.object({
    street: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    pincode: yup.string().required("Pincode is required"),
  }),
  contact: yup.object({
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Invalid email address"
      ),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  }),
  logo: yup.mixed().nullable(),
});

export type AddTenantEntityFormData = yup.InferType<
  typeof addTenantEntitySchema
>;
