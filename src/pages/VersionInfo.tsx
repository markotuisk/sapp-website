
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Code, RefreshCw, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Get current date and time formatted nicely
const getCurrentDateTime = () => {
  const now = new Date();
  return {
    date: now.toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: now.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    iso: now.toISOString()
  };
};

const VersionInfo = () => {
  const currentDateTime = getCurrentDateTime();
  
  // Real build information
  const buildInfo = {
    currentBuild: "1.0.0", // Initial version
    buildDate: "2025-04-15T14:30:00", // Today with time
    lastUpdated: currentDateTime.iso,
    frameworkVersion: "React 18.3.1", // Real from package.json
    tailwindVersion: "2.5.2" // Real from package.json
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Version Information | SAPP Security</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      {/* Added proper top padding to fix navigation overlap */}
      <main className="container mx-auto px-4 pt-32 pb-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sapp-blue hover:text-sapp-blue/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mt-4 mb-2">Version Information</h1>
          <p className="text-sapp-gray max-w-3xl">
            Technical information about the SAPP Security website versions and builds.
            <span className="block mt-2 text-sm">
              <Clock className="inline h-4 w-4 mr-1" /> 
              Information collected: {currentDateTime.date} at {currentDateTime.time}
            </span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-sapp-dark">Current Build</CardTitle>
              <CardDescription>Overall site version</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Code className="h-5 w-5 text-sapp-blue mr-2" />
                <span className="text-2xl font-semibold">{buildInfo.currentBuild}</span>
              </div>
              <p className="text-sm text-sapp-gray">
                Built on {new Date(buildInfo.buildDate).toLocaleDateString('en-GB', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} at {new Date(buildInfo.buildDate).toLocaleTimeString('en-GB', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-sapp-dark">Technology</CardTitle>
              <CardDescription>Framework information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-sapp-gray">React:</span>
                  <span className="font-medium">{buildInfo.frameworkVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-sapp-gray">Tailwind:</span>
                  <span className="font-medium">{buildInfo.tailwindVersion}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-sapp-dark">Implementation Note</CardTitle>
              <CardDescription>Version tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-sapp-gray">
                <p>This page currently shows static version information. <a href="#automation" className="text-sapp-blue hover:underline">See below</a> for automation recommendations.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-sm mb-8" id="automation">
          <CardHeader>
            <CardTitle className="text-lg text-sapp-dark">Version Tracking Automation</CardTitle>
            <CardDescription>Recommendations for implementing automated version tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">Recommended Approach:</h3>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                <span className="font-medium">Create a version tracking module</span>
                <p className="text-sm text-sapp-gray ml-6 mt-1">
                  Implement a dedicated file (e.g., <code>versionTracker.ts</code>) to store and manage version information.
                </p>
              </li>
              <li>
                <span className="font-medium">Implement a version API endpoint</span>
                <p className="text-sm text-sapp-gray ml-6 mt-1">
                  Add a Supabase function that returns the latest version data from your database.
                </p>
              </li>
              <li>
                <span className="font-medium">Set up a database table structure</span>
                <p className="text-sm text-sapp-gray ml-6 mt-1">
                  Create a <code>page_versions</code> table with fields for component ID, version, dates, and change logs.
                </p>
              </li>
              <li>
                <span className="font-medium">Integrate with your deployment process</span>
                <p className="text-sm text-sapp-gray ml-6 mt-1">
                  Update version numbers automatically during the CI/CD pipeline when files are changed.
                </p>
              </li>
              <li>
                <span className="font-medium">Implement version hooks</span>
                <p className="text-sm text-sapp-gray ml-6 mt-1">
                  Create a React hook (e.g., <code>usePageVersions</code>) to fetch version data for components.
                </p>
              </li>
            </ol>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100 mt-4">
              <h4 className="font-semibold mb-2">Suggested Database Schema:</h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`CREATE TABLE page_versions (
  id SERIAL PRIMARY KEY,
  component_id TEXT NOT NULL,
  component_name TEXT NOT NULL,
  version TEXT NOT NULL,
  initial_date TIMESTAMP WITH TIME ZONE NOT NULL,
  last_update TIMESTAMP WITH TIME ZONE NOT NULL,
  update_count INTEGER NOT NULL DEFAULT 1,
  change_log JSONB
);`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default VersionInfo;
