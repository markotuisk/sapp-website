
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Users, Plus, ExternalLink } from 'lucide-react';
import { useDocumentPermissions } from '@/hooks/useDocumentPermissions';
import type { ClientDocument } from '@/types/profile';

interface DocumentSharingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: ClientDocument | null;
}

export const DocumentSharingDialog: React.FC<DocumentSharingDialogProps> = ({
  isOpen,
  onClose,
  document,
}) => {
  const { permissions, availableUsers, isLoading, grantPermission, revokePermission } = 
    useDocumentPermissions(document?.id);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [permissionType, setPermissionType] = useState<'view' | 'download'>('view');

  const handleGrantPermission = async () => {
    if (!selectedUserId) return;
    
    const success = await grantPermission(selectedUserId, permissionType);
    if (success) {
      setSelectedUserId('');
      setPermissionType('view');
    }
  };

  const getDisplayName = (user: any) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.email;
  };

  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Share Document
          </DialogTitle>
          <DialogDescription>
            Manage access permissions for "{document.custom_name || document.original_name}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Document Type Badge */}
          <div className="flex items-center gap-2">
            {document.document_type === 'link' && (
              <Badge variant="outline" className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Link Document
              </Badge>
            )}
            {document.is_confidential && (
              <Badge variant="destructive">Confidential</Badge>
            )}
          </div>

          {/* Add Permission */}
          <div className="space-y-3 p-4 border rounded-lg">
            <h4 className="font-medium">Grant Access</h4>
            <div className="space-y-2">
              <div>
                <Label htmlFor="user-select">User</Label>
                <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers
                      .filter(user => !permissions.some(p => p.user_id === user.id))
                      .map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {getDisplayName(user)}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="permission-type">Permission Type</Label>
                <Select value={permissionType} onValueChange={(value: 'view' | 'download') => setPermissionType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">View Only</SelectItem>
                    <SelectItem value="download">View & Download</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleGrantPermission} 
                disabled={!selectedUserId}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Grant Permission
              </Button>
            </div>
          </div>

          {/* Current Permissions */}
          <div className="space-y-3">
            <h4 className="font-medium">Current Access ({permissions.length})</h4>
            {isLoading ? (
              <p className="text-sm text-gray-500">Loading permissions...</p>
            ) : permissions.length === 0 ? (
              <p className="text-sm text-gray-500">No shared access</p>
            ) : (
              <div className="space-y-2">
                {permissions.map(permission => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {getDisplayName(permission.user)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {permission.permission_type === 'view' ? 'View Only' : 'View & Download'}
                      </p>
                    </div>
                    <Button
                      onClick={() => revokePermission(permission.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
