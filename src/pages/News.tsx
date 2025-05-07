
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsHero from "@/components/news/NewsHero";
import NewsGrid from "@/components/news/NewsGrid";
import CategoryFilter from "@/components/news/CategoryFilter";
import LoadMoreButton from "@/components/news/LoadMoreButton";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import { useLanguage } from "@/hooks/useLanguage";

const ARTICLES_PER_PAGE = 9;

const News = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  
  // Fetch initial articles
  const { data: articles = [], isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useNewsArticles({
    limit: ARTICLES_PER_PAGE,
    offset: 0,
    category: selectedCategory || undefined,
  });

  // Extract unique categories from articles
  useEffect(() => {
    if (articles && articles.length > 0) {
      const categories = [...new Set(articles.map(article => article.category))];
      setAllCategories(categories);
    }
  }, [articles]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    fetchNextPage();
  };

  return (
    <>
      <Helmet>
        <title>{t("news")} | SAPP Security</title>
        <meta name="description" content={t("newsIntro")} />
        <meta property="og:title" content={`${t("news")} | SAPP Security`} />
        <meta property="og:description" content={t("newsIntro")} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      
      <main>
        <NewsHero />
        
        <section className="container mx-auto px-4 py-12">
          <CategoryFilter
            categories={allCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            className="mb-8"
          />
          
          <NewsGrid
            articles={articles}
            loading={isLoading}
            className="mb-8"
          />
          
          {hasNextPage && (
            <LoadMoreButton
              onClick={handleLoadMore}
              loading={isFetchingNextPage}
              disabled={!hasNextPage}
              className="mt-8"
            />
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default News;
