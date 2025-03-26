"use client";

import Header from "@/components/Header";
import { AppSidebar } from "@/components/Sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main
          className={`flex flex-1 flex-col gap-4 overflow-y-auto transition-all duration-300 ${
            currentTheme === "dark"
              ? "md:bg-custom-gradient-dark"
              : "md:bg-custom-gradient-light"
          }`}
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

// bg-gradient-to-br from-teal-100 to-purple-300
