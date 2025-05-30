
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Organization = Tables<'organizations'>;

interface OrganizationAssignmentCardProps {
  selectedOrganization: string;
  onOrganizationChange: (value: string) => void;
  organizations: Organization[];
}

export const OrganizationAssignmentCard: React.FC<OrganizationAssignmentCardProps> = ({
  selectedOrganization,
  onOrganizationChange,
  organizations,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Organisation Assignment</CardTitle>
        <CardDescription>
          <strong>Required:</strong> All users must be assigned to an organisation for security and access control
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="organization">Select Organisation *</Label>
            <Select value={selectedOrganization} onValueChange={onOrganizationChange}>
              <SelectTrigger className={!selectedOrganization ? 'border-red-300' : ''}>
                <SelectValue placeholder="Organisation is required" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map(org => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {organizations.length === 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No organisations available. Create an organisation first in the Organisations tab.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
