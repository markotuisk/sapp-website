
// Simplified types for public website only
export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  status: string;
  subscription_preferences: {
    company_news: boolean;
    security_updates: boolean;
    featured_articles: boolean;
  };
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  organization?: string;
  message: string;
  pages_visited?: any;
  created_at: string;
}
