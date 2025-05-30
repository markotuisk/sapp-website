
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock } from 'lucide-react';

export const UserActivityLogs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Activity</h2>
        <p className="text-gray-600">Track user actions and system changes</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Activity Monitoring</h3>
          <p className="text-gray-600">
            This feature is coming soon. You'll be able to track user activities and audit trails here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
