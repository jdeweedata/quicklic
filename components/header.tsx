"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Shield } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="w-6 h-6" />
          <span className="font-semibold">License Scanner</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={pathname === '/' ? 'text-primary' : 'text-muted-foreground'}
          >
            Home
          </Link>
          <Link
            href="/history"
            className={pathname === '/history' ? 'text-primary' : 'text-muted-foreground'}
          >
            History
          </Link>
          <Link
            href="/profile"
            className={pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'}
          >
            Profile
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}