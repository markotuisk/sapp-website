
import { supabase } from "@/integrations/supabase/client";
import { Acronym, AcronymFilters } from "@/types/acronyms";
import { toast } from "sonner";

export async function fetchAcronymsFromApi(
  searchQuery: string,
  filters: AcronymFilters
) {
  try {
    // Use the search_acronyms function we created in the migration
    const { data, error } = await supabase.rpc('search_acronyms', {
      search_query: searchQuery,
      category_filter: filters.category,
      language_filter: filters.language,
      type_filter: filters.type
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    console.log("Acronyms fetched:", data?.length || 0);
    return data || [];
  } catch (err) {
    console.error("Error fetching acronyms:", err);
    throw err;
  }
}

export async function fetchDistinctValuesFromApi() {
  try {
    // Fetch categories
    const { data: categoryData, error: categoryError } = await supabase
      .from("technical_acronyms")
      .select("category")
      .order('category');
    
    if (categoryError) throw categoryError;
    
    // Fetch languages
    const { data: languageData, error: languageError } = await supabase
      .from("technical_acronyms")
      .select("language")
      .order('language');
    
    if (languageError) throw languageError;
    
    // Fetch types
    const { data: typeData, error: typeError } = await supabase
      .from("technical_acronyms")
      .select("type")
      .order('type');
    
    if (typeError) throw typeError;
    
    // Extract unique values using Set
    const uniqueCategories = categoryData 
      ? [...new Set(categoryData.map(item => item.category))].filter(Boolean)
      : [];
    
    const uniqueLanguages = languageData 
      ? [...new Set(languageData.map(item => item.language))].filter(Boolean)
      : [];
    
    const uniqueTypes = typeData 
      ? [...new Set(typeData.map(item => item.type))].filter(Boolean)
      : [];
    
    return {
      categories: uniqueCategories,
      languages: uniqueLanguages,
      types: uniqueTypes
    };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    throw error;
  }
}

export async function findAcronymBySlugFromApi(slug: string): Promise<Acronym | null> {
  try {
    console.log("Finding acronym by slug:", slug);
    
    // First try exact match
    let { data, error } = await supabase
      .from("technical_acronyms")
      .select("*")
      .eq("url_slug", slug)
      .maybeSingle();
    
    if (error) {
      console.error("Error in first lookup attempt:", error);
      throw error;
    }
    
    // If not found by url_slug, try finding by acronym as fallback
    if (!data) {
      console.log("Not found by slug, trying acronym lookup");
      const { data: acronymData, error: acronymError } = await supabase
        .from("technical_acronyms")
        .select("*")
        .ilike("acronym", slug)
        .maybeSingle();
        
      if (acronymError) {
        console.error("Error in acronym lookup attempt:", acronymError);
        throw acronymError;
      }
      
      data = acronymData;
      
      // If still not found, try ID lookup as a last resort
      if (!data) {
        console.log("Not found by acronym, trying ID lookup");
        const { data: idData, error: idError } = await supabase
          .from("technical_acronyms")
          .select("*")
          .eq("id", slug)
          .maybeSingle();
          
        if (idError) {
          console.error("Error in ID lookup attempt:", idError);
          throw idError;
        }
        
        data = idData;
      }
    }
    
    console.log("Acronym lookup result:", data ? "Found" : "Not found");
    return data;
  } catch (error) {
    console.error("Error finding acronym by slug:", error);
    return null;
  }
}

export async function incrementLikesApi(acronymId: string) {
  try {
    const { error } = await supabase
      .rpc('increment_acronym_likes', { acronym_id: acronymId });
    
    if (error) {
      throw error;
    }
    
    toast.success("Thanks for your feedback!");
    return true;
  } catch (error) {
    console.error("Error incrementing likes:", error);
    toast.error("Failed to record your feedback");
    throw error;
  }
}

export async function incrementDislikesApi(acronymId: string) {
  try {
    const { error } = await supabase
      .rpc('increment_acronym_dislikes', { acronym_id: acronymId });
    
    if (error) {
      throw error;
    }
    
    toast.success("Thanks for your feedback!");
    return true;
  } catch (error) {
    console.error("Error incrementing dislikes:", error);
    toast.error("Failed to record your feedback");
    throw error;
  }
}
