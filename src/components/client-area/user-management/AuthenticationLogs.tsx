
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';

export const AuthenticationLogs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Authentication Logs</h2>
        <p className="text-gray-600">Monitor login attempts and security events</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Authentication Monitoring</h3>
          <p className="text-gray-600">
            This feature is coming soon. You'll be able to monitor login attempts and failed authentication here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
