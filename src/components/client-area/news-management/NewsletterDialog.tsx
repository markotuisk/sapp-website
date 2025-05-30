
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Users, Clock, AlertCircle } from 'lucide-react';
import { useNewsManagement } from '@/hooks/useNewsManagement';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

interface NewsletterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle | null;
  onSend: (articleId: string, subject: string) => Promise<any>;
}

export const NewsletterDialog: React.FC<NewsletterDialogProps> = ({
  isOpen,
  onClose,
  article,
  onSend,
}) => {
  const { getSubscriberStats } = useNewsManagement();
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriberStats, setSubscriberStats] = useState({
    total_subscribers: 0,
    active_subscribers: 0,
    unsubscribed: 0,
    recent_signups: 0,
  });

  useEffect(() => {
    if (isOpen && article) {
      setSubject(`New Article: ${article.title}`);
      loadSubscriberStats();
    }
  }, [isOpen, article]);

  const loadSubscriberStats = async () => {
    const stats = await getSubscriberStats();
    setSubscriberStats(stats);
  };

  const handleSend = async () => {
    if (!article || !subject.trim()) return;

    setIsSubmitting(true);
    try {
      await onSend(article.id, subject.trim());
      onClose();
    } catch (error) {
      console.error('Error sending newsletter:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Newsletter
          </DialogTitle>
          <DialogDescription>
            Send this article to all active newsletter subscribers
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Article Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Article Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{article.summary}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <span className="text-xs text-gray-500">By {article.author}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscriber Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{subscriberStats.active_subscribers}</p>
                    <p className="text-xs text-gray-500">Active Subscribers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{subscriberStats.total_subscribers}</p>
                    <p className="text-xs text-gray-500">Total Subscribers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">{subscriberStats.recent_signups}</p>
                    <p className="text-xs text-gray-500">Recent Signups</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">{subscriberStats.unsubscribed}</p>
                    <p className="text-xs text-gray-500">Unsubscribed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email Settings */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Email Subject *</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject line"
              />
              <p className="text-xs text-gray-500 mt-1">
                Keep it engaging and under 50 characters for better open rates
              </p>
            </div>

            {subscriberStats.active_subscribers === 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <p className="text-sm text-orange-700">
                      No active subscribers found. The newsletter will not be sent to anyone.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Information */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-2">What happens when you send:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Newsletter will be sent to {subscriberStats.active_subscribers} active subscribers</li>
                <li>• Email will include article title, summary, and "Read More" link</li>
                <li>• Unsubscribe link will be automatically included</li>
                <li>• Article will be marked as "Newsletter Sent"</li>
                <li>• Campaign analytics will be tracked</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={isSubmitting || !subject.trim() || subscriberStats.active_subscribers === 0}
          >
            {isSubmitting ? 'Sending...' : `Send to ${subscriberStats.active_subscribers} Subscribers`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
