
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // Only handle GET requests for sitemap
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  try {
    const supabaseUrl = "https://zxgsqsdhnwbldytzvwsq.supabase.co"
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Z3Nxc2RobndibGR5dHp2d3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNzg1NTQsImV4cCI6MjA1ODc1NDU1NH0.6SQIrNpkbOUu-_tqUeCC_CP99eJpl_mItnDpUiCPJ3M"
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Get current date for lastmod
    const currentDate = new Date().toISOString().split('T')[0]
    
    // Comprehensive static routes with proper priorities and change frequencies
    const staticRoutes = [
      { url: '', priority: '1.0', changefreq: 'monthly', lastmod: currentDate },
      { url: 'event-security', priority: '0.9', changefreq: 'monthly', lastmod: currentDate },
      { url: 'security-audits', priority: '0.9', changefreq: 'monthly', lastmod: currentDate },
      { url: 'installations', priority: '0.9', changefreq: 'monthly', lastmod: currentDate },
      { url: 'cyber-security', priority: '0.9', changefreq: 'monthly', lastmod: currentDate },
      { url: 'tscm', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'about', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'news', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
      { url: 'service-navigator', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
      { url: 'service-navigator/services', priority: '0.7', changefreq: 'weekly', lastmod: currentDate },
      { url: 'service-navigator/resources', priority: '0.7', changefreq: 'weekly', lastmod: currentDate },
      { url: 'service-navigator/acronyms', priority: '0.7', changefreq: 'weekly', lastmod: currentDate },
      { url: 'client-area', priority: '0.6', changefreq: 'monthly', lastmod: currentDate },
      
      // Service pages
      { url: 'services/close-protection', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/speech-privacy', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/physical-security-assessments', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/venue-security-audits', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/penetration-testing', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/compliance-audits', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/event-monitoring', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/secure-technology', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/tscm-inspections', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/technology-systems-testing', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      
      // Installation pages
      { url: 'installations/cctv-access', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      { url: 'installations/counter-surveillance', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      { url: 'installations/network-infrastructure', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      { url: 'installations/speech-privacy', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      
      // Cyber security pages
      { url: 'cyber-security/wifi-security', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      { url: 'cyber-security/bluetooth-security', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      { url: 'cyber-security/cellular-security', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      { url: 'cyber-security/iot-device-security', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
    ]

    let newsArticles = [];
    let acronyms = [];

    // Fetch published news articles with timeout
    try {
      const { data: newsData, error: newsError } = await Promise.race([
        supabase
          .from('news_articles')
          .select('slug, updated_at')
          .eq('published', true)
          .order('published_at', { ascending: false }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
      ]);

      if (!newsError && newsData) {
        newsArticles = newsData;
      }
    } catch (error) {
      console.error('Error fetching news articles:', error);
      // Continue with empty array
    }

    // Fetch technical acronyms with timeout
    try {
      const { data: acronymsData, error: acronymsError } = await Promise.race([
        supabase
          .from('technical_acronyms')
          .select('url_slug, updated_at')
          .not('url_slug', 'is', null),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
      ]);

      if (!acronymsError && acronymsData) {
        acronyms = acronymsData;
      }
    } catch (error) {
      console.error('Error fetching acronyms:', error);
      // Continue with empty array
    }

    // Build sitemap XML with proper encoding
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

    // Add static routes
    staticRoutes.forEach(route => {
      const escapedUrl = route.url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      sitemap += `  <url>
    <loc>https://sappsecurity.com/${escapedUrl}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`
    })

    // Add news articles
    if (newsArticles && newsArticles.length > 0) {
      newsArticles.forEach(article => {
        const lastmod = article.updated_at ? new Date(article.updated_at).toISOString().split('T')[0] : currentDate
        const escapedSlug = article.slug.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        sitemap += `  <url>
    <loc>https://sappsecurity.com/news/${escapedSlug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`
      })
    }

    // Add acronym pages
    if (acronyms && acronyms.length > 0) {
      acronyms.forEach(acronym => {
        const lastmod = acronym.updated_at ? new Date(acronym.updated_at).toISOString().split('T')[0] : currentDate
        const escapedSlug = acronym.url_slug.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        sitemap += `  <url>
    <loc>https://sappsecurity.com/acronyms/what-is-${escapedSlug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
      })
    }

    sitemap += `</urlset>`

    // Return XML with proper headers (no CORS needed for sitemaps)
    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })

  } catch (error) {
    console.error('Critical error generating sitemap:', error)
    
    // Return minimal valid XML sitemap even on error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sappsecurity.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sappsecurity.com/event-security</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sappsecurity.com/security-audits</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sappsecurity.com/installations</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sappsecurity.com/cyber-security</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`

    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800', // Shorter cache on error
      },
    })
  }
})
