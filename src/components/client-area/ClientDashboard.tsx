
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { AdminGuard } from '@/components/auth/AdminGuard';

interface ClientDashboardProps {
  onSignOut: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onSignOut }) => {
  const { user } = useAuth();
  const { userRoles, userProfile, clientData, isLoading: roleLoading, isClient } = useRole();

  return (
    <div className="flex flex-col items-center gap-8 mb-8">
      <div className="text-center">
        <h2 className="text-2xl font-display font-bold text-sapp-dark mb-4">
          Welcome to Your Secure Client Portal
        </h2>
        <div className="flex items-center justify-center gap-2 text-sapp-gray mb-6">
          <Mail className="h-5 w-5 text-sapp-blue" />
          <span>{user?.email}</span>
          {clientData?.company_name && (
            <>
              <span className="mx-2">|</span>
              <span>{clientData.company_name}</span>
            </>
          )}
        </div>
        <p className="text-sapp-gray mb-8">
          You have successfully authenticated to your secure client portal. Here you can access confidential information and communicate with our team.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Client Services */}
          {isClient && (
            <>
              <div className="p-6 border border-gray-200 rounded-lg bg-slate-50">
                <h3 className="font-semibold text-lg mb-2 text-sapp-dark">Your Services</h3>
                <p className="text-sm text-slate-600">View your active services and subscriptions</p>
                {clientData && (
                  <div className="mt-2 text-xs text-gray-500">
                    Tier: {clientData.subscription_tier} | Status: {clientData.account_status}
                  </div>
                )}
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg bg-slate-50">
                <h3 className="font-semibold text-lg mb-2 text-sapp-dark">Documents</h3>
                <p className="text-sm text-slate-600">Access your reports and confidential documents</p>
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
