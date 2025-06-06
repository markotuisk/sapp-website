
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, X, CheckCircle, AlertCircle, User, Building2, IdCard, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
  onClose: () => void;
  onScanResult?: (data: any) => void;
}

interface ScannedData {
  id: string;
  name: string;
  email: string;
  org?: string;
  dept?: string;
  title?: string;
  employeeId: string;
  issued: string;
  expires: string;
  company: string;
  verified: boolean;
  hash: string;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onClose, onScanResult }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const initializeScanner = async () => {
      if (!videoRef.current) return;

      try {
        const scanner = new QrScanner(
          videoRef.current,
          (result) => handleScanResult(result.data),
          {
            highlightScanRegion: true,
            highlightCodeOutline: true,
            preferredCamera: 'environment',
          }
        );

        scannerRef.current = scanner;
        await scanner.start();
        setIsScanning(true);
        setError('');
      } catch (err) {
        console.error('Failed to start scanner:', err);
        setError('Failed to access camera. Please ensure camera permissions are granted.');
        toast({
          title: 'Camera Error',
          description: 'Unable to access camera. Please check permissions.',
          variant: 'destructive',
        });
      }
    };

    initializeScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current.destroy();
      }
    };
  }, []);

  const handleScanResult = (data: string) => {
    try {
      const parsedData: ScannedData = JSON.parse(data);
      
      // Validate the data structure
      if (!parsedData.id || !parsedData.name || !parsedData.employeeId) {
        throw new Error('Invalid QR code format');
      }

      // Check if the ID is from SAPP Security
      if (parsedData.company !== 'SAPP Security') {
        throw new Error('This ID is not from SAPP Security');
      }

      // Check expiration
      const expirationDate = new Date(parsedData.expires);
      const isExpired = expirationDate < new Date();

      if (isExpired) {
        parsedData.verified = false;
      }

      setScannedData(parsedData);
      setIsScanning(false);
      
      if (scannerRef.current) {
        scannerRef.current.stop();
      }

      onScanResult?.(parsedData);

      toast({
        title: isExpired ? 'ID Expired' : 'ID Verified',
        description: `${parsedData.name} - ${isExpired ? 'Please request new ID' : 'Valid team member'}`,
        variant: isExpired ? 'destructive' : 'default',
      });

    } catch (err) {
      console.error('Invalid QR code:', err);
      toast({
        title: 'Invalid QR Code',
        description: 'This QR code is not a valid SAPP Security ID.',
        variant: 'destructive',
      });
    }
  };

  const isExpired = scannedData ? new Date(scannedData.expires) < new Date() : false;
  const isValid = scannedData?.verified && !isExpired;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {!scannedData ? (
          <>
            {/* Scanner View */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Scan Team Member ID</h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                    <video
                      ref={videoRef}
                      className="w-full h-64 object-cover"
                      playsInline
                      muted
                    />
                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border-2 border-white rounded-lg animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Camera className="h-4 w-4" />
                    <span>Position QR code within the frame</span>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Results View */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">ID Verification Result</h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Card className={`mb-4 ${isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      {isValid ? 'Verified Team Member' : isExpired ? 'Expired ID' : 'Invalid ID'}
                    </CardTitle>
                    <Badge variant={isValid ? 'default' : 'destructive'}>
                      {isValid ? 'VALID' : isExpired ? 'EXPIRED' : 'INVALID'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{scannedData.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <IdCard className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{scannedData.employeeId}</span>
                  </div>

                  {scannedData.title && (
                    <div className="text-sm text-gray-600">
                      <strong>Position:</strong> {scannedData.title}
                    </div>
                  )}

                  {scannedData.dept && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{scannedData.dept}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>
                      Expires: {new Date(scannedData.expires).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setScannedData(null);
                    setIsScanning(true);
                    if (scannerRef.current) {
                      scannerRef.current.start();
                    }
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Scan Another
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Done
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
