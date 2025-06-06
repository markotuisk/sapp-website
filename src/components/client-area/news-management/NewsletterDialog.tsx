
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
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
  onSend
}) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (article && isOpen) {
      setSubject(`Newsletter: ${article.title}`);
    }
  }, [article, isOpen]);

  const handleSend = async () => {
    if (!article) return;
    
    if (!subject.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a subject for the newsletter',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await onSend(article.id, subject);
      onClose();
      setSubject('');
    } catch (error) {
      console.error('Error sending newsletter:', error);
      // Error handling is done in the parent hook
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setSubject('');
    }
  };

  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send Newsletter</DialogTitle>
          <DialogDescription>
            Send this article as a newsletter to all active subscribers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Article Info */}
          <div className="space-y-2">
            <h4 className="font-medium">Article:</h4>
            <div className="p-3 bg-slate-50 rounded-lg">
              <h5 className="font-medium">{article.title}</h5>
              <p className="text-sm text-gray-600 mt-1">{article.summary}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{article.category}</Badge>
                <span className="text-xs text-gray-500">by {article.author}</span>
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              Email Subject <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter newsletter subject"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={isLoading || !subject.trim()}
            >
              {isLoading ? 'Sending...' : 'Send Newsletter'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
