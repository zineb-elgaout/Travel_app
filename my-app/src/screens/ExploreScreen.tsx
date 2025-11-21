import React, { useState, useCallback, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Modal, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, usePathname, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useLanguage } from '../contexts/LanguageContext';
import { useExploreData } from '../hooks/useExploreData';
import { getRouteForItem } from '../utils/navigation';
import { CONTENT_FILTERS, SUB_FILTERS } from '../constants/explore';
import { FULL_REGIONS } from '../constants/regions';
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

// Définition des onglets pour le détail
const DETAIL_TABS = [
  { id: 'information', label: 'Information' },
  { id: 'contact', label: 'Contact' },
  { id: 'ecotips', label: 'Ecotips' },
  { id: 'avis', label: 'Avis' },
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Videos' },
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
  const [detailTab, setDetailTab] = useState('information');
  
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Appel du hook avec regionKey
  const { slides, suggestions } = useExploreData(regionKey, contentFilter, selectedCategory);

  const handleContentFilterChange = useCallback((filterId: ContentFilterType) => {
    setContentFilter(filterId);
    setSelectedCategory('popular');
  }, []);

  const handleItemPress = useCallback((itemId: number) => {
    const item = [...slides, ...suggestions].find(i => i.id === itemId);
    if (item) {
      setSelectedItem(item);
      setDetailTab('information');
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

  // Fonction pour rendre le contenu du modal (style Zara)
  const renderDetailContent = () => {
    if (!selectedItem) return null;

    const renderCard = (title: string, content: any, icon: string) => (
      <View className="bg-white rounded-lg p-4 mb-4 border border-gray-100">
        <View className="flex-row items-center mb-2">
          <Ionicons name={icon} size={20} color="#1d4c4c" />
          <Text className="text-lg font-semibold text-gray-900 ml-2">{title}</Text>
        </View>
        {content}
      </View>
    );

    switch (detailTab) {
      case 'information':
        return renderCard(
          'Information',
          <Text className="text-gray-700 leading-6">
            {selectedItem.description || 'Description non disponible.'}
          </Text>,
          'information-circle-outline'
        );
      case 'contact':
        return renderCard(
          'Contact',
          <Text className="text-gray-700">
            {selectedItem.contact || 'Informations de contact non disponibles.'}
          </Text>,
          'call-outline'
        );
      case 'ecotips':
        return renderCard(
          'Ecotips',
          <Text className="text-gray-700 leading-6">
            {selectedItem.ecotips || 'Conseils écologiques non disponibles.'}
          </Text>,
          'leaf-outline'
        );
      case 'avis':
        return renderCard(
          'Avis',
          selectedItem.reviews?.length > 0 ? (
            selectedItem.reviews.map((review: any, index: number) => (
              <View key={index} className="flex-row items-start mb-3">
                <Ionicons name="star" size={16} color="#fbbf24" />
                <Text className="text-gray-700 ml-2 flex-1">{review}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">Aucun avis disponible.</Text>
          ),
          'star-outline'
        );
      case 'photos':
        return renderCard(
          'Photos',
          selectedItem.photos?.length > 0 ? (
            <View className="flex-row flex-wrap">
              {selectedItem.photos.map((photo: string, index: number) => (
                <Image
                  key={index}
                  source={{ uri: photo }}
                  className="w-20 h-20 m-1 rounded-lg"
                  resizeMode="cover"
                />
              ))}
            </View>
          ) : (
            <Text className="text-gray-500">Aucune photo disponible.</Text>
          ),
          'images-outline'
        );
      case 'videos':
        return renderCard(
          'Videos',
          selectedItem.videos?.length > 0 ? (
            selectedItem.videos.map((video: string, index: number) => (
              <View key={index} className="flex-row items-center mb-3">
                <Ionicons name="videocam" size={20} color="#1d4c4c" />
                <Text className="text-gray-700 ml-2">{video}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">Aucune vidéo disponible.</Text>
          ),
          'videocam-outline'
        );
      default:
        return <Text className="text-gray-500">Contenu non disponible.</Text>;
    }
  };

  const activeSubFilters = SUB_FILTERS[contentFilter];

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
              
              <View className="flex-1 mx-4">
                <Text className="text-2xl font-bold text-gray-900 text-center">
                  {regionName}
                </Text>
              </View>
            </View>
          </View>

          {/* Filtres principaux (style Zara : épuré, sans scroll, marges bien créées) */}
          <View className="px-6 py-4 bg-white border-b border-gray-100">
            <View className="flex-row flex-wrap gap-3">
              {CONTENT_FILTERS.map((filter) => (
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
          </View>

          {/* Sous-filtres (style Zara : épuré, sans scroll, marges bien créées) */}
          <View className="mb-4">
            <View className="flex-row flex-wrap gap-3 px-6 py-2">
              {activeSubFilters.map((tab) => (
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

      {/* Modal pour le détail (inspiré de Zara) */}
      <Modal
        visible={!!selectedItem}
        animationType="slide"
        onRequestClose={closeDetailModal}
        presentationStyle="fullScreen"
        transparent={false}
      >
        <SafeAreaView className="flex-1 bg-white">
          {/* Image en haut avec overlay */}
          <View className="relative">
            <Image
              source={{ uri: selectedItem?.image }}
              className="w-full h-80"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black bg-opacity-20" />
            <View className="absolute top-12 left-6 right-6 flex-row justify-between items-center">
              <Text className="text-white text-2xl font-bold shadow-lg">
                {selectedItem?.name}
              </Text>
              <TouchableOpacity
                onPress={closeDetailModal}
                className="w-10 h-10 bg-white bg-opacity-80 rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Onglets élégants */}
          <View className="bg-white border-b border-gray-100">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}
            >
              {DETAIL_TABS.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setDetailTab(tab.id)}
                  className="mr-8 pb-2"
                >
                  <Text
                    className={`text-sm font-medium ${
                      detailTab === tab.id ? 'text-[#1d4c4c]' : 'text-gray-500'
                    }`}
                  >
                    {tab.label}
                  </Text>
                  {detailTab === tab.id && (
                    <View className="h-0.5 bg-[#1d4c4c] mt-1 rounded-full" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Contenu dynamique */}
          <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
            <View className="p-6">
              {renderDetailContent()}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <MenuSidebar 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />
    </View>
  );
}
