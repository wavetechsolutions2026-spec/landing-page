import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  service: z
    .string()
    .min(1, "Please select a service."),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be at most 2000 characters."),
  // Honeypot field. If filled, the submission is silently ignored.
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const serviceOptions = [
  "Landing Page",
  "Editable Website",
  "E-commerce",
  "Mobile App",
  "Custom Software",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Not sure yet",
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$10,000",
  "$10,000+",
] as const;
