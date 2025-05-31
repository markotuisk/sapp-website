
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Camera, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';

interface PersonalInfoSectionProps {
  profileData: {
    first_name: string;
    last_name: string;
    phone: string;
  };
  onProfileDataChange: (field: string, value: string) => void;
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getInitials: () => string;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  profileData,
  onProfileDataChange,
  onAvatarUpload,
  getInitials
}) => {
  const { user } = useAuth();
  const { userProfile } = useRole();

  return (
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
                onChange={onAvatarUpload}
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
              onChange={(e) => onProfileDataChange('first_name', e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <Label htmlFor="last-name">Last Name *</Label>
            <Input
              id="last-name"
              value={profileData.last_name}
              onChange={(e) => onProfileDataChange('last_name', e.target.value)}
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
              onChange={(e) => onProfileDataChange('phone', e.target.value)}
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
  );
};
