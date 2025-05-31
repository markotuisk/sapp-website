
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CountryCode {
  id: string;
  country_name: string;
  country_code: string;
  dial_code: string;
  flag_emoji?: string;
}

export const useCountryCodes = () => {
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const { data, error } = await supabase
          .from('country_codes')
          .select('*')
          .order('country_name');

        if (error) {
          console.error('Error fetching country codes:', error);
        } else {
          setCountryCodes(data || []);
        }
      } catch (error) {
        console.error('Error fetching country codes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryCodes();
  }, []);

  return { countryCodes, isLoading };
};
