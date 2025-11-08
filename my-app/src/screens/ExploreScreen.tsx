// src/screens/ExploreScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar';
import MenuSidebar from '../components/MenuSidebar';

export default function ExploreScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [menuVisible, setMenuVisible] = useState(false);
  const [contentFilter, setContentFilter] = useState('cities');

  // Filtres de contenu principaux avec icônes
  const contentFilters = [
    { id: 'cities', name: t('cities') || 'Villes', icon: 'business' },
    { id: 'crafts', name: t('crafts') || 'Artisanat', icon: 'color-palette' },
    { id: 'eco', name: t('eco') || 'Éco-responsable', icon: 'leaf' },
  ];

  // Sous-filtres pour chaque catégorie
  const citiesSubFilters = [
    { id: 'popular', name: t('popular') || 'Populaire' },
    { id: 'imperial', name: t('imperial') || 'Villes Impériales' },
    { id: 'coastal', name: t('coastal') || 'Côte Atlantique' },
    { id: 'mountain', name: t('mountain') || 'Montagnes' },
    { id: 'desert', name: t('desert') || 'Sahara' },
  ];

  const craftsSubFilters = [
    { id: 'popular', name: t('popular') || 'Populaire' },
    { id: 'textile', name: t('textile') || 'Textile' },
    { id: 'ceramic', name: t('ceramic') || 'Céramique' },
    { id: 'leather', name: t('leather') || 'Maroquinerie' },
    { id: 'jewelry', name: t('jewelry') || 'Bijouterie' },
  ];

  const ecoSubFilters = [
    { id: 'popular', name: t('popular') || 'Populaire' },
    { id: 'accommodation', name: t('accommodation') || 'Hébergement' },
    { id: 'agriculture', name: t('agriculture') || 'Agriculture' },
    { id: 'nature', name: t('nature') || 'Nature' },
    { id: 'sustainable', name: t('sustainable') || 'Durable' },
  ];

  // Obtenir les sous-filtres actifs selon le filtre de contenu
  const getActiveSubFilters = () => {
    switch (contentFilter) {
      case 'cities':
        return citiesSubFilters;
      case 'crafts':
        return craftsSubFilters;
      case 'eco':
        return ecoSubFilters;
      default:
        return citiesSubFilters;
    }
  };

  // Données pour chaque catégorie avec slides (les 4 plus populaires)
  const citiesSlides = [
    {
      id: 1,
      name: 'Marrakech',
      location: 'Marrakech-Safi',
      description: 'La Perle du Sud, ville impériale aux souks animés',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      rating: 4.8,
      isFavorite: true,
      type: 'cities',
      subType: 'imperial'
    },
    {
      id: 2,
      name: 'Chefchaouen',
      location: 'Tanger-Tétouan-Al Hoceïma',
      description: 'La Perle Bleue du Rif, ville aux ruelles azurées',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop',
      rating: 4.9,
      isFavorite: false,
      type: 'cities',
      subType: 'mountain'
    },
    {
      id: 3,
      name: 'Fès',
      location: 'Fès-Meknès',
      description: 'Capitale spirituelle et plus ancienne ville impériale',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      rating: 4.7,
      isFavorite: false,
      type: 'cities',
      subType: 'imperial'
    },
    {
      id: 4,
      name: 'Essaouira',
      location: 'Marrakech-Safi',
      description: 'Ville côtière fortifiée aux alizés permanents',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      rating: 4.6,
      isFavorite: true,
      type: 'cities',
      subType: 'coastal'
    },
  ];

  const craftsSlides = [
    {
      id: 9,
      name: 'Poterie de Safi',
      location: 'Safi',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Céramique traditionnelle bleue',
      category: 'Céramique',
      type: 'crafts',
      subType: 'ceramic'
    },
    {
      id: 10,
      name: 'Tapis Berbères',
      location: 'Moyen Atlas',
      rating: 4.8,
      image: 'https://tse4.mm.bing.net/th/id/OIP.G2p_2zcrDK7OeUi7Pfpm3gHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
      isFavorite: false,
      description: 'Tissage artisanal ancestral',
      category: 'Textile',
      type: 'crafts',
      subType: 'textile'
    },
    {
      id: 11,
      name: 'Cuir de Fès',
      location: 'Fès',
      rating: 4.6,
      image: 'https://tse4.mm.bing.net/th/id/OIP.F2xQ8YmfAloC-nB4Mbag8AHaEx?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
      isFavorite: false,
      description: 'Tanneries traditionnelles',
      category: 'Maroquinerie',
      type: 'crafts',
      subType: 'leather'
    },
    {
      id: 12,
      name: 'Argenterie de Tiznit',
      location: 'Tiznit',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Bijoux berbères en argent',
      category: 'Bijouterie',
      type: 'crafts',
      subType: 'jewelry'
    },
  ];

  const ecoSlides = [
    {
      id: 13,
      name: 'Randonnée Atlas',
      location: 'Haut Atlas',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Trekking écologique en montagne',
      category: 'Nature',
      type: 'eco',
      subType: 'nature'
    },
    {
      id: 14,
      name: 'Coopérative Argan',
      location: 'Essaouira',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Production durable d\'huile d\'argan',
      category: 'Agriculture',
      type: 'eco',
      subType: 'agriculture'
    },
    {
      id: 15,
      name: 'Éco-lodge Sahara',
      location: 'Merzouga',
      rating: 4.8,
      image: 'https://www.ecolodge-palmeraie-ouarzazate.com/wp/wp-content/uploads/2024/05/ECOLODGE-PALMERAIE-OUARZAZATE-MAROC-LODGE-AFRICAIN-1030x686.jpg',
      isFavorite: false,
      description: 'Hébergement solaire dans le désert',
      category: 'Hébergement',
      type: 'eco',
      subType: 'accommodation'
    },
    {
      id: 16,
      name: 'Jardins Bio Ourika',
      location: 'Vallée de l\'Ourika',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Permaculture et plantes médicinales',
      category: 'Agriculture',
      type: 'eco',
      subType: 'agriculture'
    },
  ];

  // Données pour les suggestions par catégorie
  const citiesSuggestions = [
    {
      id: 5,
      name: 'Casablanca',
      location: 'Casablanca-Settat',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      isFavorite: false,
      description: 'Capitale économique et Hassan II',
      type: 'cities',
      subType: 'coastal'
    },
    {
      id: 6,
      name: 'Meknès',
      location: 'Fès-Meknès',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1624571395775-253d9666612b?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Ville impériale de Moulay Ismail',
      type: 'cities',
      subType: 'imperial'
    },
    {
      id: 7,
      name: 'Agadir',
      location: 'Souss-Massa',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Station balnéaire sur l\'Atlantique',
      type: 'cities',
      subType: 'coastal'
    },
    {
      id: 8,
      name: 'Tanger',
      location: 'Tanger-Tétouan-Al Hoceïma',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Porte de l\'Afrique sur le détroit',
      type: 'cities',
      subType: 'coastal'
    },
  ];

  const craftsSuggestions = [
    {
      id: 17,
      name: 'Bois Sculpté',
      location: 'Meknès',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Sculpture sur bois traditionnelle',
      category: 'Bois',
      type: 'crafts',
      subType: 'wood'
    },
    {
      id: 18,
      name: 'Broderie Fassi',
      location: 'Fès',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Broderie traditionnelle de Fès',
      category: 'Textile',
      type: 'crafts',
      subType: 'textile'
    },
    {
      id: 19,
      name: 'Zellige Artisanal',
      location: 'Fès',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1581539251075-5c9c55e18c9b?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Mosaïque traditionnelle marocaine',
      category: 'Céramique',
      type: 'crafts',
      subType: 'ceramic'
    },
    {
      id: 20,
      name: 'Cuir Tanné',
      location: 'Marrakech',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Cuir traditionnel des tanneries',
      category: 'Maroquinerie',
      type: 'crafts',
      subType: 'leather'
    },
  ];

  const ecoSuggestions = [
    {
      id: 21,
      name: 'Tourisme Solidaire',
      location: 'Anti-Atlas',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Voyage responsable avec les communautés',
      category: 'Solidaire',
      type: 'eco',
      subType: 'sustainable'
    },
    {
      id: 22,
      name: 'Éco-Randonnée',
      location: 'Rif',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Randonnée écologique préservant la nature',
      category: 'Nature',
      type: 'eco',
      subType: 'nature'
    },
    {
      id: 23,
      name: 'Ferme Biologique',
      location: 'Souss',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Agriculture biologique et durable',
      category: 'Agriculture',
      type: 'eco',
      subType: 'agriculture'
    },
    {
      id: 24,
      name: 'Campement Éco',
      location: 'Zagora',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Hébergement écologique dans le désert',
      category: 'Hébergement',
      type: 'eco',
      subType: 'accommodation'
    },
  ];

  // Obtenir les slides selon le filtre de contenu (toujours les 4 plus populaires)
  const getActiveSlides = () => {
    switch (contentFilter) {
      case 'cities':
        return citiesSlides;
      case 'crafts':
        return craftsSlides;
      case 'eco':
        return ecoSlides;
      default:
        return citiesSlides;
    }
  };

  // Obtenir les suggestions selon le filtre de contenu
  const getActiveSuggestions = () => {
    switch (contentFilter) {
      case 'cities':
        return citiesSuggestions;
      case 'crafts':
        return craftsSuggestions;
      case 'eco':
        return ecoSuggestions;
      default:
        return citiesSuggestions;
    }
  };

  // Filtrer les données selon le contenu et la sous-catégorie sélectionnés
  const getFilteredData = () => {
    const currentData = getActiveSuggestions();
    
    if (selectedCategory === 'popular') {
      return currentData;
    }
    
    return currentData.filter(item => item.subType === selectedCategory);
  };

  const filteredData = getFilteredData();
  const activeSlides = getActiveSlides();
  const activeSuggestions = getActiveSuggestions();

  return (
    <View className="flex-1 bg-white">
      {/* Contenu principal */}
      <SafeAreaView className="flex-1" edges={['top']}>
        <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="flex-1">
          
          {/* Header simplifié */}
          <View className="px-6 py-4 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={28} color="#000" />
            </TouchableOpacity>
            
            <Text className="text-2xl font-bold text-black">
              {t('discover') || 'Discover'}
            </Text>
            
            <TouchableOpacity>
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
                <Ionicons name="person" size={20} color="#3B82F6" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Filtres de contenu principaux - Alignés à gauche */}
          <View className="px-6 mb-2 ">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ 
                gap: 6,
                paddingRight: 24
              }}
            >
              {contentFilters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  onPress={() => {
                    setContentFilter(filter.id);
                    setSelectedCategory('popular');
                  }}
                  className={`flex-row items-center px-4 py-2 rounded-full border-2 ${
                    contentFilter === filter.id 
                      ? 'bg-black border-black' 
                      : 'bg-white border-gray-300 '
                  }`}
                >
                  <Ionicons 
                    name={filter.icon} 
                    size={18} 
                    color={contentFilter === filter.id ? "white" : "gray"} 
                  />
                  <Text 
                    className={`ml-1 text-sm font-medium ${
                      contentFilter === filter.id ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Sous-filtres selon la catégorie principale - Taille augmentée */}
          <View className="mb-4">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ 
                paddingHorizontal: 20,
                gap: 6
              }}
            >
              {getActiveSubFilters().map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setSelectedCategory(tab.id)}
                  className={`px-2 py-3 ml-1 ${
                    selectedCategory === tab.id 
                      ? ' border-b-2 rounded-l border-indigo-200' 
                      : ' '
                  }`}
                >
                  <Text 
                    className={`text-base font-medium ${
                      selectedCategory === tab.id ? 'text-black' : 'text-gray-600'
                    }`}
                  >
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Contenu principal */}
          <ScrollView 
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingBottom: 100,
            }}
          >
            {/* Carrousel pour toutes les catégories - Taille réduite */}
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
                {activeSlides.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="w-72 rounded-3xl overflow-hidden bg-white shadow-lg"
                    onPress={() => {
                      const route = contentFilter === 'cities' 
                        ? `/destination/${item.id}`
                        : contentFilter === 'crafts'
                        ? `/craft/${item.id}`
                        : `/eco/${item.id}`;
                      router.push(route);
                    }}
                    activeOpacity={0.9}
                  >
                    <View className="relative">
                      <Image
                        source={{ uri: item.image }}
                        className="w-full h-56"
                        resizeMode="cover"
                      />
                      
                      {/* Overlay gradient */}
                      <View className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Badge catégorie pour crafts et eco */}
                      {(contentFilter === 'crafts' || contentFilter === 'eco') && (
                        <View className={`absolute top-4 left-4 px-3 py-1 rounded-full ${
                          contentFilter === 'crafts' ? 'bg-amber-600' : 'bg-green-600'
                        }`}>
                          <Text className="text-white text-xs font-semibold">
                            {item.category}
                          </Text>
                        </View>
                      )}
                      
                      {/* Badge favori */}
                      <TouchableOpacity 
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white items-center justify-center shadow-lg"
                      >
                        <Ionicons 
                          name={item.isFavorite ? "heart" : "heart-outline"} 
                          size={20} 
                          color={item.isFavorite ? "#EC4899" : "#6B7280"} 
                        />
                      </TouchableOpacity>
                      
                      {/* Informations */}
                      <View className="absolute bottom-0 left-0 right-0 p-5">
                        <View className="flex-row items-center mb-2">
                          <Ionicons name="location" size={16} color="#FFF" />
                          <Text className="text-white text-sm ml-1 font-medium">
                            {item.location}
                          </Text>
                        </View>
                        
                        <Text className="text-white text-xl font-bold mb-1">
                          {item.name}
                        </Text>
                        
                        <Text className="text-white/80 text-sm mb-2">
                          {item.description}
                        </Text>
                        
                        <View className="flex-row items-center">
                          <Ionicons name="star" size={16} color="#FBBF24" />
                          <Text className="text-white text-base ml-1 font-semibold">
                            {item.rating}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              {/* Indicateurs de pagination */}
              <View className="flex-row justify-center items-center mt-4 gap-2">
                {activeSlides.map((_, index) => (
                  <View 
                    key={index}
                    className={`h-2 rounded-full ${
                      index === 0 ? 'w-6 bg-black' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </View>
            </View>

            {/* Section Suggestions avec icône de recherche */}
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

              {/* Grille de suggestions filtrées par catégorie */}
              <View className="flex-row flex-wrap gap-4">
                {filteredData.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="rounded-2xl overflow-hidden bg-white shadow-md"
                    style={{ width: '47%' }}
                    onPress={() => {
                      const route = contentFilter === 'cities' 
                        ? `/destination/${item.id}`
                        : contentFilter === 'crafts'
                        ? `/craft/${item.id}`
                        : `/eco/${item.id}`;
                      router.push(route);
                    }}
                    activeOpacity={0.9}
                  >
                    <View className="relative">
                      <Image
                        source={{ uri: item.image }}
                        className="w-full h-48"
                        resizeMode="cover"
                      />
                      
                      {/* Badge catégorie */}
                      {(contentFilter === 'crafts' || contentFilter === 'eco') && (
                        <View className={`absolute top-3 left-3 px-2 py-1 rounded-full ${
                          contentFilter === 'crafts' ? 'bg-amber-600' : 'bg-green-600'
                        }`}>
                          <Text className="text-white text-xs font-semibold">
                            {item.category}
                          </Text>
                        </View>
                      )}
                      
                      {/* Overlay gradient */}
                      <View className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Badge favori */}
                      <TouchableOpacity 
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 items-center justify-center"
                      >
                        <Ionicons 
                          name={item.isFavorite ? "heart" : "heart-outline"} 
                          size={16} 
                          color={item.isFavorite ? "#EC4899" : "#6B7280"} 
                        />
                      </TouchableOpacity>
                      
                      {/* Informations */}
                      <View className="absolute bottom-0 left-0 right-0 p-3">
                        <Text className="text-white text-base font-bold mb-1" numberOfLines={1}>
                          {item.name}
                        </Text>
                        
                        <Text className="text-white/70 text-xs mb-2" numberOfLines={1}>
                          {item.description}
                        </Text>
                        
                        <View className="flex-row items-center">
                          <Ionicons name="star" size={12} color="#FBBF24" />
                          <Text className="text-white text-sm ml-1 font-medium">
                            {item.rating}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Message si aucun résultat */}
              {filteredData.length === 0 && (
                <View className="py-8 items-center">
                  <Ionicons name="search-outline" size={48} color="#9CA3AF" />
                  <Text className="text-gray-500 text-lg mt-2">
                    Aucun résultat trouvé
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Menu Sidebar Fullscreen */}
      <MenuSidebar 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />

      {/* Navigation Barre en Bas */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300">
        <SafeAreaView edges={['bottom']}>
          <BottomTabBar currentRoute={pathname} />
        </SafeAreaView>
      </View>
    </View>
  );
}