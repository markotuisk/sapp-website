
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building2, Shield, User, IdCard, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import QRCode from 'qrcode';

interface DigitalIDCardProps {
  className?: string;
}

export const DigitalIDCard: React.FC<DigitalIDCardProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const { userProfile, isLoading } = useRole();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [qrLoading, setQrLoading] = useState(false);

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
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 24);
    
    return JSON.stringify({
      id: user?.id,
      name: getDisplayName(),
      email: user?.email,
      org: userProfile?.organization,
      dept: userProfile?.department,
      title: userProfile?.job_title,
      employeeId: generateEmployeeId(),
      issued: new Date().toISOString(),
      expires: expirationTime.toISOString(),
      company: 'SAPP Security',
      verified: true,
      hash: btoa(`${user?.id}-${Date.now()}`).slice(0, 16)
    });
  };

  useEffect(() => {
    const generateQRCode = async () => {
      if (!user?.id || isLoading) return;
      
      setQrLoading(true);
      try {
        const qrData = generateQRData();
        const dataUrl = await QRCode.toDataURL(qrData, {
          width: 120,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        });
        setQrCodeDataUrl(dataUrl);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      } finally {
        setQrLoading(false);
      }
    };

    generateQRCode();
  }, [user?.id, userProfile, isLoading]);

  if (isLoading) {
    return (
      <div className={`relative w-full max-w-md mx-auto ${className}`}>
        <div className="flex items-center justify-center h-96 bg-gradient-to-br from-sapp-blue to-accent-dark-blue rounded-xl">
          <div className="text-center text-white">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p>Loading your digital ID...</p>
          </div>
        </div>
      </div>
    );
  }

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
          {/* Profile Section with Larger Image */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white/30 ring-2 ring-white/50 bg-white/10">
                {userProfile?.avatar_url ? (
                  <img 
                    src={userProfile.avatar_url} 
                    alt={getDisplayName()}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <span className="text-sapp-blue text-3xl font-bold">
                      {getInitials()}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
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
              {qrLoading ? (
                <div className="w-24 h-24 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                </div>
              ) : qrCodeDataUrl ? (
                <img 
                  src={qrCodeDataUrl} 
                  alt="ID Verification QR Code"
                  className="w-24 h-24"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Error</span>
                </div>
              )}
            </div>
            <p className="text-white/60 text-xs">Scan for verification</p>
            <p className="text-white/40 text-xs mt-1">Valid for 24 hours</p>
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
