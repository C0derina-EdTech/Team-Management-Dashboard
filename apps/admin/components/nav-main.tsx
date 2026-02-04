import {
  IconCirclePlusFilled,
  IconRobotFace,
  type Icon,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@coderina-ams/ui/components/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@coderina-ams/ui/components/sidebar";
import { Book, File, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon | LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();

  // js function to get current path name  
  // const getCurrentPathName = () => {
  //   return window.location.pathname;
  // };

  // const pathname = getCurrentPathName();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear cursor-pointer"
                >
                  <IconCirclePlusFilled />
                  <span>Quick Create</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup >
                  <Link className="cursor-pointer" href="/">
                    <DropdownMenuItem>
                      <File />
                      Credentials
                    </DropdownMenuItem>
                  </Link>
                  <Link className="cursor-pointer" href="/">
                    <DropdownMenuItem>
                      <IconRobotFace />
                      Copilot
                    </DropdownMenuItem>
                  </Link>
                  <Link className="cursor-pointer" href="/">
                    <DropdownMenuItem>
                      <Book />
                      Application
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <Link className="cursor-pointer" key={item.title} href={item.url}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === item.url}
                  className="text-muted-foreground cursor-pointer" tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
