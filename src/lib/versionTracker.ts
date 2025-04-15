
import { supabase } from "@/integrations/supabase/client";

export type VersionInfo = {
  id: number;
  component_id: string;
  component_name: string;
  version: string;
  initial_date: string;
  last_update: string;
  update_count: number;
  change_log: ChangeLogEntry[];
};

export type ChangeLogEntry = {
  timestamp: string;
  version: string;
  description: string;
};

/**
 * Updates a component's version information in the database
 */
export const updateComponentVersion = async (
  componentId: string,
  componentName: string,
  version: string,
  changeDescription: string
): Promise<VersionInfo | null> => {
  try {
    const { data, error } = await supabase.rpc('update_page_version', {
      _component_id: componentId,
      _component_name: componentName,
      _version: version,
      _change_description: changeDescription
    });

    if (error) {
      console.error('Error updating version:', error);
      return null;
    }

    return data as unknown as VersionInfo;
  } catch (error) {
    console.error('Exception updating version:', error);
    return null;
  }
};

/**
 * Fetches version information for all components
 */
export const getAllVersions = async (): Promise<VersionInfo[]> => {
  try {
    const { data, error } = await supabase.rpc('get_all_page_versions');

    if (error) {
      console.error('Error fetching all versions:', error);
      return [];
    }

    return data as VersionInfo[];
  } catch (error) {
    console.error('Exception fetching all versions:', error);
    return [];
  }
};

/**
 * Fetches version information for a specific component
 */
export const getComponentVersion = async (componentId: string): Promise<VersionInfo | null> => {
  try {
    const { data, error } = await supabase.rpc('get_page_version', {
      _component_id: componentId
    });

    if (error) {
      console.error('Error fetching component version:', error);
      return null;
    }

    if (data && data.length > 0) {
      return data[0] as VersionInfo;
    }

    return null;
  } catch (error) {
    console.error('Exception fetching component version:', error);
    return null;
  }
};

/**
 * Formats a database timestamp into a localized date string
 */
export const formatVersionDate = (dateString: string): { 
  date: string; 
  time: string;
  iso: string;
} => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    iso: date.toISOString()
  };
};
