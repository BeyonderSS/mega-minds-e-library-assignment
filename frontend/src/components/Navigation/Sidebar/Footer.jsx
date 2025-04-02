"use client";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React, { useState } from "react";

function Footer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await toast.promise(logout(), {
        loading: "Logging out...",
        success: "Logged out successfully. Redirecting to auth",
        error: "Logout failed. Please try again.",
      });

      router.refresh(); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="flex items-center gap-2 w-full p-2 cursor-pointer"
              disabled={isLoading}
            >
              <LogOut className="w-5 h-5" />
              <span>{isLoading ? "Logging out..." : "Logout"}</span>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default Footer;
