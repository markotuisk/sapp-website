
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, WifiOff } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ClientAreaHeader } from '@/components/client-area/ClientAreaHeader';
import { SimpleClientDashboard } from '@/components/client-area/SimpleClientDashboard';
import { SimpleUnauthenticatedView } from '@/components/client-area/SimpleUnauthenticatedView';
import { ClientAreaErrorBoundary } from '@/components/client-area/ClientAreaErrorBoundary';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';

const ClientArea = () => {
  const navigate = useNavigate();
  const { isOnline } = useAuth();
  const { isAuthenticated, loading } = useSimpleAuth();

  const handleClose = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <ClientAreaErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-32 pb-20">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <ClientAreaHeader />
                <div className="p-8 text-center">
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </ClientAreaErrorBoundary>
    );
  }

  return (
    <ClientAreaErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20">
          <div className="container mx-auto px-6">
            {!isOnline && (
              <Alert variant="destructive" className="mb-6">
                <WifiOff className="h-4 w-4" />
                <AlertTitle>No Internet Connection</AlertTitle>
                <AlertDescription>
                  You appear to be offline. Authentication services require an internet connection.
                  Please check your connection and try again.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative">
              <ClientAreaHeader />
              
              <div className="p-8">
                {isAuthenticated ? (
                  <SimpleClientDashboard />
                ) : (
                  <SimpleUnauthenticatedView />
                )}
                
                {/* Only show Close button for unauthenticated users */}
                {!isAuthenticated && (
                  <div className="flex items-center justify-between mt-8 p-4 border-t border-gray-100">
                    <Button 
                      onClick={handleClose}
                      variant="outline"
                      className="ml-auto flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                      size="sm"
                    >
                      Close
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ClientAreaErrorBoundary>
  );
};

export default ClientArea;
