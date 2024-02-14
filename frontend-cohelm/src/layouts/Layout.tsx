"use client"

import type { Metadata } from "next";
import NavBar from "@/components/Navbar";
import { AppContextProvider } from "@/context/AppContext";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AppContextProvider>
          <NavBar />
          <main className="flex flex-col max-w-7xl mx-auto p-4 pt-6">
            {children}
          </main>
      </AppContextProvider>
  );
}
