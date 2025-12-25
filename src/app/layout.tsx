import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lebanon Gender Initiative",
  description: "A safe space for women and children in South Lebanon - Submit grievances, access support resources, and connect with help.",
  keywords: ["Lebanon", "women", "safety", "grievance", "support", "South Lebanon"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
