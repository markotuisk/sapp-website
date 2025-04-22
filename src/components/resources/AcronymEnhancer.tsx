
import React, { useState } from 'react';
import { useAcronyms } from '@/hooks/useAcronyms';
import AcronymTooltip from './AcronymTooltip';
import AcronymDialog from './AcronymDialog';

interface AcronymEnhancerProps {
  text: string;
  className?: string;
}

const AcronymEnhancer = ({ text, className }: AcronymEnhancerProps) => {
  const { acronyms } = useAcronyms();
  const [selectedAcronym, setSelectedAcronym] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!acronyms.length) {
    return <span className={className}>{text}</span>;
  }

  // Create a regex pattern from all acronyms
  const pattern = new RegExp(
    `\\b(${acronyms.map(a => a.acronym).join('|')})\\b`,
    'g'
  );

  // Split text and preserve whitespace
  const parts = text.split(pattern);

  return (
    <>
      <span className={className}>
        {parts.map((part, index) => {
          const acronym = acronyms.find(a => a.acronym === part);
          
          if (acronym) {
            return (
              <AcronymTooltip
                key={index}
                acronym={acronym.acronym}
                fullName={acronym.full_name}
                description={acronym.description}
                onClick={() => {
                  setSelectedAcronym(acronym);
                  setDialogOpen(true);
                }}
              />
            );
          }
          
          return part;
        })}
      </span>

      <AcronymDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        acronym={selectedAcronym}
      />
    </>
  );
};

export default AcronymEnhancer;
