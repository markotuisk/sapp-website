
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, FileText, Settings, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { useDocuments } from '@/hooks/useDocuments';
import { AdminGuard } from '@/components/auth/AdminGuard';
import { UserProfile } from './UserProfile';
import { UserSettings } from './UserSettings';
import { DocumentManagement } from './DocumentManagement';
import { UserProfileSection } from './UserProfileSection';

interface ClientDashboardProps {
  onSignOut: () => void;
}

type View = 'dashboard' | 'profile' | 'settings' | 'documents';

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onSignOut }) => {
  const { userRoles, clientData, isClient } = useRole();
  const { documents } = useDocuments();
  const [currentView, setCurrentView] = useState<View>('dashboard');

  if (currentView === 'profile') {
    return <UserProfile onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'settings') {
    return <UserSettings onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'documents') {
    return <DocumentManagement onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="space-y-8">
      {/* User Profile Section */}
      <UserProfileSection />

      <div className="text-center">
        <h2 className="text-2xl font-display font-bold text-sapp-dark mb-4">
          Welcome to Your Secure Client Portal
        </h2>
        <p className="text-sapp-gray mb-8">
          You have successfully authenticated to your secure client portal. Here you can access confidential information and communicate with our team.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* User Profile */}
          <div 
            className="p-6 border border-gray-200 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
            onClick={() => setCurrentView('profile')}
          >
            <div className="flex items-center gap-3 mb-2">
              <User className="h-6 w-6 text-sapp-blue" />
              <h3 className="font-semibold text-lg text-sapp-dark">User Profile</h3>
            </div>
            <p className="text-sm text-slate-600">Update your personal and professional information</p>
          </div>

          {/* Account Settings */}
          <div 
            className="p-6 border border-gray-200 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
            onClick={() => setCurrentView('settings')}
          >
            <div className="flex items-center gap-3 mb-2">
              <Settings className="h-6 w-6 text-sapp-blue" />
              <h3 className="font-semibold text-lg text-sapp-dark">Settings</h3>
            </div>
            <p className="text-sm text-slate-600">Manage notifications, theme, and preferences</p>
          </div>

          {/* Document Management */}
          <div 
            className="p-6 border border-gray-200 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
            onClick={() => setCurrentView('documents')}
          >
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-6 w-6 text-sapp-blue" />
              <h3 className="font-semibold text-lg text-sapp-dark">Documents</h3>
            </div>
            <p className="text-sm text-slate-600">Access your reports and confidential documents</p>
            <div className="mt-2 text-xs text-gray-500">
              {documents.length} document{documents.length !== 1 ? 's' : ''} available
            </div>
          </div>
          
          {/* Client Services */}
          {isClient && (
            <>
              <div className="p-6 border border-gray-200 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="h-6 w-6 text-sapp-blue" />
                  <h3 className="font-semibold text-lg text-sapp-dark">Your Services</h3>
                </div>
                <p className="text-sm text-slate-600">View your active services and subscriptions</p>
                {clientData && (
                  <div className="mt-2 text-xs text-gray-500">
                    Tier: {clientData.subscription_tier} | Status: {clientData.account_status}
                  </div>
                )}
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg bg-slate-50">
                <h3 className="font-semibold text-lg mb-2 text-sapp-dark">Schedule Meeting</h3>
                <p className="text-sm text-slate-600">Book an appointment with our team</p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg bg-slate-50">
                <h3 className="font-semibold text-lg mb-2 text-sapp-dark">Support</h3>
                <p className="text-sm text-slate-600">Contact our support team for assistance</p>
              </div>
            </>
          )}

          {/* Admin Panel */}
          <AdminGuard>
            <div className="md:col-span-2 p-6 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-semibold text-lg mb-2 text-red-800">Admin Panel</h3>
              <p className="text-sm text-red-600">Manage users, roles, and system settings</p>
            </div>
          </AdminGuard>

          {/* Manager/Support Tools */}
          {(userRoles.includes('manager') || userRoles.includes('support')) && (
            <div className="md:col-span-2 p-6 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">
                {userRoles.includes('manager') ? 'Management' : 'Support'} Tools
              </h3>
              <p className="text-sm text-blue-600">
                Access client management and support tools
              </p>
            </div>
          )}
        </div>
        
        <Button
          onClick={onSignOut}
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-50"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};
