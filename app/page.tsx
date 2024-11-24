import { LicenseScanner } from '@/components/license-scanner';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-start p-4 sm:p-8 md:p-24">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">QuickLic</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Instant South African vehicle license disc verification
        </p>
      </div>
      <div className="w-full max-w-md">
        <LicenseScanner />
      </div>
    </div>
  );
}