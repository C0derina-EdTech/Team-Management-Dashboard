import {
  SidebarMenu,
  SidebarMenuItem,
} from "@coderina-ams/ui/components/sidebar";
import { UserButton } from "@daveyplate/better-auth-ui";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>

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
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
