import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuickLic - Instant License Verification',
  description: 'Verify South African vehicle licenses instantly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="mt-8 p-4 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} QuickLic. All rights reserved.</p>
            </footer>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}