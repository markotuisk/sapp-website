
import React from "react";
import AcronymCard from "./AcronymCard";
import AcronymEmptyState from "./AcronymEmptyState";
import { Acronym } from "@/types/acronyms";

interface AcronymsGridProps {
  acronyms: Acronym[];
  handleLike: (acronymId: string, e: React.MouseEvent) => void;
  handleDislike: (acronymId: string, e: React.MouseEvent) => void;
  interactedAcronyms: Record<string, boolean>;
}

const AcronymsGrid: React.FC<AcronymsGridProps> = ({
  acronyms,
  handleLike,
  handleDislike,
  interactedAcronyms,
}) => {
  if (acronyms.length === 0) {
    return <AcronymEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {acronyms.map((acronym) => (
        <AcronymCard
          key={acronym.id}
          acronym={acronym}
          handleLike={handleLike}
          handleDislike={handleDislike}
          interacted={!!interactedAcronyms[acronym.id]}
        />
      ))}
    </div>
  );
};

export default AcronymsGrid;
