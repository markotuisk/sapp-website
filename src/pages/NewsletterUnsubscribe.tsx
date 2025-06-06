
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsletterUnsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleUnsubscribe = async () => {
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address to unsubscribe.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate unsubscribe process
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsUnsubscribed(true);
      toast({
        title: 'Successfully unsubscribed',
        description: 'You have been removed from our newsletter.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to unsubscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Newsletter Unsubscribe | SAPP Security</title>
        <meta name="description" content="Unsubscribe from SAPP Security newsletter." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <PublicLayout>
        <div className="py-16 bg-slate-50 min-h-[60vh] flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              {!isUnsubscribed ? (
                <Card>
                  <CardHeader className="text-center">
                    <Mail className="h-12 w-12 text-sapp-blue mx-auto mb-4" />
                    <CardTitle>Unsubscribe from Newsletter</CardTitle>
                    <CardDescription>
                      We're sorry to see you go. Enter your email address to unsubscribe from our newsletter.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button 
                      onClick={handleUnsubscribe}
                      disabled={isLoading}
                      className="w-full bg-sapp-blue hover:bg-sapp-blue/90"
                    >
                      {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-sapp-dark mb-2">Successfully Unsubscribed</h2>
                    <p className="text-sapp-gray mb-6">
                      You have been successfully removed from our newsletter. You will no longer receive emails from us.
                    </p>
                    <Button asChild className="bg-sapp-blue hover:bg-sapp-blue/90">
                      <a href="/">Return to Homepage</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </PublicLayout>
    </div>
  );
};

export default NewsletterUnsubscribe;
