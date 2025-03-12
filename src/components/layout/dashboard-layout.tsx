"use client";

import { ReactNode, useState } from "react";
import { Header } from "./header";
import SidebarNavigation from "./sidebar-navigation";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: string;
}

export function DashboardLayout({
  children,
  userRole = "farmer",
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(userRole);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    // Redirect to social feed when role changes
    router.push("/social");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <SidebarNavigation className="hidden md:block" userRole={role} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          onMenuToggle={toggleMobileMenu}
          onRoleChange={handleRoleChange}
          user={{
            name: "John Farmer",
            email: "john@agrohub.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
            role: role,
          }}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="container mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
