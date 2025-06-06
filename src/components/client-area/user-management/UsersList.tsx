
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Search, Mail, Building2, Calendar, Shield, AlertCircle, AlertTriangle, Users } from 'lucide-react';
import { useUserManagement } from '@/hooks/useUserManagement';
import { useOrganizationData } from '@/hooks/useOrganizationData';
import { UserEditDialog } from './UserEditDialog';
import { OrganizationStatusCard } from './OrganizationStatusCard';
import type { UserWithProfile } from '@/types/roles';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const UsersList: React.FC = () => {
  const { users, isLoading, refetchData } = useUserManagement();
  const { getOrganizationName } = useOrganizationData();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const organizationName = getOrganizationName(user.clientData?.organization_id);
    
    const matchesSearch = !searchTerm || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.profile?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.profile?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      organizationName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.roles.includes(roleFilter as any);
    
    return matchesSearch && matchesRole;
  });

  // Organization analysis using the new centralized logic
  const usersWithoutOrg = filteredUsers.filter(user => 
    !user.clientData?.organization_id
  );
  
  const guestUsers = filteredUsers.filter(user => 
    user.clientData?.organization_id === '00000000-0000-0000-0000-000000000001'
  );

  const getInitials = (user: UserWithProfile) => {
    const first = user.profile?.first_name?.charAt(0) || '';
    const last = user.profile?.last_name?.charAt(0) || '';
    return (first + last).toUpperCase() || user.email.charAt(0).toUpperCase();
  };

  const getDisplayName = (user: UserWithProfile) => {
    if (user.profile?.first_name && user.profile?.last_name) {
      return `${user.profile.first_name} ${user.profile.last_name}`;
    }
    return user.email;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'support': return 'bg-green-100 text-green-800';
      case 'client': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrganizationStatus = (user: UserWithProfile) => {
    const orgId = user.clientData?.organization_id;
    
    if (!orgId) {
      return { status: 'none', message: 'No organisation assigned' };
    }
    
    if (orgId === '00000000-0000-0000-0000-000000000001') {
      return { status: 'guest', message: 'Guest organisation' };
    }
    
    return { status: 'assigned', message: 'Organisation assigned' };
  };

  const handleManageUser = (user: UserWithProfile) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    refetchData();
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Organization Status Card */}
      <OrganizationStatusCard />

      {/* Header and Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Users ({filteredUsers.length})</h2>
          <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
        </div>
        <Button onClick={handleAddUser}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Security Warnings */}
      {guestUsers.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50">
          <Users className="h-4 w-4" />
          <AlertDescription>
            <strong>Guest Users:</strong> {guestUsers.length} user(s) are assigned to the guest organisation with limited access. 
            These users should be moved to proper organisations for full system access.
          </AlertDescription>
        </Alert>
      )}

      {usersWithoutOrg.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Alert:</strong> {usersWithoutOrg.length} user(s) have no organisation assigned and cannot access secure areas. 
            These users should be assigned to organisations immediately for proper access control.
          </AlertDescription>
        </Alert>
      )}

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users by name, email, or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="client">Client</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Grid */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => {
          const orgStatus = getOrganizationStatus(user);
          const isGuest = user.clientData?.organization_id === '00000000-0000-0000-0000-000000000001';
          const organizationName = getOrganizationName(user.clientData?.organization_id);
          
          let cardClassName = 'hover:shadow-md transition-shadow';
          if (orgStatus.status === 'none') {
            cardClassName += ' border-red-300 bg-red-50';
          } else if (isGuest) {
            cardClassName += ' border-amber-300 bg-amber-50';
          }
          
          return (
            <Card key={user.id} className={cardClassName}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.profile?.avatar_url} />
                      <AvatarFallback className="bg-sapp-blue text-white">
                        {getInitials(user)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{getDisplayName(user)}</h3>
                        
                        {/* Status badges */}
                        {orgStatus.status === 'none' && (
                          <Badge variant="destructive" className="text-xs">
                            No Organisation
                          </Badge>
                        )}
                        {isGuest && (
                          <Badge variant="outline" className="text-xs border-amber-400 text-amber-700">
                            Guest User
                          </Badge>
                        )}
                        
                        {/* Role badges */}
                        {user.roles.length > 0 ? (
                          user.roles.map(role => (
                            <Badge key={role} className={getRoleColor(role)}>
                              {role}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline">No roles</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        {organizationName && organizationName !== 'No organization' && (
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {organizationName}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(user.profile?.created_at || '').toLocaleDateString()}
                        </div>
                      </div>
                      
                      {/* Status messages */}
                      {orgStatus.status === 'none' && (
                        <div className="text-xs text-red-600 font-medium">
                          ⚠️ Cannot access secure areas - organisation assignment required
                        </div>
                      )}
                      
                      {isGuest && (
                        <div className="text-xs text-amber-600 font-medium">
                          👤 Guest user with limited access - needs proper organisation assignment
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManageUser(user)}
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty states */}
      {filteredUsers.length === 0 && users.length > 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}

      {filteredUsers.length === 0 && users.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-gray-600">
              No users are available. This might indicate a database access issue.
            </p>
          </CardContent>
        </Card>
      )}

      <UserEditDialog
        user={selectedUser}
        isOpen={isEditDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
};
