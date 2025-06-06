
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Shield, Zap } from 'lucide-react';

const TechnicalAcronymsApi = () => {
  return (
    <>
      <Helmet>
        <title>Technical Acronyms API - SAPP Security</title>
        <meta name="description" content="Access our comprehensive technical acronyms API for security terminology, TSCM terms, and industry-specific language." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Technical Acronyms API
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Access our comprehensive database of security acronyms and technical terminology 
                through our RESTful API service.
              </p>
              <Badge variant="secondary" className="text-sm">
                Coming Soon
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Comprehensive Database
                  </CardTitle>
                  <CardDescription>
                    Access over 1,000+ security-related acronyms and technical terms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• TSCM terminology</li>
                    <li>• Cyber security acronyms</li>
                    <li>• Physical security terms</li>
                    <li>• Industry standards</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    RESTful API
                  </CardTitle>
                  <CardDescription>
                    Simple, fast, and reliable API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• JSON responses</li>
                    <li>• Rate limiting</li>
                    <li>• Authentication</li>
                    <li>• Documentation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Secure Access
                  </CardTitle>
                  <CardDescription>
                    Enterprise-grade security and reliability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• API key authentication</li>
                    <li>• HTTPS encryption</li>
                    <li>• Usage analytics</li>
                    <li>• 99.9% uptime SLA</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  API Documentation Preview
                </CardTitle>
                <CardDescription>
                  Sample endpoints and response formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="mb-4">
                    <span className="text-blue-400">GET</span> /api/v1/acronyms/search?q=TSCM
                  </div>
                  <div className="text-gray-300">
                    {`{
  "results": [
    {
      "acronym": "TSCM",
      "definition": "Technical Surveillance Countermeasures",
      "category": "security",
      "description": "The process of detecting and neutralizing surveillance threats...",
      "related_terms": ["TEMPEST", "RF", "SIGINT"]
    }
  ],
  "total": 1,
  "page": 1
}`}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TechnicalAcronymsApi;
