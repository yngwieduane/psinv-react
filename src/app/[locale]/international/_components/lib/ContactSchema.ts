import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const contactSchema = z.object({
    fname: z.string().min(1, 'First name is required'),
    lname: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
    phone: z.string().min(3, 'Phone number is required')
    .refine((val) => isValidPhoneNumber(val), {
        message:"Enter a valid international phone number (e.g., +971...)",
    }),
    message: z.string(),
    agreement1: z.boolean().refine((val) => val, { message: "You must agree this"} ),
    agreement2: z.boolean().optional(),
    agreement3: z.boolean().optional(),
})