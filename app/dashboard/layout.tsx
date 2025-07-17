
import * as React from "react";
import Link from "next/link";
import '../../styles/globals.css';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "../../components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Bot,
  Gamepad2,
  LayoutGrid,
  LogOut,
  Server,
  ServerCog,
  Users,
} from "lucide-react";
import { DashboardHeader } from "../../components/dashboard-header";
import { notFound } from "next/navigation";
import { Button } from "../../components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Gamepad2 className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-semibold font-headline text-sidebar-foreground">JexactylMC</h1>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="font-medium"
              >
                <Link href="/dashboard">
                  <LayoutGrid />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="font-medium"
              >
                <Link href="/dashboard/panel">
                  <Server />
                  Control Panel
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="font-medium"
              >
                <Link href="/dashboard/assistant">
                  <Bot />
                  AI Game Assistant
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
