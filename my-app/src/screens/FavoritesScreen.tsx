// src/screens/FavoritesScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar';
import MenuSidebar from '../components/MenuSidebar';

export default function FavoritesScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();
  const [menuVisible, setMenuVisible] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  // Filtres de catégories
  const categories = [
    { id: 'all', name: t('all') || 'Tout' },
    { id: 'cities', name: t('cities') || 'Villes' },
    { id: 'crafts', name: t('crafts') || 'Artisanat' },
    { id: 'eco', name: t('eco') || 'Éco' },
  ];

  // Favoris mockés
  const favorites = [
    {
      id: 1,
      name: 'Marrakech',
      location: 'Marrakech-Safi',
      image: 'https://images.unsplash.com/photo-1543418219-44e30b057ffe?w=600&h=400&fit=crop',
      rating: 4.8,
      category: 'cities',
      type: 'Ville impériale',
      saved: '2 jours'
    },
    {
      id: 2,
      name: 'Chefchaouen',
      location: 'Tanger-Tétouan',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop',
      rating: 4.9,
      category: 'cities',
      type: 'Ville bleue',
      saved: '1 semaine'
    },
    {
      id: 3,
      name: 'Poterie de Safi',
      location: 'Safi',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop',
      rating: 4.7,
      category: 'crafts',
      type: 'Céramique',
      saved: '3 jours'
    },
    {
      id: 4,
      name: 'Éco-lodge Sahara',
      location: 'Merzouga',
      image: 'https://www.ecolodge-palmeraie-ouarzazate.com/wp/wp-content/uploads/2024/05/ECOLODGE-PALMERAIE-OUARZAZATE-MAROC-LODGE-AFRICAIN-1030x686.jpg',
      rating: 4.8,
      category: 'eco',
      type: 'Hébergement',
      saved: '5 jours'
    },
    {
      id: 5,
      name: 'Tapis Berbères',
      location: 'Moyen Atlas',
      image: 'https://tse4.mm.bing.net/th/id/OIP.G2p_2zcrDK7OeUi7Pfpm3gHaHa?w=400&h=300&fit=crop',
      rating: 4.8,
      category: 'crafts',
      type: 'Textile',
      saved: '1 jour'
    },
    {
      id: 6,
      name: 'Essaouira',
      location: 'Marrakech-Safi',
      image: 'https://images.unsplash.com/photo-1570618424309-38b4ff52c558?w=600&h=400&fit=crop',
      rating: 4.6,
      category: 'cities',
      type: 'Ville côtière',
      saved: '2 semaines'
    },
  ];

  // Filtrer les favoris
  const filteredFavorites = filterCategory === 'all' 
    ? favorites 
    : favorites.filter(item => item.category === filterCategory);

  // Fonction pour retirer des favoris
  const handleRemoveFavorite = (id: number) => {
    console.log('Retirer favori:', id);
    // Logique de suppression à implémenter
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="flex-1">
          
          {/* Header */}
          <View className="px-6 py-4 bg-white border-b border-gray-100">
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity onPress={() => setMenuVisible(true)} className="p-2 -ml-2">
                <Ionicons name="menu" size={26} color="#000" />
              </TouchableOpacity>
              
              <Text className="text-xl font-semibold text-black tracking-tight">
                MES FAVORIS
              </Text>
              
              <TouchableOpacity className="p-2 -mr-2">
                <Ionicons name="search" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Compteur */}
            <View className="flex-row items-center">
              <Ionicons name="heart" size={18} color="#EF4444" />
              <Text className="text-gray-600 text-sm ml-2">
                {filteredFavorites.length} {filteredFavorites.length > 1 ? 'destinations sauvegardées' : 'destination sauvegardée'}
              </Text>
            </View>
          </View>

          {/* Filtres de catégories */}
          <View className="px-6 py-4 bg-white border-b border-gray-100">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setFilterCategory(category.id)}
                  className={`px-5 py-2 rounded-full ${
                    filterCategory === category.id 
                      ? 'bg-black' 
                      : 'bg-gray-100'
                  }`}
                >
                  <Text 
                    className={`text-sm font-medium ${
                      filterCategory === category.id ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Liste des favoris */}
          <ScrollView 
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {filteredFavorites.length > 0 ? (
              <View className="px-6 py-6">
                {/* Grille 2 colonnes */}
                <View className="flex-row flex-wrap gap-3">
                  {filteredFavorites.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      className="bg-white rounded-lg overflow-hidden"
                      style={{ width: '48%' }}
                      onPress={() => {
                        const route = item.category === 'cities' 
                          ? `/destination/${item.id}`
                          : item.category === 'crafts'
                          ? `/craft/${item.id}`
                          : `/eco/${item.id}`;
                        router.push(route);
                      }}
                      activeOpacity={0.8}
                    >
                      <View className="relative">
                        {/* Image */}
                        <Image
                          source={{ uri: item.image }}
                          className="w-full h-48 bg-gray-200"
                          resizeMode="cover"
                        />
                        
                        {/* Badge type */}
                        <View className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-full">
                          <Text className="text-black text-xs font-medium">
                            {item.type}
                          </Text>
                        </View>

                        {/* Bouton favori */}
                        <TouchableOpacity 
                          className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full items-center justify-center"
                          onPress={() => handleRemoveFavorite(item.id)}
                        >
                          <Ionicons name="heart" size={18} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      {/* Informations */}
                      <View className="p-3">
                        <Text className="text-black text-sm font-semibold mb-1" numberOfLines={1}>
                          {item.name}
                        </Text>
                        
                        <View className="flex-row items-center mb-2">
                          <Ionicons name="location-outline" size={12} color="#9CA3AF" />
                          <Text className="text-gray-500 text-xs ml-1 flex-1" numberOfLines={1}>
                            {item.location}
                          </Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <Ionicons name="star" size={12} color="#FBBF24" />
                            <Text className="text-gray-700 text-xs ml-1 font-medium">
                              {item.rating}
                            </Text>
                          </View>
                          
                          <View className="flex-row items-center">
                            <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                            <Text className="text-gray-400 text-xs ml-1">
                              {item.saved}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              // État vide
              <View className="flex-1 items-center justify-center py-20">
                <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-4">
                  <Ionicons name="heart-outline" size={48} color="#D1D5DB" />
                </View>
                <Text className="text-gray-900 text-lg font-semibold mb-2">
                  Aucun favori
                </Text>
                <Text className="text-gray-500 text-sm text-center px-8 mb-6">
                  Explorez et ajoutez vos destinations préférées à vos favoris
                </Text>
                <TouchableOpacity 
                  className="bg-black px-6 py-3 rounded-full"
                  onPress={() => router.push('/explore')}
                >
                  <Text className="text-white text-sm font-medium">
                    Explorer maintenant
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Menu Sidebar */}
      <MenuSidebar visible={menuVisible} onClose={() => setMenuVisible(false)} />

      {/* Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <SafeAreaView edges={['bottom']}>
          <BottomTabBar currentRoute={pathname} />
        </SafeAreaView>
      </View>
    </View>
  );
}