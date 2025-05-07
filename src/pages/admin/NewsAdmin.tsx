
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const NewsAdmin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState({
    title: "",
    slug: "", // Added slug field
    summary: "",
    content: "",
    cover_image: "",
    category: "Security",
    author: "",
    author_title: "",
    published: false,
    featured: false,
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  // Common categories for security news
  const categories = [
    "Security",
    "Cyber Security",
    "Physical Security",
    "Technology",
    "Company News",
    "Events",
    "Tutorials",
    "Case Studies"
  ];

  // Generate slug from title
  useEffect(() => {
    if (article.title) {
      const slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setArticle(prev => ({ ...prev, slug }));
    }
  }, [article.title]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setArticle((prev) => ({ ...prev, [name]: value }));
  };

  // Handle switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setArticle((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  // Add tag when Enter is pressed
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      // Add tag if it doesn't already exist
      if (!article.tags.includes(tagInput.trim())) {
        setArticle((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setArticle((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Submit the article
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare article data with slug included
      const articleData = {
        ...article,
        published_at: article.published ? new Date().toISOString() : null,
      };

      // Submit to Supabase
      const { data, error } = await supabase
        .from("news_articles")
        .insert(articleData)
        .select("id, slug")
        .single();

      if (error) throw error;

      toast({
        title: "Article created successfully",
        description: article.published 
          ? "Your article has been published." 
          : "Your article has been saved as a draft.",
      });

      // Navigate to the article if published, or back to the admin
      if (article.published && data.slug) {
        navigate(`/news/${data.slug}`);
      } else {
        // Reset the form
        setArticle({
          title: "",
          slug: "",
          summary: "",
          content: "",
          cover_image: "",
          category: "Security",
          author: "",
          author_title: "",
          published: false,
          featured: false,
          tags: [],
        });
      }
    } catch (error: any) {
      console.error("Error creating article:", error);
      toast({
        title: "Error creating article",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>News Admin | SAPP Security</title>
      </Helmet>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Article</h1>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={article.title}
                    onChange={handleChange}
                    placeholder="Enter article title"
                    required
                    className="text-lg"
                  />
                </div>

                {/* Slug - Auto-generated but can be customized */}
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-base">
                    Slug <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={article.slug}
                    onChange={handleChange}
                    placeholder="URL-friendly slug (auto-generated from title)"
                    required
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be used in the URL: /news/your-slug
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <Label htmlFor="summary" className="text-base">
                    Summary <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={article.summary}
                    onChange={handleChange}
                    placeholder="Brief summary of the article (displayed in cards)"
                    required
                    className="min-h-[80px]"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-base">
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={article.content}
                    onChange={handleChange}
                    placeholder="Full article content (supports HTML)"
                    required
                    className="min-h-[300px] font-mono"
                  />
                </div>

                {/* Cover Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="cover_image" className="text-base">
                    Cover Image URL
                  </Label>
                  <Input
                    id="cover_image"
                    name="cover_image"
                    value={article.cover_image}
                    onChange={handleChange}
                    placeholder="URL to the cover image"
                  />
                  {article.cover_image && (
                    <div className="mt-2 rounded-md overflow-hidden max-h-[200px]">
                      <img
                        src={article.cover_image}
                        alt="Cover preview"
                        className="max-w-full h-auto"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Category & Author */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="category"
                      name="category"
                      value={article.category}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Author */}
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-base">
                      Author <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="author"
                      name="author"
                      value={article.author}
                      onChange={handleChange}
                      placeholder="Author name"
                      required
                    />
                  </div>
                </div>

                {/* Author Title */}
                <div className="space-y-2">
                  <Label htmlFor="author_title" className="text-base">
                    Author Title
                  </Label>
                  <Input
                    id="author_title"
                    name="author_title"
                    value={article.author_title}
                    onChange={handleChange}
                    placeholder="Author position or title (e.g. 'Security Specialist')"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-base">
                    Tags
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {article.tags.map((tag) => (
                      <div 
                        key={tag} 
                        className="bg-slate-100 px-2 py-1 rounded-md flex items-center gap-1"
                      >
                        <span>{tag}</span>
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)}
                          className="text-slate-500 hover:text-red-500"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <Input
                    id="tagInput"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add a tag and press Enter"
                  />
                </div>

                {/* Publication Options */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="published" className="text-base">
                        Publish immediately
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        If not published, article will be saved as a draft
                      </p>
                    </div>
                    <Switch
                      id="published"
                      checked={article.published}
                      onCheckedChange={(checked) => handleSwitchChange("published", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="featured" className="text-base">
                        Featured article
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Featured articles appear prominently at the top of the news page
                      </p>
                    </div>
                    <Switch
                      id="featured"
                      checked={article.featured}
                      onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                    />
                  </div>
                </div>

                {/* Submit/Cancel Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/news")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : article.published ? "Publish Article" : "Save Draft"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default NewsAdmin;
