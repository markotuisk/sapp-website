
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Send } from 'lucide-react';

export const UserInvitations: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Invitations</h2>
          <p className="text-gray-600">Send invitations and track their status</p>
        </div>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Send Invitation
        </Button>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">User Invitations</h3>
          <p className="text-gray-600">
            This feature is coming soon. You'll be able to invite users and track invitation status here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
