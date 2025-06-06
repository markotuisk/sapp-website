
import { useNewsData } from './news-management/useNewsData';
import { useNewsArticleOperations } from './news-management/useNewsArticleOperations';
import { useNewsletterCampaigns } from './news-management/useNewsletterCampaigns';

export const useNewsManagement = () => {
  const {
    articles,
    subscribers,
    isLoading,
    setArticles,
    setSubscribers
  } = useNewsData();

  const {
    createArticle,
    updateArticle,
    deleteArticle,
  } = useNewsArticleOperations();

  const {
    sendNewsletter,
  } = useNewsletterCampaigns();

  const refetchData = async () => {
    // Simple refetch placeholder
    console.log('Refetching data...');
  };

  const getSubscriberStats = () => {
    return {
      total: subscribers.length,
      active: subscribers.filter(s => s.status === 'active').length,
      unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length
    };
  };

  return {
    articles,
    subscribers,
    isLoading,
    createArticle,
    updateArticle,
    deleteArticle,
    sendNewsletter,
    getSubscriberStats,
    refetchData,
  };
};
