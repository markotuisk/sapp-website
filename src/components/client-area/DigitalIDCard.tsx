
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building2, Shield, User, IdCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';

interface DigitalIDCardProps {
  className?: string;
}

export const DigitalIDCard: React.FC<DigitalIDCardProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const { userProfile } = useRole();

  const getInitials = () => {
    const first = userProfile?.first_name?.charAt(0) || '';
    const last = userProfile?.last_name?.charAt(0) || '';
    return (first + last).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const getDisplayName = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name} ${userProfile.last_name}`;
    }
    return user?.email || 'User';
  };

  const generateEmployeeId = () => {
    const prefix = 'SAPP';
    const userId = user?.id?.slice(0, 8).toUpperCase() || '00000000';
    return `${prefix}-${userId}`;
  };

  const generateQRData = () => {
    return JSON.stringify({
      id: user?.id,
      name: getDisplayName(),
      email: user?.email,
      org: userProfile?.organization,
      dept: userProfile?.department,
      title: userProfile?.job_title,
      employeeId: generateEmployeeId(),
      issued: new Date().toISOString(),
    });
  };

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      {/* ID Card */}
      <div className="relative bg-gradient-to-br from-sapp-blue to-accent-dark-blue rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl animate-fade-in">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Header */}
        <div className="relative px-6 py-4 bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-white" />
              <span className="text-white font-bold text-sm">SAPP SECURITY</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              AUTHORIZED
            </Badge>
          </div>
          <p className="text-white/80 text-xs mt-1">Professional Security Personnel</p>
        </div>

        {/* Main Content */}
        <div className="relative px-6 py-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-lg overflow-hidden border-4 border-white/30 ring-2 ring-white/50 bg-white/10">
                {userProfile?.avatar_url ? (
                  <img 
                    src={userProfile.avatar_url} 
                    alt={getDisplayName()}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <span className="text-sapp-blue text-xl font-bold">
                      {getInitials()}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg leading-tight">{getDisplayName()}</h3>
              {userProfile?.job_title && (
                <p className="text-white/90 text-sm font-medium">{userProfile.job_title}</p>
              )}
              {userProfile?.department && (
                <p className="text-white/70 text-xs">{userProfile.department}</p>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-4 w-4 text-white/80" />
                <span className="text-white/60 text-xs uppercase tracking-wide">Organization</span>
              </div>
              <p className="text-white text-sm font-medium truncate">
                {userProfile?.organization || 'SAPP Security'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <IdCard className="h-4 w-4 text-white/80" />
                <span className="text-white/60 text-xs uppercase tracking-wide">Employee ID</span>
              </div>
              <p className="text-white text-sm font-mono">{generateEmployeeId()}</p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="bg-white rounded-lg p-3 inline-block mb-2">
              <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-white/60 text-xs">Scan for verification</p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative px-6 py-3 bg-white/5 backdrop-blur-sm border-t border-white/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/60 text-xs">Valid from</p>
              <p className="text-white text-xs font-mono">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs">sapp-security.com</p>
              <p className="text-white/60 text-xs">+44 (0) 20 7123 4567</p>
            </div>
          </div>
        </div>

        {/* Holographic Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full animate-[slide-in-right_3s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};
