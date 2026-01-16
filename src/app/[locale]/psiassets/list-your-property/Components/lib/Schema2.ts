import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const FormDataSchema2 = z.object({
    fname: z.string().min(1, 'First name is required'),
    lname: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
    phone: z
    .string()
    .min(3, "Phone number is required")
    .refine((val) => isValidPhoneNumber(val), {
      message: "Enter a valid international phone number (e.g., +971...)",
    }),
    purpose:z.string(),    
    proptype:z.string(),
    beds:z.string(),
    location: z
    .string()
    .min(1, "Location is required")
    .refine(val => val !== "Select location", {
    message: "Please select a valid location",
  }),
    property:z.string().min(1, ' Select a property'),
    agreement1:z.boolean().refine((val) => val, {message: "your must agree this"} ),
    agreement2:z.boolean().optional(),
    agreement3:z.boolean().optional(),
    cityName: z.string(),
    propName: z.string(),
}
);