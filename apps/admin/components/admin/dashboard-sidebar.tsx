"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Settings, LogOut, GalleryVerticalEnd ,GoalIcon} from "lucide-react";
import { authClient } from "@/lib/auth-client";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@coderina-ams/ui/components/sidebar";
import { UserButton } from "@daveyplate/better-auth-ui";
import { Logo } from "@coderina-ams/ui/components/logo";

const sidebarNavItems = [
  {
    href: "/admin/users",
    icon: Users,
    label: "Users",
  },
  {
    href: "/admin/sources",
    icon: GalleryVerticalEnd,
    label: "Opportunity Sources",
  },
  {
    href: "/admin/opportunity",
    icon: GoalIcon,
    label: "Opportunities",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();


  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo href="/admin" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="text-muted-foreground"
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/account/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className="cursor-pointer"
            >
              <button onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
        <UserButton
          size='default'
          // className="border-destructive w-64 bg-destructive/30"
          classNames={{
            content: {
              avatar: {
                fallback: "bg-destructive text-white",
                fallbackIcon: "IconUserCircle",
              },
            }
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
