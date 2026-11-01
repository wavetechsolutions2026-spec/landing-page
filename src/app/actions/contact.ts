"use server"

import { Resend } from "resend";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

const SEND_FAILED = "Failed to send your message. Please try again later.";

export async function contactFormAction(
  values: ContactFormValues,
): Promise<{ success: boolean; error?: string }> {
  // Honeypot field: if filled, silently succeed without sending an email.
  if (values.website && values.website.trim().length > 0) {
    return { success: true };
  }

  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form and try again." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    const missing = [
      !apiKey && "RESEND_API_KEY",
      !to && "CONTACT_TO_EMAIL",
      !from && "CONTACT_FROM_EMAIL",
    ].filter(Boolean);
    console.error(`[contact] Missing environment variables: ${missing.join(", ")}`);
    return { success: false, error: SEND_FAILED };
  }

  const { name, email, company, service, budget, message } = parsed.data;
  const fields = { name, email, company, service, budget, message };

  try {
    const resend = new Resend(apiKey);
    // The SDK reports API failures as a returned `error`, not a thrown one.
    const { error } = await resend.emails.send({
      to,
      from,
      replyTo: email,
      subject: `New quote request: ${service} — ${name}`,
      text: buildTextBody(fields),
      html: buildHtmlBody(fields),
    });
    if (error) {
      // Server log only; never expose raw error details or API keys to the browser.
      console.error(`[contact] Resend rejected the email: ${error.name}: ${error.message}`);
      return { success: false, error: SEND_FAILED };
    }
    return { success: true };
  } catch (err) {
    console.error("[contact] Failed to reach Resend:", err instanceof Error ? err.message : err);
    return { success: false, error: SEND_FAILED };
  }
}

function buildTextBody({
  name,
  email,
  company,
  service,
  budget,
  message,
}: {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}) {
  return [
    `New quote request from Wave Tech Solution website`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Service: ${service}`,
    `Budget: ${budget || "Not sure yet"}`,
    ``,
    `Message:`,
    `${message}`,
    ``,
  ].join("\n");
}

function buildHtmlBody({
  name,
  email,
  company,
  service,
  budget,
  message,
}: {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}) {
  return `
    <h2>New quote request from Wave Tech Solution website</h2>
    <table>
      <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escapeHtml(company || "Not provided")}</td></tr>
      <tr><td><strong>Service</strong></td><td>${escapeHtml(service)}</td></tr>
      <tr><td><strong>Budget</strong></td><td>${escapeHtml(budget || "Not sure yet")}</td></tr>
    </table>
    <h3>Message</h3>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
