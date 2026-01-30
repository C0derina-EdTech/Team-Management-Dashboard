import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/sidebar';
import { SiteHeader } from '@/components/site-header';
import { Providers } from '@/provider';
import { useAuthenticate } from '@daveyplate/better-auth-ui';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/account')({
  notFoundComponent: () => {
    return <p>Not found (in _pathlessLayout)</p>
  },
  component: RouteComponent,
})

function RouteComponent() {
  const pathname = useLocation().pathname
  const segments = pathname.split("/");
  const segment = segments[1] || "";
  const name =
    segment.charAt(0).toUpperCase() + segment.slice(1) || "Dashboard";
  useAuthenticate()

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
            <Providers>
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
                <Outlet />
              </div>
            </Providers>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
