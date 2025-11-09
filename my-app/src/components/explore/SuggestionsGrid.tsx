import React from "react";
import { View } from "react-native";
import { ExploreCard } from "./ExploreCard";
import { ExploreItem, ContentFilterType } from "../../types/explore";

// SuggestionsGrid.tsx
interface SuggestionsGridProps {
  items: ExploreItem[];
  contentFilter: ContentFilterType;
  onItemPress: (id: number) => void;
}

export const SuggestionsGrid: React.FC<SuggestionsGridProps> = ({
  items,
  contentFilter,
  onItemPress,
}) => (
  <View className="flex-row flex-wrap gap-4">
    {items.map((item) => (
      <ExploreCard
        key={item.id}
        item={item}
        contentFilter={contentFilter}
        onPress={() => onItemPress(item.id)}
        variant="suggestion"
      />
    ))}
  </View>
);