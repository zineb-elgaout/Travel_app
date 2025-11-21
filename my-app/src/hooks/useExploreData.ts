import { useMemo } from 'react';
import { EXPLORE_DATA } from '../constants/exploreData';
import type { ContentFilterType, ExploreItem } from '../types/explore';

export const useExploreData = (
  regionKey: string,  // Doit être une chaîne valide (e.g., 'Tanger-Tétouan-Al Hoceïma')
  contentFilter: ContentFilterType,
  selectedCategory: string
) => {
  return useMemo(() => {
    // Vérification et débogage : Log pour voir regionKey
    console.log('useExploreData - regionKey:', regionKey, 'contentFilter:', contentFilter, 'selectedCategory:', selectedCategory);

    // Vérifier si regionKey est valide
    if (!regionKey) {
      console.warn('useExploreData - regionKey is undefined or null');
      return { slides: [], suggestions: [] };
    }

    // Récupérer les données de la région spécifique
    const regionData = EXPLORE_DATA[regionKey];
    if (!regionData) {
      console.warn(`useExploreData - No data found for regionKey: ${regionKey}. Available keys:`, Object.keys(EXPLORE_DATA));
      return { slides: [], suggestions: [] };
    }

    // Vérifier si le contentFilter existe pour cette région
    if (!regionData[contentFilter]) {
      console.warn(`useExploreData - No data found for contentFilter: ${contentFilter} in region: ${regionKey}`);
      return { slides: [], suggestions: [] };
    }

    // Récupérer les slides et suggestions pour le filtre de contenu
    const data = regionData[contentFilter];
    const slides = data.slides || [];
    
    // Logique de filtrage pour suggestions (basée sur votre code original)
    const allSuggestions = data.suggestions || [];
    let suggestions;
    if (selectedCategory === 'popular') {
      suggestions = allSuggestions;
    } else {
      suggestions = allSuggestions.filter(
        (item: ExploreItem) => item.subType === selectedCategory
      );
    }

    console.log('useExploreData - Returning slides:', slides.length, 'suggestions:', suggestions.length);
    return { slides, suggestions };
  }, [regionKey, contentFilter, selectedCategory]);
};
