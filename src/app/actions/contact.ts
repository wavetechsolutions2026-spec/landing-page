"use server"

import { Resend } from "resend";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

export async function contactFormAction(
  values: ContactFormValues,
): Promise<{ success: boolean; error?: string }> {
  'use server';

  // Honeypot field: if filled, silently succeed without sending an email.
  if (values.website && values.website.trim().length > 0) {
    return { success: true };
  }

  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form and try again." };
  }

  const { name, email, company, service, budget, message } = parsed.data;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    await resend.emails.send({
      to: process.env.CONTACT_TO_EMAIL as string,
      from: process.env.CONTACT_FROM_EMAIL as string,
      replyTo: email,
      subject: `New quote request: ${service} — ${name}`,
      text: buildTextBody({ name, email, company, service, budget, message }),
      html: buildHtmlBody({ name, email, company, service, budget, message }),
    });
    return { success: true };
  } catch {
    // Never expose raw error details or API keys to the browser.
    return {
      success: false,
      error: "Failed to send your message. Please try again later.",
    };
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
    `Company: ${company ?? "Not provided"}`,
    `Service: ${service}`,
    `Budget: ${budget ?? "Not sure yet"}`,
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
      <tr><td><strong>Company</strong></td><td>${escapeHtml(company ?? "Not provided")}</td></tr>
      <tr><td><strong>Service</strong></td><td>${escapeHtml(service)}</td></tr>
      <tr><td><strong>Budget</strong></td><td>${escapeHtml(budget ?? "Not sure yet")}</td></tr>
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
