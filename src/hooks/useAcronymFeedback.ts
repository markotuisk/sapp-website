
import { useState } from 'react';
import { incrementLikesApi, incrementDislikesApi } from '@/api/acronymsApi';
import { Acronym } from '@/types/acronyms';

export const useAcronymFeedback = (
  updateLocalAcronym?: (id: string, changes: Partial<Acronym>) => void
) => {
  const [interactedAcronyms, setInteractedAcronyms] = useState<Record<string, boolean>>({});

  const incrementLikes = async (acronymId: string) => {
    if (interactedAcronyms[acronymId]) return;
    
    try {
      await incrementLikesApi(acronymId);
      
      // Update the interaction state
      setInteractedAcronyms(prev => ({ ...prev, [acronymId]: true }));
      
      // Update the local state if a callback was provided
      if (updateLocalAcronym) {
        updateLocalAcronym(acronymId, { likes: undefined }); // The actual increment happens on the server
      }
    } catch (error) {
      console.error("Error in like operation:", error);
    }
  };

  const incrementDislikes = async (acronymId: string) => {
    if (interactedAcronyms[acronymId]) return;
    
    try {
      await incrementDislikesApi(acronymId);
      
      // Update the interaction state
      setInteractedAcronyms(prev => ({ ...prev, [acronymId]: true }));
      
      // Update the local state if a callback was provided
      if (updateLocalAcronym) {
        updateLocalAcronym(acronymId, { dislikes: undefined }); // The actual increment happens on the server
      }
    } catch (error) {
      console.error("Error in dislike operation:", error);
    }
  };

  return {
    interactedAcronyms,
    setInteractedAcronyms,
    incrementLikes,
    incrementDislikes
  };
};
