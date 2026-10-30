import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { MotionProvider } from "@/components/motion/motion-provider";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Wave Tech Solution — Websites, E-commerce & Mobile Apps",
  description:
    "We design and build websites, online stores, mobile apps, and custom software for businesses in Myanmar, Thailand, and beyond.",
  openGraph: {
    title: "Wave Tech Solution — Websites, E-commerce & Mobile Apps",
    description:
      "We design and build websites, online stores, mobile apps, and custom software for businesses in Myanmar, Thailand, and beyond.",
    type: "website",
    locale: "en_US",
    siteName: "Wave Tech Solution",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wave Tech Solution — Websites, E-commerce & Mobile Apps",
    description:
      "We design and build websites, online stores, mobile apps, and custom software for businesses in Myanmar, Thailand, and beyond.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
        <Toaster />
      </body>
    </html>
  );
}
