
export interface Acronym {
  id: string;
  acronym: string;
  full_name: string;
  description: string;
  category: string;
  url_slug?: string;
  likes?: number;
  dislikes?: number;
  type?: string;
  source_country?: string;
  language?: string;
}

export interface AcronymFilters {
  category?: string;
  language?: string;
  type?: string;
}
