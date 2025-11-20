import { useMemo } from 'react';
import { EXPLORE_DATA } from '../constants/exploreData';
import type { ContentFilterType, ExploreItem } from '../types/explore';

export const useExploreData = (
  contentFilter: ContentFilterType,
  selectedCategory: string
) => {
  const slides = useMemo(
    () => EXPLORE_DATA[contentFilter].slides,
    [contentFilter]
  );

  const suggestions = useMemo(() => {
    const allSuggestions = EXPLORE_DATA[contentFilter].suggestions;
    
    if (selectedCategory === 'popular') {
      return allSuggestions;
    }
    
    return allSuggestions.filter(
      item => item.subType === selectedCategory
    );
  }, [contentFilter, selectedCategory]);

  return { slides, suggestions };
};