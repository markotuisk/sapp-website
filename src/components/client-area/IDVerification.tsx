
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import { DigitalIDCard } from './DigitalIDCard';

export const IDVerification: React.FC = () => {
  const [showDigitalID, setShowDigitalID] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Identity Verification</h1>
      </div>

      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Your identity has been verified and your digital ID is active.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verification Status
            </CardTitle>
            <CardDescription>
              Current identity verification status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Identity Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Active Status</span>
            </div>
            
            <Button 
              onClick={() => setShowDigitalID(!showDigitalID)}
              className="w-full"
            >
              {showDigitalID ? 'Hide' : 'Show'} Digital ID Card
            </Button>
          </CardContent>
        </Card>

        {showDigitalID && (
          <DigitalIDCard />
        )}
      </div>
    </div>
  );
};
