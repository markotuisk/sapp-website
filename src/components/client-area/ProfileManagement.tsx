import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Camera, Save, ArrowLeft, Briefcase, Building, Phone, Globe, IdCard, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DigitalIDDialog } from './DigitalIDDialog';

interface ProfileManagementProps {
  onBack: () => void;
}

export const ProfileManagement: React.FC<ProfileManagementProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { userProfile, isLoading: profileLoading, refreshUserData } = useRole();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showIDDialog, setShowIDDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    organization: '',
    job_title: '',
    department: '',
    bio: '',
    linkedin_url: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
  });

  // Update form data when userProfile loads or changes
  useEffect(() => {
    console.log('ProfileManagement: userProfile changed:', userProfile);
    if (userProfile) {
      setProfileData({
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        phone: userProfile.phone || '',
        organization: userProfile.organization || '',
        job_title: userProfile.job_title || '',
        department: userProfile.department || '',
        bio: '',
        linkedin_url: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
      });
    }
  }, [userProfile]);

  const handleProfileUpdate = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      console.log('ProfileManagement: Updating profile with data:', profileData);
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone: profileData.phone,
          organization: profileData.organization,
          job_title: profileData.job_title,
          department: profileData.department,
        })
        .eq('id', user.id);

      if (error) {
        console.error('ProfileManagement: Update error:', error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        console.log('ProfileManagement: Profile updated successfully');
        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        });
        
        // Refresh the user data to ensure all components get updated
        await refreshUserData();
      }
    } catch (error) {
      console.error('ProfileManagement: Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Avatar must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    const first = profileData.first_name || user?.email?.charAt(0) || '';
    const last = profileData.last_name?.charAt(0) || '';
    return (first + last).toUpperCase();
  };

  // Show loading state while profile data is being fetched
  if (profileLoading) {
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

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading Profile...
              </CardTitle>
              <CardDescription>
                Please wait while we load your profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-24 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Digital ID Section */}
        <Card className="border-2 border-sapp-blue/20 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sapp-blue">
              <IdCard className="h-5 w-5" />
              Digital Security ID
            </CardTitle>
            <CardDescription>
              Professional digital identification for team verification and site access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sapp-dark">Ready to present your credentials?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Show your professional ID to team members for quick verification
                </p>
              </div>
              <Button
                onClick={() => setShowIDDialog(true)}
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white px-6"
              >
                <IdCard className="h-4 w-4 mr-2" />
                Show Digital ID
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Your personal and professional details. This information is confidential and will be removed if you delete your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userProfile?.avatar_url} />
                  <AvatarFallback className="text-xl">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="sr-only"
                  />
                </label>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-lg">{profileData.first_name} {profileData.last_name}</p>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500">Click camera to change your profile photo</p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="first-name">First Name *</Label>
                <Input
                  id="first-name"
                  value={profileData.first_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="last-name">Last Name *</Label>
                <Input
                  id="last-name"
                  value={profileData.last_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information Card */}
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
                  onChange={(e) => setProfileData(prev => ({ ...prev, organization: e.target.value }))}
                  placeholder="Enter your organization"
                />
              </div>
              <div>
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  value={profileData.job_title}
                  onChange={(e) => setProfileData(prev => ({ ...prev, job_title: e.target.value }))}
                  placeholder="Enter your job title"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={profileData.department}
                  onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
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
                  onChange={(e) => setProfileData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about your professional background, expertise, and interests..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact Card */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
            <CardDescription>
              Emergency contact information for security purposes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergency-name">Contact Name</Label>
                <Input
                  id="emergency-name"
                  value={profileData.emergency_contact_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, emergency_contact_name: e.target.value }))}
                  placeholder="Emergency contact name"
                />
              </div>
              <div>
                <Label htmlFor="emergency-phone">Contact Phone</Label>
                <Input
                  id="emergency-phone"
                  value={profileData.emergency_contact_phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, emergency_contact_phone: e.target.value }))}
                  placeholder="Emergency contact phone"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleProfileUpdate}
            disabled={isLoading || profileLoading}
            className="px-8"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Digital ID Dialog */}
      <DigitalIDDialog 
        open={showIDDialog} 
        onOpenChange={setShowIDDialog} 
      />
    </div>
  );
};
