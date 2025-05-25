"use client"
import { SidebarProvider } from "@/contexts/SidebarContext";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return <SidebarProvider>{children}</SidebarProvider>;
} 