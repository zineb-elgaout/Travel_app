import React from 'react';
import { View } from 'react-native';
import { ExploreCard } from '../explore';
import type { ExploreItem } from '../../types/explore';

interface FavoritesGridProps {
  items: ExploreItem[];
  onItemPress: (id: number) => void;
  onToggleFavorite?: (id: number) => void;
}

export const FavoritesGrid: React.FC<FavoritesGridProps> = ({
  items,
  onItemPress,
  onToggleFavorite,
}) => (
  <View className="flex-row flex-wrap gap-3">
    {items.map((item) => (
      <ExploreCard
        key={item.id}
        item={item}
        contentFilter={item.type}
        onPress={() => onItemPress(item.id)}
        onToggleFavorite={onToggleFavorite}
        variant="suggestion"
      />
    ))}
  </View>
);