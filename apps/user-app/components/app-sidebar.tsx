"use client";

import * as React from "react";
import {
  IconDashboard,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@coderina-ams/ui/components/sidebar";
import { Logo } from "@coderina-ams/ui/components/logo";
import { Calendar, PlugIcon } from "lucide-react";
import { UserButton } from "@daveyplate/better-auth-ui";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: PlugIcon,
    }
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 flex items-center gap-2"
            >
              <Logo href="/dashboard" />

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserButton
          size='default'
          // className="border-destructive w-64 bg-destructive/30"
          classNames={{
            content: {
              avatar: {
                fallback: "bg-destructive text-white",
                // fallbackIcon: "IconUserCircle",
              },
            }
          }}
        />      </SidebarFooter>
    </Sidebar>
  );
}
