
import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { PublicNews } from '@/components/public/PublicNews';
import { NewsletterSignup } from '@/components/public/NewsletterSignup';

const News = () => {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Latest News & Updates</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PublicNews />
            </div>
            
            <div className="space-y-6">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default News;
