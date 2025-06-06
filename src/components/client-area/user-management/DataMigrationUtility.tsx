
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MigrationResult {
  userId: string;
  email: string;
  status: 'success' | 'error' | 'skipped';
  message: string;
}

export const DataMigrationUtility: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<MigrationResult[]>([]);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const runMigration = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults([]);
    setCompleted(false);

    try {
      // Fetch all users with profile and client data
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      const { data: clientData, error: clientError } = await supabase
        .from('client_data')
        .select('*');

      if (clientError) throw clientError;

      console.log('Migration - Found profiles:', profiles?.length);
      console.log('Migration - Found client data:', clientData?.length);

      const migrationResults: MigrationResult[] = [];
      const totalUsers = profiles?.length || 0;

      for (let i = 0; i < totalUsers; i++) {
        const profile = profiles[i];
        const clientRecord = clientData?.find(cd => cd.user_id === profile.id);
        
        try {
          const profileOrgId = profile.organization_id;
          const clientOrgId = clientRecord?.organization_id;

          if (!profileOrgId && !clientOrgId) {
            // No organization in either table - assign guest org
            const guestOrgId = '00000000-0000-0000-0000-000000000001';
            
            // Update profile
            await supabase
              .from('profiles')
              .update({ organization_id: guestOrgId })
              .eq('id', profile.id);

            // Upsert client data
            await supabase
              .from('client_data')
              .upsert({
                user_id: profile.id,
                organization_id: guestOrgId
              });

            migrationResults.push({
              userId: profile.id,
              email: profile.email,
              status: 'success',
              message: 'Assigned to guest organization'
            });
          } else if (profileOrgId && !clientOrgId) {
            // Profile has org, client data missing - sync to client data
            await supabase
              .from('client_data')
              .upsert({
                user_id: profile.id,
                organization_id: profileOrgId
              });

            migrationResults.push({
              userId: profile.id,
              email: profile.email,
              status: 'success',
              message: 'Synced organization from profile to client data'
            });
          } else if (!profileOrgId && clientOrgId) {
            // Client data has org, profile missing - sync to profile
            await supabase
              .from('profiles')
              .update({ organization_id: clientOrgId })
              .eq('id', profile.id);

            migrationResults.push({
              userId: profile.id,
              email: profile.email,
              status: 'success',
              message: 'Synced organization from client data to profile'
            });
          } else if (profileOrgId && clientOrgId && profileOrgId !== clientOrgId) {
            // Mismatch - prioritize client data
            await supabase
              .from('profiles')
              .update({ organization_id: clientOrgId })
              .eq('id', profile.id);

            migrationResults.push({
              userId: profile.id,
              email: profile.email,
              status: 'success',
              message: `Resolved mismatch: updated profile to match client data (${clientOrgId})`
            });
          } else {
            // Already consistent
            migrationResults.push({
              userId: profile.id,
              email: profile.email,
              status: 'skipped',
              message: 'Already synchronized'
            });
          }
        } catch (error) {
          console.error(`Migration error for user ${profile.id}:`, error);
          migrationResults.push({
            userId: profile.id,
            email: profile.email,
            status: 'error',
            message: `Error: ${error.message}`
          });
        }

        // Update progress
        const newProgress = Math.round(((i + 1) / totalUsers) * 100);
        setProgress(newProgress);
        setResults([...migrationResults]);
      }

      setCompleted(true);
      toast({
        title: 'Migration Completed',
        description: `Processed ${totalUsers} users. Check results below.`,
      });

    } catch (error) {
      console.error('Migration failed:', error);
      toast({
        title: 'Migration Failed',
        description: `Error: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsRunning(false);
    }
  };

  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  const skippedCount = results.filter(r => r.status === 'skipped').length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Data Migration Utility
        </CardTitle>
        <CardDescription>
          Synchronize organization assignments between profiles and client_data tables
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> This utility will synchronize organization assignments between the profiles and client_data tables.
            It will resolve data inconsistencies by prioritizing client_data over profiles for existing users.
          </AlertDescription>
        </Alert>

        <div className="flex gap-4">
          <Button 
            onClick={runMigration} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            {isRunning ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            {isRunning ? 'Running Migration...' : 'Run Migration'}
          </Button>
        </div>

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {completed && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{successCount}</div>
                <div className="text-sm text-green-600">Successful</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{skippedCount}</div>
                <div className="text-sm text-blue-600">Skipped</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-700">{errorCount}</div>
                <div className="text-sm text-red-600">Errors</div>
              </div>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <h3 className="font-semibold">Migration Results:</h3>
            {results.map((result, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg text-sm ${
                  result.status === 'success' ? 'bg-green-50 border border-green-200' :
                  result.status === 'error' ? 'bg-red-50 border border-red-200' :
                  'bg-blue-50 border border-blue-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{result.email}</div>
                    <div className={`text-xs ${
                      result.status === 'success' ? 'text-green-700' :
                      result.status === 'error' ? 'text-red-700' :
                      'text-blue-700'
                    }`}>
                      {result.message}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    result.status === 'success' ? 'bg-green-100 text-green-800' :
                    result.status === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {result.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
