
import { supabase } from '@/integrations/supabase/client';

export const getOrganizationAwareNewsQuery = () => {
  // For now, return all news articles since organization filtering has been simplified
  return supabase
    .from('news_articles')
    .select('*')
    .order('created_at', { ascending: false });
};

export const getOrganizationAwareSubscribersQuery = () => {
  // Return all subscribers since organization filtering has been simplified
  return supabase
    .from('news_subscribers')
    .select('*')
    .order('created_at', { ascending: false });
};
