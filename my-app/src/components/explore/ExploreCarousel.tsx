import React from "react";
import { View, ScrollView } from "react-native";
import { ExploreCard } from "./ExploreCard";
import { ExploreItem, ContentFilterType } from "../../types/explore";  

// ExploreCarousel.tsx
interface ExploreCarouselProps {
  items: ExploreItem[];
  contentFilter: ContentFilterType;
  onItemPress: (id: number) => void;
}

export const ExploreCarousel: React.FC<ExploreCarouselProps> = ({
  items,
  contentFilter,
  onItemPress,
}) => (
  <View className="mb-8">
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      snapToInterval={300}
      decelerationRate="fast"
      contentContainerStyle={{ 
        paddingHorizontal: 24,
        gap: 16
      }}
    >
      {items.map((item) => (
        <ExploreCard
          key={item.id}
          item={item}
          contentFilter={contentFilter}
          onPress={() => onItemPress(item.id)}
          variant="slide"
        />
      ))}
    </ScrollView>
    
    <View className="flex-row justify-center items-center mt-4 gap-2">
      {items.map((_, index) => (
        <View 
          key={index}
          className={`h-2 rounded-full ${
            index === 0 ? 'w-6 bg-custom-green' : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </View>
  </View>
);