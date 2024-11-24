"use client";

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw } from 'lucide-react';
import { createWorker } from 'tesseract.js';

interface ScannerProps {
  onScan: (data: string) => void;
  isLoading: boolean;
  error?: string;
}

export function Scanner({ onScan, isLoading, error }: ScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setHasPermission(true);
      }
    } catch (err) {
      setHasPermission(false);
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsCameraActive(false);
  };

  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    try {
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(canvas);
      await worker.terminate();
      
      if (text) {
        onScan(text);
      }
    } catch (err) {
      console.error('OCR error:', err);
    }
  };

  useEffect(() => {
    return () => {
      if (isCameraActive) {
        stopCamera();
      }
    };
  }, [isCameraActive]);

  return (
    <div className="space-y-4">
      <Card className="relative aspect-video overflow-hidden bg-muted">
        {isCameraActive ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>
        )}
      </Card>

      <div className="flex justify-center gap-4">
        <Button
          size="lg"
          variant="outline"
          onClick={isCameraActive ? stopCamera : startCamera}
          className="flex-1"
        >
          {isCameraActive ? 'Stop Camera' : 'Start Camera'}
        </Button>
        {isCameraActive && (
          <Button
            size="lg"
            onClick={captureFrame}
            className="flex-1"
          >
            Scan Now
          </Button>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}
    </div>
  );
}