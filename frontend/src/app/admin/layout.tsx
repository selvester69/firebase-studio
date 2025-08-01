
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListChecks, Route, Settings, Home, Package, LayoutDashboard, ShoppingBag } from "lucide-react"; // Added ShoppingBag
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { Navbar } from "@/components/layout/navbar";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Order Management", icon: ListChecks },
  { href: "/admin/fleet", label: "Fleet Overview", icon: Route },
  { href: "/admin/inventory", label: "Inventory", icon: ShoppingBag }, // Added Inventory
  // { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <SidebarProvider defaultOpen>
          <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader className="p-4 justify-between items-center hidden md:flex">
              <span className="font-semibold text-lg font-headline">Admin Panel</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuButton
                        isActive={pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))}
                        tooltip={{ children: item.label, side: "right" }}
                        className="justify-start"
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2">
               <Link href="/">
                <SidebarMenuButton className="justify-start">
                  <Home className="h-5 w-5 mr-2" />
                  <span>Public Site</span>
                </SidebarMenuButton>
              </Link>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex-1 overflow-auto bg-muted/30"> {/* Added a subtle bg color to content area */}
            <div className="p-4 md:p-6 lg:p-8"> {/* Adjusted padding */}
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
       <footer className="py-6 md:px-8 md:py-0 bg-background border-t md:hidden">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} TrackMaster Admin
          </p>
        </div>
      </footer>
    </div>
  );
}
