import React from 'react';
import { View, ScrollView } from 'react-native';
import { FilterChip } from '../explore';

interface Category {
  id: string;
  name: string;
}

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => (
  <View className="px-6 py-4 bg-white border-b border-gray-100">
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {categories.map((category) => (
        <FilterChip
          key={category.id}
          label={category.name}
          isActive={selectedCategory === category.id}
          onPress={() => onSelectCategory(category.id)}
        />
      ))}
    </ScrollView>
  </View>
);