
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Database, Shield, User, CheckCircle, XCircle } from 'lucide-react';

export const DatabaseDebugPanel: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);
    const diagnostics: any[] = [];

    try {
      // Test 1: Authentication Status
      diagnostics.push({
        test: 'Authentication Status',
        status: isAuthenticated ? 'pass' : 'fail',
        details: { isAuthenticated, userId: user?.id, email: user?.email }
      });

      // Test 2: Session Validation
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      diagnostics.push({
        test: 'Session Validation',
        status: session && !sessionError ? 'pass' : 'fail',
        details: { hasSession: !!session, sessionError, sessionUserId: session?.user?.id }
      });

      // Test 3: Basic Database Connectivity
      const { data: connectivityData, error: connectivityError } = await supabase
        .from('user_roles')
        .select('count')
        .limit(1);
      
      diagnostics.push({
        test: 'Database Connectivity',
        status: !connectivityError ? 'pass' : 'fail',
        details: { connectivityError, hasData: !!connectivityData }
      });

      // Test 4: User Roles Check
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user?.id);
      
      diagnostics.push({
        test: 'User Roles Query',
        status: !rolesError ? 'pass' : 'fail',
        details: { rolesError, userRoles, roleCount: userRoles?.length || 0 }
      });

      // Test 5: Admin Function Test
      const { data: isAdminResult, error: adminError } = await supabase.rpc('is_admin_user');
      diagnostics.push({
        test: 'Admin Function Call',
        status: !adminError ? 'pass' : 'fail',
        details: { adminError, isAdminResult }
      });

      // Test 6: News Articles Table Access
      const { data: articlesData, error: articlesError } = await supabase
        .from('news_articles')
        .select('count')
        .limit(1);
      
      diagnostics.push({
        test: 'News Articles Table Access',
        status: !articlesError ? 'pass' : 'fail',
        details: { articlesError, hasAccess: !!articlesData }
      });

      // Test 7: RLS Policy Test (Insert Simulation)
      const testArticle = {
        title: 'Test Article',
        slug: 'test-article-debug',
        summary: 'Test summary',
        content: 'Test content',
        category: 'Test',
        author: 'Debug Test',
        published: false
      };

      const { data: insertTest, error: insertError } = await supabase
        .from('news_articles')
        .insert(testArticle)
        .select()
        .single();

      // If successful, clean up the test article
      if (insertTest && !insertError) {
        await supabase.from('news_articles').delete().eq('id', insertTest.id);
      }

      diagnostics.push({
        test: 'Article Creation Test',
        status: !insertError ? 'pass' : 'fail',
        details: { 
          insertError, 
          insertSuccessful: !!insertTest,
          cleanedUp: !!insertTest
        }
      });

    } catch (error) {
      diagnostics.push({
        test: 'Diagnostic Error',
        status: 'fail',
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }

    setResults(diagnostics);
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Loader2 className="h-4 w-4 animate-spin" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'pass' ? 'default' : 'destructive';
    return <Badge variant={variant}>{status.toUpperCase()}</Badge>;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Debug Panel
        </CardTitle>
        <CardDescription>
          Run comprehensive diagnostics to identify authentication and database permission issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runDiagnostics} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Running Diagnostics...
            </>
          ) : (
            <>
              <Shield className="h-4 w-4 mr-2" />
              Run Diagnostics
            </>
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Diagnostic Results</h3>
            {results.map((result, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.test}</span>
                  </div>
                  {getStatusBadge(result.status)}
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">How to Use This Debug Panel:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click "Run Diagnostics" to test all authentication and database access points</li>
            <li>• Green checkmarks indicate passing tests</li>
            <li>• Red X marks indicate failing tests that need attention</li>
            <li>• Review the details section for specific error messages and debugging info</li>
            <li>• Focus on the first failing test as it may be blocking subsequent tests</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
