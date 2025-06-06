
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNewsletter } from '@/hooks/useNewsletter';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const NewsletterUnsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('pending');
  const { unsubscribe, isLoading } = useNewsletter();

  const handleUnsubscribe = async () => {
    if (!token) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    const result = await unsubscribe(token);
    
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Successfully Unsubscribed</h2>
                <p className="text-gray-600">
                  You have been successfully removed from our newsletter list.
                  We're sorry to see you go!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (status === 'error') {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Unsubscribe Failed</h2>
                <p className="text-gray-600">
                  The unsubscribe link is invalid or has expired.
                  Please contact us if you continue to receive emails.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Unsubscribe from Newsletter</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Are you sure you want to unsubscribe from our newsletter?
              </p>
              <Button 
                onClick={handleUnsubscribe}
                disabled={isLoading || !token}
                variant="destructive"
                className="w-full"
              >
                {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
              </Button>
              {!token && (
                <p className="text-red-500 text-sm">Invalid unsubscribe link</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};

export default NewsletterUnsubscribe;
