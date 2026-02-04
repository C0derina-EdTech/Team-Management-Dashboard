"use client";
import { SidebarInset, SidebarProvider } from "@coderina-ams/ui/components/sidebar";
import { SiteHeader } from "@coderina-ams/ui/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Providers } from "@/components/providers";
import { notFound, usePathname } from "next/navigation";
import { useAuthenticate } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth-client";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const segment = segments[1] || "";
  const name =
    segment.charAt(0).toUpperCase() + segment.slice(1) || "Dashboard";
  useAuthenticate()

  const { data } = authClient.useSession();
  console.log({ data })

  if (!data || data.user?.role !== "admin") {
    return notFound();
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader name={name} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Providers>{children}</Providers>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
