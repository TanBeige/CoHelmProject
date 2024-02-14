import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/layouts/Layout";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoHelm Project",
  description: "Built by Tan Arin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} relative min-h-screen`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
