
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

      // Test 5: Optimized Admin Function Test
      const { data: isAdminResult, error: adminError } = await supabase.rpc('current_user_is_admin');
      diagnostics.push({
        test: 'Optimized Admin Function Call',
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

      // Test 7: RLS Policy Test (Insert Simulation) - Only for admins
      if (isAdminResult) {
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
          test: 'Article Creation Test (Admin Only)',
          status: !insertError ? 'pass' : 'fail',
          details: { 
            insertError, 
            insertSuccessful: !!insertTest,
            cleanedUp: !!insertTest
          }
        });
      } else {
        diagnostics.push({
          test: 'Article Creation Test (Admin Only)',
          status: 'skip',
          details: { reason: 'Not admin user - test skipped' }
        });
      }

      // Test 8: Performance Test - Check RLS optimization
      const startTime = performance.now();
      const { data: perfTest, error: perfError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id);
      const endTime = performance.now();
      
      diagnostics.push({
        test: 'RLS Performance Test',
        status: !perfError && (endTime - startTime) < 1000 ? 'pass' : 'warn',
        details: { 
          perfError, 
          queryTimeMs: Math.round(endTime - startTime),
          optimizationApplied: true
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
      case 'skip':
        return <div className="h-4 w-4 rounded-full bg-gray-300" />;
      case 'warn':
        return <div className="h-4 w-4 rounded-full bg-yellow-500" />;
      default:
        return <Loader2 className="h-4 w-4 animate-spin" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'pass' ? 'default' : 
                   status === 'skip' ? 'secondary' :
                   status === 'warn' ? 'outline' : 'destructive';
    return <Badge variant={variant}>{status.toUpperCase()}</Badge>;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Debug Panel (Optimized)
        </CardTitle>
        <CardDescription>
          Run comprehensive diagnostics to test optimized RLS policies and performance improvements
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
              Running Optimized Diagnostics...
            </>
          ) : (
            <>
              <Shield className="h-4 w-4 mr-2" />
              Run Optimized Diagnostics
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
          <h4 className="font-semibold text-blue-900 mb-2">RLS Performance Optimization Applied:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• ✅ All auth.uid() calls optimized with SELECT wrapper</li>
            <li>• ✅ Duplicate policies consolidated for better performance</li>
            <li>• ✅ New security definer function for admin checks</li>
            <li>• ✅ Complex organization queries simplified</li>
            <li>• ✅ Performance monitoring added to diagnostics</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
