
import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SitemapXML: React.FC = () => {
  useEffect(() => {
    const fetchAndServeSitemap = async () => {
      try {
        console.log('Fetching sitemap data from edge function...');
        
        const { data, error } = await supabase.functions.invoke('sitemap');
        
        let sitemapContent: string;
        
        if (error) {
          console.error('Error fetching sitemap:', error);
          sitemapContent = generateFallbackSitemap();
        } else if (typeof data === 'string') {
          sitemapContent = data;
        } else {
          console.error('Unexpected sitemap response format:', data);
          sitemapContent = generateFallbackSitemap();
        }

        // Clear the document and write raw XML
        document.open();
        document.write(sitemapContent);
        document.close();
        
        // Set the content type to XML
        if (document.contentType) {
          (document as any).contentType = 'application/xml';
        }
        
      } catch (error) {
        console.error('Error in sitemap fetch:', error);
        const fallbackContent = generateFallbackSitemap();
        document.open();
        document.write(fallbackContent);
        document.close();
      }
    };

    fetchAndServeSitemap();
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

  // Return null since we're handling the response manually
  return null;
};

export default SitemapXML;
