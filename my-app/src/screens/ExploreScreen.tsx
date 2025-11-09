import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useLanguage } from '../contexts/LanguageContext';
import { useExploreData } from '../hooks/useExploreData';
import { getRouteForItem } from '../utils/navigation';
import { CONTENT_FILTERS, SUB_FILTERS } from '../constants/explore';
import type { ContentFilterType } from '../types/explore';

import {
  FilterChip,
  SubFilterTab,
  ExploreCarousel,
  SuggestionsGrid,
  EmptyState,
} from '../components/explore';
import BottomTabBar from '../components/BottomTabBar';
import MenuSidebar from '../components/MenuSidebar';

export default function ExploreScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();
  
  const [contentFilter, setContentFilter] = useState<ContentFilterType>('cities');
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [menuVisible, setMenuVisible] = useState(false);

  const { slides, suggestions } = useExploreData(contentFilter, selectedCategory);

  const handleContentFilterChange = useCallback((filterId: ContentFilterType) => {
    setContentFilter(filterId);
    setSelectedCategory('popular');
  }, []);

  const handleItemPress = useCallback((itemId: number) => {
    const route = getRouteForItem(contentFilter, itemId);
    router.push(route);
  }, [contentFilter, router]);

  const activeSubFilters = SUB_FILTERS[contentFilter];

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="flex-1">
          
          {/* Header */}
          <View className="px-6 py-4 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={28} color="#000" />
            </TouchableOpacity>
            
            <Text className="text-2xl font-bold text-black">
              {t('discover') || 'Explore'}
            </Text>
            
            <TouchableOpacity className="p-2 -mr-2">
              <Ionicons name="search" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Filtres principaux */}
          <View className="px-6 py-4 bg-white border-b border-gray-100">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {CONTENT_FILTERS.map((filter) => (
                <FilterChip
                  key={filter.id}
                  label={t(filter.nameKey) || filter.nameKey}
                  icon={filter.icon}
                  isActive={contentFilter === filter.id}
                  onPress={() => handleContentFilterChange(filter.id as ContentFilterType)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Sous-filtres */}
          <View className="mb-4">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ 
                paddingHorizontal: 20,
                gap: 6
              }}
            >
              {activeSubFilters.map((tab) => (
                <SubFilterTab
                  key={tab.id}
                  label={t(tab.nameKey) || tab.nameKey}
                  isActive={selectedCategory === tab.id}
                  onPress={() => setSelectedCategory(tab.id)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Contenu scrollable */}
          <ScrollView 
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Carrousel */}
            <ExploreCarousel
              items={slides}
              contentFilter={contentFilter}
              onItemPress={handleItemPress}
            />

            {/* Section Suggestions */}
            <View className="px-6 mb-6">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <Ionicons name="search" size={20} color="#000" />
                  <Text className="text-xl font-bold text-black ml-2">
                    {t('suggestions') || 'Suggestions'}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-blue-600 text-sm font-semibold">
                    {t('viewAll') || 'Voir tout'}
                  </Text>
                </TouchableOpacity>
              </View>

              {suggestions.length > 0 ? (
                <SuggestionsGrid
                  items={suggestions}
                  contentFilter={contentFilter}
                  onItemPress={handleItemPress}
                />
              ) : (
                <EmptyState />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <MenuSidebar 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300">
        <SafeAreaView edges={['bottom']}>
          <BottomTabBar currentRoute={pathname} />
        </SafeAreaView>
      </View>
    </View>
  );
}