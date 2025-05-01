
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
    
    // For slugs with descriptive text (e.g. "bs-bespoke-sweep"), 
    // try both the full slug and just the acronym part
    const hasMultipleParts = slug.includes("-");
    const acronymPart = hasMultipleParts ? slug.split("-")[0] : slug;
    
    // Step 1: Try exact match with url_slug
    let { data, error } = await supabase
      .from("technical_acronyms")
      .select("*")
      .eq("url_slug", slug)
      .maybeSingle();
    
    if (error) {
      console.error("Error in url_slug lookup attempt:", error);
      throw error;
    }
    
    // Step 2: If not found and slug has descriptive parts, 
    // try with just the acronym part against url_slug
    if (!data && hasMultipleParts) {
      console.log("Trying with just the acronym part against url_slug:", acronymPart);
      
      const { data: acronymPartData, error: acronymPartError } = await supabase
        .from("technical_acronyms")
        .select("*")
        .eq("url_slug", acronymPart)
        .maybeSingle();
        
      if (acronymPartError) {
        console.error("Error in acronym part url_slug lookup:", acronymPartError);
      } else if (acronymPartData) {
        data = acronymPartData;
      }
    }
    
    // Step 3: If still not found, try direct match with acronym field
    if (!data) {
      console.log("Trying direct match with acronym field:", acronymPart);
      
      const { data: acronymMatchData, error: acronymMatchError } = await supabase
        .from("technical_acronyms")
        .select("*")
        .ilike("acronym", acronymPart)
        .maybeSingle();
        
      if (acronymMatchError) {
        console.error("Error in acronym direct match lookup:", acronymMatchError);
      } else if (acronymMatchData) {
        data = acronymMatchData;
      }
    }
    
    // Step 4: If still not found, try fuzzy search on acronym
    if (!data) {
      console.log("Trying fuzzy search on acronym:", acronymPart);
      
      const { data: fuzzyData, error: fuzzyError } = await supabase
        .from("technical_acronyms")
        .select("*")
        .ilike("acronym", `%${acronymPart}%`)
        .limit(1);
        
      if (fuzzyError) {
        console.error("Error in fuzzy acronym lookup:", fuzzyError);
      } else if (fuzzyData && fuzzyData.length > 0) {
        data = fuzzyData[0];
      }
    }
    
    // Step 5: Last resort - try treating the slug as an ID
    if (!data) {
      console.log("Trying ID lookup as last resort");
      const { data: idData, error: idError } = await supabase
        .from("technical_acronyms")
        .select("*")
        .eq("id", slug)
        .maybeSingle();
        
      if (idError) {
        console.error("Error in ID lookup attempt:", idError);
      } else {
        data = idData;
      }
    }
    
    console.log("Acronym lookup result:", data ? `Found: ${data.acronym}` : "Not found");
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
