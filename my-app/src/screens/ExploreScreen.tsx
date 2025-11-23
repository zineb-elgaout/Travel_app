import React, { useState, useCallback, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Modal, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, usePathname, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useLanguage } from '../contexts/LanguageContext';
import { useExploreData } from '../hooks/useExploreData';
import { CONTENT_FILTERS, SUB_FILTERS } from '../constants/explore';
import { FULL_REGIONS } from '../constants/regions';
import type { ContentFilterType, DetailTabType } from '../types/explore';

import {
  FilterChip,
  SubFilterTab,
  ExploreCarousel,
  SuggestionsGrid,
  EmptyState,
} from '../components/explore';
import DetailContent from '../components/explore/DetailContent';
import MenuSidebar from '../components/MenuSidebar';

// Définition des onglets pour le détail
const DETAIL_TABS: { id: DetailTabType; label: string }[] = [
  { id: 'information', label: 'About' },
  { id: 'avis', label: 'Review' },
  { id: 'photos', label: 'Photo' },
  { id: 'videos', label: 'Video' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams();
  const { t, isRTL } = useLanguage();
  
  // Récupérer le nom de la région depuis les paramètres
  const regionId = params.regionId as string;
  const currentRegion = FULL_REGIONS.find(r => r.id === regionId);
  const regionName = currentRegion?.name || t('discover') || 'Explorer';
  
  // Clé de région pour les données
  const regionKey = currentRegion?.name || 'Tanger-Tétouan-Al Hoceïma';
  
  const [contentFilter, setContentFilter] = useState<ContentFilterType>('cities');
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [menuVisible, setMenuVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // États pour le modal de détail
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [detailTab, setDetailTab] = useState<DetailTabType>('information');
  const [isFavorite, setIsFavorite] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Appel du hook avec regionKey
  const { slides, suggestions } = useExploreData(regionKey, contentFilter, selectedCategory);

  const availableContentFilters = CONTENT_FILTERS; 

  const handleContentFilterChange = useCallback((filterId: ContentFilterType) => {
    setContentFilter(filterId);
    setSelectedCategory('popular');
  }, []);

  const handleItemPress = useCallback((itemId: number) => {
    const item = [...slides, ...suggestions].find(i => i.id === itemId);
    if (item) {
      setSelectedItem(item);
      setDetailTab('information');
      setIsFavorite(item.isFavorite || false);
    }
  }, [slides, suggestions]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 300);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const closeDetailModal = () => {
    setSelectedItem(null);
  };

  const activeSubFilters = SUB_FILTERS[contentFilter];
  const availableSubFilters = activeSubFilters; 

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="flex-1">
          
          {/* Header */}
          <View className="px-6 py-4 bg-white border-b border-gray-100">
            <View className="flex-row items-center justify-between mb-3">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="p-2 -ml-2 rounded-full bg-gray-100"
              >
                <Ionicons name="arrow-back" size={24} color="#1d4c4c" />
              </TouchableOpacity>
              
              <View className="flex-1 mx-2">
                <Text className="text-xl font-bold text-gray-900 text-center">
                  {regionName}
                </Text>
              </View>
            </View>
          </View>

          {/* Filtres principaux (scrollable horizontalement) */}
          <View className="py-4 bg-white border-b border-gray-100">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              <View className="flex-row gap-3">
                {availableContentFilters.map((filter) => (
                  <TouchableOpacity
                    key={filter.id}
                    onPress={() => handleContentFilterChange(filter.id as ContentFilterType)}
                    className={`px-4 py-2 rounded-full border ${
                      contentFilter === filter.id
                        ? 'bg-[#1d4c4c] border-[#1d4c4c]'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons
                        name={filter.icon}
                        size={16}
                        color={contentFilter === filter.id ? 'white' : '#6B7280'}
                      />
                      <Text
                        className={`ml-2 text-sm font-medium ${
                          contentFilter === filter.id ? 'text-white' : 'text-gray-700'
                        }`}
                      >
                        {t(filter.nameKey) || filter.nameKey}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Sous-filtres (scrollable horizontalement) */}
          <View className="mb-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8 }}
            >
              <View className="flex-row gap-3">
                {availableSubFilters.map((tab) => (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => setSelectedCategory(tab.id)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedCategory === tab.id
                        ? 'bg-[#1d4c4c] border-[#1d4c4c]'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        selectedCategory === tab.id ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {t(tab.nameKey) || tab.nameKey}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Contenu scrollable */}
          <ScrollView 
            ref={scrollViewRef}
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
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

          {/* Bouton retour en haut */}
          {showScrollTop && (
            <TouchableOpacity
              onPress={scrollToTop}
              className="absolute bottom-28 right-6 w-14 h-14 bg-[#1d4c4c] rounded-full items-center justify-center"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Ionicons name="arrow-up" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      {/* Modal pour le détail - Design moderne comme l'image */}
      <Modal
        visible={!!selectedItem}
        animationType="slide"
        transparent={false}
        onRequestClose={closeDetailModal}
      >
        <View className="flex-1 bg-white">
          {/* Header avec image */}
          <View className="relative h-64">
            <Image
              source={{ uri: selectedItem?.image || 'https://via.placeholder.com/800' }}
              className="w-full h-full"
              resizeMode="cover"
            />
            
            {/* Boutons de navigation */}
            <View className="absolute top-12 left-0 right-0 flex-row justify-between px-4">
              <TouchableOpacity
                onPress={closeDetailModal}
                className="bg-white/90 p-2.5 rounded-full shadow-lg"
              >
                <Ionicons name="chevron-back" size={24} color="#1f2937" />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setIsFavorite(!isFavorite)}
                className="bg-white/90 p-2.5 rounded-full shadow-lg"
              >
                <Ionicons 
                  name={isFavorite ? "heart" : "heart-outline"} 
                  size={24} 
                  color={isFavorite ? "#ef4444" : "#1f2937"} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Contenu */}
          <View className="flex-1 px-5 pt-5">
            {/* Titre et infos */}
            <View className="mb-4">
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                {selectedItem?.name || 'Titre'}
              </Text>
              
              <View className="flex-row items-center mb-2">
                <Ionicons name="location" size={16} color="#ef4444" />
                <Text className="text-gray-600 text-sm ml-2">
                  {selectedItem?.location || 'Location'}
                </Text>
              </View>
              
              <View className="flex-row items-center">
                <Text className="text-lg font-semibold text-gray-900 mr-2">
                  {selectedItem?.rating || '4.8'}
                </Text>
                {[...Array(5)].map((_, i) => (
                  <Ionicons key={i} name="star" size={16} color="#fbbf24" />
                ))}
              </View>
            </View>

            {/* Tabs */}
            <View className="flex-row border-b border-gray-200 mb-4">
              {DETAIL_TABS.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setDetailTab(tab.id)}
                  className="flex-1 pb-3 relative"
                >
                  <Text
                    className={`text-center text-sm font-medium ${
                      detailTab === tab.id ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {tab.label}
                  </Text>
                  {detailTab === tab.id && (
                    <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Contenu scrollable */}
            <ScrollView 
              className="flex-1 -mx-5"
              showsVerticalScrollIndicator={false}
            >
              <DetailContent selectedItem={selectedItem} detailTab={detailTab} />
            </ScrollView>

            {/* Bouton Save Trip */}
            <View className="py-5">
              <TouchableOpacity 
                className="bg-pink-500 py-4 rounded-full shadow-lg"
                activeOpacity={0.8}
              >
                <Text className="text-white text-center font-semibold text-base">
                  Save a Trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <MenuSidebar 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />
    </View>
  );
}