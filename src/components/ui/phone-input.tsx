
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useCountryCodes } from '@/hooks/useCountryCodes';

interface PhoneInputProps {
  countryCode: string;
  localNumber: string;
  onCountryCodeChange: (value: string) => void;
  onLocalNumberChange: (value: string) => void;
  disabled?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  countryCode,
  localNumber,
  onCountryCodeChange,
  onLocalNumberChange,
  disabled = false
}) => {
  const { countryCodes, isLoading } = useCountryCodes();

  return (
    <div className="flex gap-2">
      <Select
        value={countryCode}
        onValueChange={onCountryCodeChange}
        disabled={disabled || isLoading}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Code" />
        </SelectTrigger>
        <SelectContent>
          {countryCodes.map((country) => (
            <SelectItem key={country.id} value={country.dial_code}>
              <div className="flex items-center gap-2">
                {country.flag_emoji && <span>{country.flag_emoji}</span>}
                <span>{country.dial_code}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={localNumber}
        onChange={(e) => onLocalNumberChange(e.target.value)}
        placeholder="Enter phone number"
        disabled={disabled}
        className="flex-1"
      />
    </div>
  );
};
