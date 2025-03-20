"use client";

import Header from "@/components/Header";
import { AppSidebar } from "@/components/Sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {} = useTheme();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-1 flex-col gap-4 overflow-y-auto md:bg-custom-gradient-light">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

// bg-gradient-to-br from-teal-100 to-purple-300
