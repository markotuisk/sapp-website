
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';

const SitemapXML: React.FC = () => {
  const [sitemapContent, setSitemapContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        console.log('Fetching sitemap data from edge function...');
        
        const { data, error } = await supabase.functions.invoke('sitemap');
        
        if (error) {
          console.error('Error fetching sitemap:', error);
          // Fallback to basic sitemap if edge function fails
          setSitemapContent(generateFallbackSitemap());
        } else if (typeof data === 'string') {
          setSitemapContent(data);
        } else {
          console.error('Unexpected sitemap response format:', data);
          setSitemapContent(generateFallbackSitemap());
        }
      } catch (error) {
        console.error('Error in sitemap fetch:', error);
        setSitemapContent(generateFallbackSitemap());
      } finally {
        setLoading(false);
      }
    };

    fetchSitemap();
  }, []);

  const generateFallbackSitemap = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sappsecurity.com/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sappsecurity.com/event-security</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sappsecurity.com/security-audits</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sappsecurity.com/installations</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sappsecurity.com/cyber-security</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="application/xml; charset=utf-8" />
        </Helmet>
        <pre>Loading sitemap...</pre>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="application/xml; charset=utf-8" />
        <title>Sitemap</title>
      </Helmet>
      <pre dangerouslySetInnerHTML={{ __html: sitemapContent }} />
    </>
  );
};

export default SitemapXML;
