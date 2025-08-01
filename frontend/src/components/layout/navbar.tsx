
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, PackageSearch, X, ListChecks, Route, ClipboardList } from 'lucide-react'; // Added ClipboardList
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons';

const navItems = [
  { href: '/', label: 'Track Order', icon: PackageSearch },
  { href: '/my-orders', label: 'My Orders', icon: ClipboardList }, // Added My Orders
  { href: '/admin', label: 'Admin Dashboard', icon: ListChecks }, // Changed /admin/orders to /admin
  { href: '/admin/fleet', label: 'Fleet View', icon: Route },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">TrackMaster</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4 md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <Link
                href="/"
                className="mb-6 flex items-center space-x-2 pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">TrackMaster</span>
              </Link>
              <div className="flex flex-col space-y-3 pl-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-foreground/70 transition-colors hover:text-foreground",
                      pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) && "text-foreground font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

    