"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Scanner } from '@/components/scanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { FileText, Camera } from 'lucide-react';

export function LicenseScanner() {
  const router = useRouter();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const addScanResult = useStore((state) => state.addScanResult);

  const handleScan = async (data: string) => {
    try {
      setIsScanning(true);
      const response = await fetch('/api/verify/license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanData: data }),
      });

      if (!response.ok) throw new Error('Verification failed');

      const result = await response.json();
      addScanResult(result);
      
      toast({
        title: 'License Verified',
        description: `Vehicle: ${result.licenseData.make} ${result.licenseData.model}`,
      });

      router.push(`/results/${result.id}`);
    } catch (error) {
      toast({
        title: 'Verification Failed',
        description: 'Please try scanning again',
        variant: 'destructive',
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan License Disc</CardTitle>
        <CardDescription>
          Position the vehicle license disc within the frame
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Scanner
          onScan={handleScan}
          isLoading={isScanning}
        />

        <div className="grid gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Center the license disc within the frame
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Ensure good lighting for best results
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push('/history')}
          >
            View History
          </Button>
          <Button
            className="flex-1"
            onClick={() => router.push('/manual-entry')}
          >
            Manual Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}