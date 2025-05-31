import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DigitalIDDialog } from './DigitalIDDialog';
import { ProfileHeader } from './profile/ProfileHeader';
import { DigitalIDSection } from './profile/DigitalIDSection';
import { PersonalInfoSection } from './profile/PersonalInfoSection';
import { ProfessionalInfoSection } from './profile/ProfessionalInfoSection';
import { EmergencyContactSection } from './profile/EmergencyContactSection';
import { ProfileActions } from './profile/ProfileActions';
import { ProfileLoadingState } from './profile/ProfileLoadingState';

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
    phone_country_code: '+44',
    phone_local_number: '',
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
        phone_country_code: userProfile.phone_country_code || '+44',
        phone_local_number: userProfile.phone_local_number || '',
        job_title: userProfile.job_title || '',
        department: userProfile.department || '',
        bio: '',
        linkedin_url: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
      });
    }
  }, [userProfile]);

  const handleProfileDataChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

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
          phone_country_code: profileData.phone_country_code,
          phone_local_number: profileData.phone_local_number,
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
    return <ProfileLoadingState onBack={onBack} />;
  }

  return (
    <div className="space-y-6">
      <ProfileHeader onBack={onBack} />

      <div className="max-w-4xl mx-auto space-y-6">
        <DigitalIDSection onShowDigitalID={() => setShowIDDialog(true)} />

        <PersonalInfoSection
          profileData={profileData}
          onProfileDataChange={handleProfileDataChange}
          onAvatarUpload={handleAvatarUpload}
          getInitials={getInitials}
        />

        <ProfessionalInfoSection
          profileData={profileData}
          onProfileDataChange={handleProfileDataChange}
        />

        <EmergencyContactSection
          profileData={profileData}
          onProfileDataChange={handleProfileDataChange}
        />

        <ProfileActions
          onSave={handleProfileUpdate}
          isLoading={isLoading}
          isProfileLoading={profileLoading}
        />
      </div>

      <DigitalIDDialog 
        open={showIDDialog} 
        onOpenChange={setShowIDDialog} 
      />
    </div>
  );
};
