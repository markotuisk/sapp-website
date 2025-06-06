
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import NewsHero from '@/components/news/NewsHero';
import SearchBar from '@/components/news/SearchBar';
import CategoryFilter from '@/components/news/CategoryFilter';
import NewsGrid from '@/components/news/NewsGrid';

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>News & Insights | SAPP Security</title>
        <meta 
          name="description" 
          content="Stay updated with the latest security news, insights, and developments from SAPP Security. Expert analysis on security trends and best practices." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/news" />
        <meta property="og:title" content="News & Insights | SAPP Security" />
        <meta property="og:description" content="Latest security news, insights, and expert analysis from SAPP Security." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sappsecurity.com/news" />
      </Helmet>
      <PublicLayout>
        <NewsHero />
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <SearchBar />
              <CategoryFilter />
            </div>
            <NewsGrid />
          </div>
        </section>
      </PublicLayout>
    </div>
  );
};

export default News;
