
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building, Shield, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: any;
  onUserUpdated?: () => void;
}

export const UserEditDialog: React.FC<UserEditDialogProps> = ({
  open,
  onOpenChange,
  user,
  onUserUpdated
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Edit User: {user?.email}
          </DialogTitle>
          <DialogDescription>
            Manage user information, roles, and organization assignments
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            User editing functionality is currently under maintenance. Please contact support for user management requests.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Info
            </TabsTrigger>
            <TabsTrigger value="organization" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Organization
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Roles
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ''} disabled />
              </div>
              <div className="text-sm text-gray-500">
                User information editing is currently disabled.
              </div>
            </div>
          </TabsContent>

          <TabsContent value="organization" className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              Organization management features are under maintenance.
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              Role management features are under maintenance.
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              Activity logs are under maintenance.
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
