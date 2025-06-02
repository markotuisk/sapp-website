
import { useNewsData } from './news-management/useNewsData';
import { useArticleManagement } from './news-management/useArticleManagement';
import { useNewsletterCampaigns } from './news-management/useNewsletterCampaigns';
import { useSubscriberStats } from './news-management/useSubscriberStats';

export const useNewsManagement = () => {
  const {
    articles,
    subscribers,
    campaigns,
    isLoading,
    setArticles,
    setSubscribers,
    setCampaigns,
    refetchData,
  } = useNewsData();

  const {
    createArticle,
    updateArticle,
    deleteArticle,
  } = useArticleManagement(setArticles);

  const {
    sendNewsletter,
  } = useNewsletterCampaigns(refetchData);

  const {
    getSubscriberStats,
  } = useSubscriberStats();

  return {
    articles,
    subscribers,
    campaigns,
    isLoading,
    createArticle,
    updateArticle,
    deleteArticle,
    sendNewsletter,
    getSubscriberStats,
    refetchData,
  };
};
