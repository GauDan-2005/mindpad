import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import Header from "@/components/Header";
import SideBar from "@/components/Sidebar/SideBar";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "MindPad",
  description:
    "A Next.js project for AI integrated collaborative note-taking software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="relative antialiased flex flex-col min-h-screen max-h-screen">
          {/* <Header /> */}
          <div className="flex flex-1">
            <SideBar />
            <main className="flex-1 p-4 bg-gray-100">{children}</main>
          </div>
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
