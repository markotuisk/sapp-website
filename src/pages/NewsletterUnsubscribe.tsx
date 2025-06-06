
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Mail, Loader2 } from 'lucide-react';

const NewsletterUnsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'not-found'>('loading');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const token = searchParams.get('token');
    const emailParam = searchParams.get('email');
    
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
    
    if (!token) {
      setStatus('not-found');
      return;
    }

    // Simulate API call to unsubscribe
    const unsubscribe = async () => {
      try {
        // In a real implementation, you would make an API call here
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate success response
        setStatus('success');
      } catch (error) {
        console.error('Unsubscribe error:', error);
        setStatus('error');
      }
    };

    unsubscribe();
  }, [searchParams]);

  const handleResubscribe = () => {
    // Handle resubscribe logic
    console.log('Resubscribe requested for:', email);
  };

  return (
    <>
      <Helmet>
        <title>Newsletter Unsubscribe - SAPP Security</title>
        <meta name="description" content="Unsubscribe from SAPP Security newsletters and email communications." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Mail className="h-6 w-6" />
                    Newsletter Unsubscribe
                  </CardTitle>
                  <CardDescription>
                    Manage your email subscription preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {status === 'loading' && (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                      <p className="text-gray-600">Processing your unsubscribe request...</p>
                    </div>
                  )}

                  {status === 'success' && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Successfully Unsubscribed</h3>
                      {email && (
                        <p className="text-gray-600 mb-4">
                          We've removed <span className="font-medium">{email}</span> from our newsletter.
                        </p>
                      )}
                      <Alert className="mb-4">
                        <AlertDescription>
                          You will no longer receive marketing emails from SAPP Security. 
                          Please note that you may still receive important service-related communications.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Changed your mind? You can resubscribe at any time.
                        </p>
                        <Button onClick={handleResubscribe} variant="outline">
                          Resubscribe to Newsletter
                        </Button>
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="text-center py-8">
                      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Unsubscribe Failed</h3>
                      <p className="text-gray-600 mb-4">
                        We encountered an error while processing your request.
                      </p>
                      <Alert variant="destructive" className="mb-4">
                        <AlertDescription>
                          Please try again later or contact our support team if the problem persists.
                        </AlertDescription>
                      </Alert>
                      <Button variant="outline" onClick={() => window.location.reload()}>
                        Try Again
                      </Button>
                    </div>
                  )}

                  {status === 'not-found' && (
                    <div className="text-center py-8">
                      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Invalid Link</h3>
                      <p className="text-gray-600 mb-4">
                        This unsubscribe link is invalid or has expired.
                      </p>
                      <Alert variant="destructive" className="mb-4">
                        <AlertDescription>
                          Please use the unsubscribe link from a recent email, or contact our support team for assistance.
                        </AlertDescription>
                      </Alert>
                      <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                        Contact Support
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NewsletterUnsubscribe;
