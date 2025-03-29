
import { useState, useEffect } from 'react';

export const useCursorEffect = () => {
  useEffect(() => {
    // Reset cursor to default browser style
    document.body.style.cursor = 'auto';
  }, []);

  return { position: { x: 0, y: 0 }, hidden: true };
};
