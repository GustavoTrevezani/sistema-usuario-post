import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web app CRUD",
  description: "Created with next.js, prisma, and postgresql",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
