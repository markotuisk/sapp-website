
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsHero from "@/components/news/NewsHero";
import NewsGrid from "@/components/news/NewsGrid";
import CategoryFilter from "@/components/news/CategoryFilter";
import LoadMoreButton from "@/components/news/LoadMoreButton";
import SearchBar from "@/components/news/SearchBar";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import { useLanguage } from "@/hooks/useLanguage";

const ARTICLES_PER_PAGE = 9;

const News = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  
  // Fetch initial articles
  const { data: articles = [], isLoading, refetch } = useNewsArticles({
    limit: ARTICLES_PER_PAGE,
    offset: 0,
    category: selectedCategory || undefined,
    searchTerm: searchTerm || undefined,
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    // For simplicity, just refetch more articles (in a real app, we would add pagination)
    refetch();
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
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <CategoryFilter
              categories={allCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              className="w-full md:w-auto"
            />
            
            <SearchBar 
              onSearch={handleSearch}
              initialValue={searchTerm}
              className="w-full md:w-auto"
            />
          </div>
          
          <NewsGrid
            articles={articles}
            loading={isLoading}
            className="mb-8"
          />
          
          {articles.length >= ARTICLES_PER_PAGE && (
            <LoadMoreButton
              onClick={handleLoadMore}
              loading={isLoading}
              disabled={articles.length < ARTICLES_PER_PAGE}
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
