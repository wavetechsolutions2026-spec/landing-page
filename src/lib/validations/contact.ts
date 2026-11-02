import { z } from "zod";

export const serviceOptions = [
  "Landing Page",
  "Editable Website",
  "E-commerce",
  "Mobile App",
  "Custom Software",
  "Not sure yet",
  "Others",
] as const;

export const OTHER_SERVICE = "Others";

export const currencyOptions = [
  { value: "USD", label: "USD ($)" },
  { value: "MMK", label: "MMK (Ks)" },
  { value: "THB", label: "THB (฿)" },
] as const;

export type Currency = (typeof currencyOptions)[number]["value"];

// Budget amounts are typed as text; commas and spaces are allowed ("10,000").
const amount = z
  .string()
  .optional()
  .refine((value) => !value || /^\d[\d,\s]*(\.\d{1,2})?$/.test(value.trim()), "Enter a number.");

export const parseAmount = (value?: string) =>
  value && value.trim() ? Number(value.replace(/[,\s]/g, "")) : undefined;

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name must be at most 100 characters."),
    email: z.string().email("Please enter a valid email address."),
    company: z.string().optional(),
    service: z.string().min(1, "Please select a service."),
    serviceOther: z.string().max(200, "Keep it under 200 characters.").optional(),
    budgetCurrency: z.enum(["USD", "MMK", "THB"]),
    budgetMin: amount,
    budgetMax: amount,
    message: z
      .string()
      .min(10, "Message must be at least 10 characters.")
      .max(2000, "Message must be at most 2000 characters."),
    // Honeypot field. If filled, the submission is silently ignored.
    website: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.service === OTHER_SERVICE && (values.serviceOther?.trim().length ?? 0) < 2) {
      ctx.addIssue({ code: "custom", path: ["serviceOther"], message: "Tell us what you need." });
    }
    const min = parseAmount(values.budgetMin);
    const max = parseAmount(values.budgetMax);
    if (min !== undefined && max !== undefined && max < min) {
      ctx.addIssue({ code: "custom", path: ["budgetMax"], message: "Must be at least the minimum." });
    }
  });

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// "USD 1,000 – 3,000", "THB 50,000+", "Up to MMK 2,000,000", or undefined.
export function formatBudget({
  budgetCurrency,
  budgetMin,
  budgetMax,
}: Pick<ContactFormValues, "budgetCurrency" | "budgetMin" | "budgetMax">) {
  const min = parseAmount(budgetMin);
  const max = parseAmount(budgetMax);
  const fmt = (n: number) => n.toLocaleString("en-US");
  if (min !== undefined && max !== undefined) return `${budgetCurrency} ${fmt(min)} – ${fmt(max)}`;
  if (min !== undefined) return `${budgetCurrency} ${fmt(min)}+`;
  if (max !== undefined) return `Up to ${budgetCurrency} ${fmt(max)}`;
  return undefined;
}

// The service as written in the email: "Others: Chatbot for our shop".
export const describeService = ({ service, serviceOther }: Pick<ContactFormValues, "service" | "serviceOther">) =>
  service === OTHER_SERVICE && serviceOther?.trim() ? `Others: ${serviceOther.trim()}` : service;
