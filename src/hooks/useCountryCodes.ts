
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
        const { data, error } = await supabase.functions.invoke('get-country-codes');

        if (error) {
          console.error('Error fetching country codes:', error);
          // Set default country codes
          setCountryCodes([
            { id: '1', country_name: 'United Kingdom', country_code: 'GB', dial_code: '+44', flag_emoji: '🇬🇧' },
            { id: '2', country_name: 'United States', country_code: 'US', dial_code: '+1', flag_emoji: '🇺🇸' },
            { id: '3', country_name: 'Canada', country_code: 'CA', dial_code: '+1', flag_emoji: '🇨🇦' },
            { id: '4', country_name: 'Australia', country_code: 'AU', dial_code: '+61', flag_emoji: '🇦🇺' },
            { id: '5', country_name: 'Germany', country_code: 'DE', dial_code: '+49', flag_emoji: '🇩🇪' },
            { id: '6', country_name: 'France', country_code: 'FR', dial_code: '+33', flag_emoji: '🇫🇷' },
            { id: '7', country_name: 'Spain', country_code: 'ES', dial_code: '+34', flag_emoji: '🇪🇸' },
            { id: '8', country_name: 'Italy', country_code: 'IT', dial_code: '+39', flag_emoji: '🇮🇹' },
            { id: '9', country_name: 'Netherlands', country_code: 'NL', dial_code: '+31', flag_emoji: '🇳🇱' },
            { id: '10', country_name: 'Japan', country_code: 'JP', dial_code: '+81', flag_emoji: '🇯🇵' }
          ]);
        } else {
          setCountryCodes(data || []);
        }
      } catch (error) {
        console.error('Error fetching country codes:', error);
        // Set fallback country codes
        setCountryCodes([
          { id: '1', country_name: 'United Kingdom', country_code: 'GB', dial_code: '+44', flag_emoji: '🇬🇧' },
          { id: '2', country_name: 'United States', country_code: 'US', dial_code: '+1', flag_emoji: '🇺🇸' },
          { id: '3', country_name: 'Canada', country_code: 'CA', dial_code: '+1', flag_emoji: '🇨🇦' },
          { id: '4', country_name: 'Australia', country_code: 'AU', dial_code: '+61', flag_emoji: '🇦🇺' },
          { id: '5', country_name: 'Germany', country_code: 'DE', dial_code: '+49', flag_emoji: '🇩🇪' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryCodes();
  }, []);

  return { countryCodes, isLoading };
};
