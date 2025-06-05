
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = "https://zxgsqsdhnwbldytzvwsq.supabase.co"
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Z3Nxc2RobndibGR5dHp2d3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNzg1NTQsImV4cCI6MjA1ODc1NDU1NH0.6SQIrNpkbOUu-_tqUeCC_CP99eJpl_mItnDpUiCPJ3M"
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Get current date for lastmod
    const currentDate = new Date().toISOString().split('T')[0]
    
    // Static routes with their priorities and change frequencies
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
      { url: 'services/close-protection', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/speech-privacy', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/physical-security-assessments', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/venue-security-audits', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/penetration-testing', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/compliance-audits', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/event-monitoring', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'services/secure-technology', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { url: 'installations/cctv-access', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      { url: 'installations/counter-surveillance', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      { url: 'installations/network-infrastructure', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
    ]

    // Fetch published news articles
    const { data: newsArticles, error: newsError } = await supabase
      .from('news_articles')
      .select('slug, updated_at')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (newsError) {
      console.error('Error fetching news articles:', newsError)
    }

    // Fetch technical acronyms
    const { data: acronyms, error: acronymsError } = await supabase
      .from('technical_acronyms')
      .select('url_slug, updated_at')
      .not('url_slug', 'is', null)

    if (acronymsError) {
      console.error('Error fetching acronyms:', acronymsError)
    }

    // Build sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

    // Add static routes
    staticRoutes.forEach(route => {
      sitemap += `  <url>
    <loc>https://sappsecurity.com/${route.url}</loc>
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
        sitemap += `  <url>
    <loc>https://sappsecurity.com/news/${article.slug}</loc>
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
        sitemap += `  <url>
    <loc>https://sappsecurity.com/acronyms/what-is-${acronym.url_slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
      })
    }

    sitemap += `</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        ...corsHeaders
      },
    })

  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { 
      status: 500,
      headers: corsHeaders
    })
  }
})
