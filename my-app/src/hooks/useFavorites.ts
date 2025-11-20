import { useState, useCallback } from 'react';
import type { ExploreItem } from '../types/explore';
import { MOCK_FAVORITES } from '../constants/favoritesData';

export const useFavorites = (filterCategory: string) => {
  const [favorites, setFavorites] = useState<ExploreItem[]>(MOCK_FAVORITES);

  const filteredFavorites = filterCategory === 'all'
    ? favorites
    : favorites.filter(item => item.type === filterCategory);

  const removeFavorite = useCallback((id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  }, []);

  return {
    favorites: filteredFavorites,
    removeFavorite,
    toggleFavorite,
    totalCount: filteredFavorites.length, 
  };
};