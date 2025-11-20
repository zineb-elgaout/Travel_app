import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';

import { useFavorites } from '../hooks/useFavorites';
import { getRouteForItem } from '../utils/navigation';
import { FAVORITE_CATEGORIES } from '../constants/favorites';

import {
  FavoritesGrid,
  EmptyFavorites,
  FavoritesHeader,
  CategoryFilters,
} from '../components/favorites';
import BottomTabBar from '../components/BottomTabBar';
import MenuSidebar from '../components/MenuSidebar';

export default function FavoritesScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const { favorites, removeFavorite, totalCount } = useFavorites(filterCategory);

  const categories = FAVORITE_CATEGORIES.map(cat => ({
    id: cat.id,
    name: t(cat.nameKey) || cat.nameKey,
  }));

  const handleItemPress = useCallback((itemId: number) => {
    const item = favorites.find(f => f.id === itemId);
    if (item) {
      const route = getRouteForItem(item.type, itemId);
      router.push(route);
    }
  }, [favorites, router]);

  const handleToggleFavorite = useCallback((itemId: number) => {
    removeFavorite(itemId);
  }, [removeFavorite]);

  const handleExplore = useCallback(() => {
    router.push('/explore');
  }, [router]);

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="flex-1">
          
          {/* Header */}
          <FavoritesHeader
            count={totalCount}
            onMenuPress={() => setMenuVisible(true)}
            onSearchPress={() => {/* Implémenter recherche */}}
          />

          {/* Filtres */}
          <CategoryFilters
            categories={categories}
            selectedCategory={filterCategory}
            onSelectCategory={setFilterCategory}
          />

          {/* Liste des favoris */}
          <ScrollView 
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {favorites.length > 0 ? (
              <View className="px-6 py-6">
                <FavoritesGrid
                  items={favorites}
                  onItemPress={handleItemPress}
                  onToggleFavorite={handleToggleFavorite}
                />
              </View>
            ) : (
              <EmptyFavorites onExplore={handleExplore} />
            )}
          </ScrollView>
        </View>
      </SafeAreaView>

      <MenuSidebar visible={menuVisible} onClose={() => setMenuVisible(false)} />

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <SafeAreaView edges={['bottom']}>
          <BottomTabBar currentRoute={pathname} />
        </SafeAreaView>
      </View>
    </View>
  );
}