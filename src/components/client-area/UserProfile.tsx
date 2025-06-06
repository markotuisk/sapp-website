
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Camera, Save, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { useOrganizationTypes } from '@/hooks/useOrganizationTypes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  onBack: () => void;
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { userProfile, refreshUserData } = useRole();
  const { organizationTypes, isLoading: orgTypesLoading } = useOrganizationTypes();
  const { toast } = useToast();
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    organization: '',
    organization_type: '',
    department: '',
    job_title: '',
  });

  // Pre-populate form with existing data
  useEffect(() => {
    if (userProfile) {
      // Handle organization name extraction
      const organizationName = userProfile.organization && typeof userProfile.organization === 'object'
        ? userProfile.organization.name
        : '';
        
      setProfileData({
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        phone: userProfile.phone || '',
        organization: organizationName,
        organization_type: userProfile.organization_type || '',
        department: userProfile.department || '',
        job_title: userProfile.job_title || '',
      });
    }
  }, [userProfile]);

  const handleProfileUpdate = async () => {
    if (!user) return;

    setSaveState('saving');
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);

      if (error) {
        setSaveState('error');
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setSaveState('saved');
        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        });
        
        // Refresh the user data to ensure all components get updated
        await refreshUserData();
        
        // Reset to idle after 2 seconds
        setTimeout(() => setSaveState('idle'), 2000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveState('error');
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Avatar must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        toast({
          title: 'Upload Error',
          description: uploadError.message,
          variant: 'destructive',
        });
        return;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id);

      if (updateError) {
        toast({
          title: 'Error',
          description: updateError.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Avatar updated successfully',
        });
        // Refresh user data to update all components
        await refreshUserData();
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload avatar',
        variant: 'destructive',
      });
    }
  };

  const getInitials = () => {
    const first = profileData.first_name || user?.email?.charAt(0) || '';
    const last = profileData.last_name?.charAt(0) || '';
    return (first + last).toUpperCase();
  };

  const getSaveButtonContent = () => {
    switch (saveState) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return (
          <>
            <Check className="h-4 w-4 mr-2" />
            Saved!
          </>
        );
      case 'error':
        return 'Try Again';
      default:
        return (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </>
        );
    }
  };

  const getSaveButtonVariant = () => {
    switch (saveState) {
      case 'saved':
        return 'default' as const;
      case 'error':
        return 'destructive' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Profile
          </CardTitle>
          <CardDescription>
            Manage your personal information and professional details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userProfile?.avatar_url} />
                <AvatarFallback className="text-lg">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                <Camera className="h-3 w-3" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="sr-only"
                />
              </label>
            </div>
            <div>
              <p className="font-medium">{user?.email}</p>
              <p className="text-sm text-gray-500">Click camera to change avatar</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Personal Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  value={profileData.first_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  value={profileData.last_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Professional Information</h4>
            
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                value={profileData.organization}
                onChange={(e) => setProfileData(prev => ({ ...prev, organization: e.target.value }))}
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <Label htmlFor="organization-type">Organization Type</Label>
              <Select
                value={profileData.organization_type}
                onValueChange={(value) => setProfileData(prev => ({ ...prev, organization_type: value }))}
                disabled={orgTypesLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={orgTypesLoading ? "Loading..." : "Select organization type"} />
                </SelectTrigger>
                <SelectContent>
                  {organizationTypes.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={profileData.department}
                  onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="e.g., IT, Security, Finance"
                />
              </div>
              <div>
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  value={profileData.job_title}
                  onChange={(e) => setProfileData(prev => ({ ...prev, job_title: e.target.value }))}
                  placeholder="e.g., Security Manager, CISO"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleProfileUpdate}
            disabled={saveState === 'saving'}
            variant={getSaveButtonVariant()}
            className={`w-full ${saveState === 'saved' ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            {getSaveButtonContent()}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
