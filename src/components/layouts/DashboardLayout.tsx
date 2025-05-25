"use client"
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen, toggle } = useSidebar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex overflow-hidden">
      <div className="fixed top-0 left-0 h-screen z-50 overflow-hidden">
        <Sidebar onToggle={toggle} isOpen={isOpen} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-6 overflow-auto bg-gradient-to-br from-gray-900 to-black ${isOpen ? 'ml-72' : 'ml-16'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 