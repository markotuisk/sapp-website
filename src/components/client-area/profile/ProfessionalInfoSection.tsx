
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Building, Globe } from 'lucide-react';

interface ProfessionalInfoSectionProps {
  profileData: {
    organization: string;
    job_title: string;
    department: string;
    bio: string;
    linkedin_url: string;
  };
  onProfileDataChange: (field: string, value: string) => void;
}

export const ProfessionalInfoSection: React.FC<ProfessionalInfoSectionProps> = ({
  profileData,
  onProfileDataChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Professional Information
        </CardTitle>
        <CardDescription>
          Your work-related details and professional background
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="organization" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Organization
            </Label>
            <Input
              id="organization"
              value={profileData.organization}
              onChange={(e) => onProfileDataChange('organization', e.target.value)}
              placeholder="Enter your organization"
            />
          </div>
          <div>
            <Label htmlFor="job-title">Job Title</Label>
            <Input
              id="job-title"
              value={profileData.job_title}
              onChange={(e) => onProfileDataChange('job_title', e.target.value)}
              placeholder="Enter your job title"
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={profileData.department}
              onChange={(e) => onProfileDataChange('department', e.target.value)}
              placeholder="Enter your department"
            />
          </div>
          <div>
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              value={profileData.linkedin_url}
              onChange={(e) => onProfileDataChange('linkedin_url', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => onProfileDataChange('bio', e.target.value)}
            placeholder="Tell us about your professional background, expertise, and interests..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};
