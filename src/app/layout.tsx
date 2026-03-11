import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/hoc/main-layout";

export const metadata: Metadata = {
  title: "Space Booking",
  description: "Space Booking System",
  icons: {
    icon: "/assets/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NextTopLoader />
        <Toaster />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
