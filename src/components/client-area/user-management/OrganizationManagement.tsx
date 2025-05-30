
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Building2, Users, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { useUserManagement } from '@/hooks/useUserManagement';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface OrganizationWithCounts {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  website?: string;
  phone?: string;
  logo_url?: string;
  subscription_tier?: string;
  status?: string;
  created_at: string;
  updated_at: string;
  user_count: number;
  guest_users: number;
  regular_users: number;
}

export const OrganizationManagement: React.FC = () => {
  const { organizations, isLoading } = useUserManagement();
  const [organizationsWithCounts, setOrganizationsWithCounts] = useState<OrganizationWithCounts[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newOrgForm, setNewOrgForm] = useState({
    name: '',
    description: '',
    industry: '',
    website: '',
    phone: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (organizations.length > 0) {
      fetchOrganizationCounts();
    }
  }, [organizations]);

  const fetchOrganizationCounts = async () => {
    try {
      console.log('Fetching organization user counts...');
      
      // Get user counts for each organization
      const orgsWithCounts = await Promise.all(
        organizations.map(async (org) => {
          // Count users in profiles table
          const { data: profileUsers, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('organization_id', org.id);

          // Count users in client_data table
          const { data: clientUsers, error: clientError } = await supabase
            .from('client_data')
            .select('user_id')
            .eq('organization_id', org.id);

          if (profileError) console.error('Error fetching profile users:', profileError);
          if (clientError) console.error('Error fetching client users:', clientError);

          // Combine and deduplicate user IDs
          const allUserIds = new Set([
            ...(profileUsers || []).map(u => u.id),
            ...(clientUsers || []).map(u => u.user_id)
          ]);

          const totalUsers = allUserIds.size;
          const guestUsers = org.id === '00000000-0000-0000-0000-000000000001' ? totalUsers : 0;
          const regularUsers = totalUsers - guestUsers;

          console.log(`Organization ${org.name}: ${totalUsers} total users (${guestUsers} guests, ${regularUsers} regular)`);

          return {
            ...org,
            user_count: totalUsers,
            guest_users: guestUsers,
            regular_users: regularUsers
          };
        })
      );

      setOrganizationsWithCounts(orgsWithCounts);
    } catch (error) {
      console.error('Error fetching organization counts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load organization user counts',
        variant: 'destructive',
      });
    }
  };

  const handleCreateOrganization = async () => {
    if (!newOrgForm.name.trim()) {
      toast({
        title: 'Error',
        description: 'Organization name is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      console.log('Creating organization:', newOrgForm);
      
      const { data, error } = await supabase
        .from('organizations')
        .insert({
          name: newOrgForm.name,
          description: newOrgForm.description || null,
          industry: newOrgForm.industry || null,
          website: newOrgForm.website || null,
          phone: newOrgForm.phone || null,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      console.log('Created organization:', data);
      
      toast({
        title: 'Success',
        description: 'Organization created successfully',
      });

      setNewOrgForm({
        name: '',
        description: '',
        industry: '',
        website: '',
        phone: ''
      });
      setIsCreateDialogOpen(false);
      
      // Refresh the organizations list
      window.location.reload();
    } catch (error) {
      console.error('Error creating organization:', error);
      toast({
        title: 'Error',
        description: 'Failed to create organization',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Organizations ({organizationsWithCounts.length})</h2>
          <p className="text-gray-600">Manage organizations and view user assignments</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Organization
        </Button>
      </div>

      {/* Organizations Grid */}
      <div className="grid gap-6">
        {organizationsWithCounts.map((org) => (
          <Card key={org.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{org.name}</CardTitle>
                    {org.description && (
                      <CardDescription className="mt-1">{org.description}</CardDescription>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(org.status)}>
                    {org.status || 'active'}
                  </Badge>
                  <Badge className={getTierColor(org.subscription_tier)}>
                    {org.subscription_tier || 'basic'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Users */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Total Users</p>
                    <p className="text-lg font-bold text-blue-700">{org.user_count}</p>
                  </div>
                </div>

                {/* Regular Users */}
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Regular Users</p>
                    <p className="text-lg font-bold text-green-700">{org.regular_users}</p>
                  </div>
                </div>

                {/* Guest Users */}
                {org.guest_users > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">Guest Users</p>
                      <p className="text-lg font-bold text-amber-700">{org.guest_users}</p>
                    </div>
                  </div>
                )}

                {/* Organization Details */}
                <div className="space-y-2">
                  {org.industry && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Industry:</span> {org.industry}
                    </p>
                  )}
                  {org.website && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Website:</span> 
                      <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                        {org.website}
                      </a>
                    </p>
                  )}
                  {org.phone && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {org.phone}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Created: {new Date(org.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Guest Organization Warning */}
              {org.id === '00000000-0000-0000-0000-000000000001' && (
                <Alert className="mt-4 border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Guest Organization:</strong> This is the default organization for users without proper assignments. 
                    Users in this organization have limited access and should be moved to appropriate organizations.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {organizationsWithCounts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No organizations found</h3>
            <p className="text-gray-600 mb-4">
              Create your first organization to start managing users and access control.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Organization
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Organization Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Organization</DialogTitle>
            <DialogDescription>
              Add a new organization to manage users and access control
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Organization Name *</Label>
              <Input
                id="name"
                value={newOrgForm.name}
                onChange={(e) => setNewOrgForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter organization name"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newOrgForm.description}
                onChange={(e) => setNewOrgForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the organization"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={newOrgForm.industry}
                  onChange={(e) => setNewOrgForm(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="e.g., Technology, Healthcare"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newOrgForm.phone}
                  onChange={(e) => setNewOrgForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={newOrgForm.website}
                onChange={(e) => setNewOrgForm(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsCreateDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleCreateOrganization}>
              Create Organization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
