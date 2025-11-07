// src/screens/ExploreScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar';
import Header from '../components/Header';
import MenuSidebar from '../components/MenuSidebar';

export default function ExploreScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuVisible, setMenuVisible] = useState(false);

  // Catégories de découverte
  const categories = [
    { id: 'all', name: t('all'), icon: 'grid' },
    { id: 'cities', name: t('cities'), icon: 'business' },
    { id: 'nature', name: t('nature'), icon: 'leaf' },
    { id: 'culture', name: t('culture'), icon: 'library' },
    { id: 'food', name: t('food'), icon: 'restaurant' },
  ];

  // Destinations populaires
  const destinations = [
    {
      id: 1,
      name: 'Marrakech',
      description: t('marrakechDesc'),
      image: 'https://images.unsplash.com/photo-1543418219-44e30b057ffe?w=400&h=300&fit=crop',
      category: 'cities',
      color: '#DC2626'
    },
    {
      id: 2,
      name: 'Chefchaouen',
      description: t('chefchaouenDesc'),
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop',
      category: 'cities',
      color: '#3B82F6'
    },
    {
      id: 3,
      name: 'Sahara Desert',
      description: t('saharaDesc'),
      image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=300&fit=crop',
      category: 'nature',
      color: '#F59E0B'
    },
    {
      id: 4,
      name: 'Atlas Mountains',
      description: t('atlasDesc'),
      image: 'https://images.unsplash.com/photo-1588497859490-85d1c17db96d?w=400&h=300&fit=crop',
      category: 'nature',
      color: '#10B981'
    },
    {
      id: 5,
      name: 'Fes Medina',
      description: t('fesDesc'),
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      category: 'culture',
      color: '#8B5CF6'
    },
    {
      id: 6,
      name: 'Moroccan Cuisine',
      description: t('cuisineDesc'),
      image: 'https://images.unsplash.com/photo-1551504731-1c5b6f12b16a?w=400&h=300&fit=crop',
      category: 'food',
      color: '#EC4899'
    },
  ];

  const filteredDestinations = selectedCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

 

  return (
    <View className="flex-1 bg-white">
      {/* Contenu principal */}
      <SafeAreaView className="flex-1" edges={['top']}>
        <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="flex-1">
          
          {/* Header */}
          <Header 
            title={t('explore')}
            subtitle={t('discoverMorocco')}
            showSearch={true}
            showMenu={true}
          />

          {/* Catégories */}
          <View className="mb-4">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ 
                paddingHorizontal: 24,
                gap: 6
              }}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  className={`px-5 py-3 border flex-row items-center ${
                    selectedCategory === category.id 
                      ? 'bg-black border-black rounded-full' 
                      : 'bg-white border-gray-300 rounded-full'
                  }`}
                >
                  <Ionicons 
                    name={category.icon} 
                    size={16} 
                    color={selectedCategory === category.id ? '#FFFFFF' : '#374151'} 
                  />
                  <Text 
                    className={`text-sm font-medium ml-2 uppercase tracking-wider ${
                      selectedCategory === category.id ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Destinations - FIX: paddingBottom pour éviter que la bottom bar cache le contenu */}
          <ScrollView 
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingHorizontal: 24,
              paddingBottom: 100, // ✅ Espace pour la bottom bar
              gap: 24 
            }}
          >
            {filteredDestinations.map((destination) => (
              <TouchableOpacity
                key={destination.id}
                className="bg-white border border-gray-300 overflow-hidden"
                onPress={() => router.push(`/destination/${destination.id}`)}
                activeOpacity={0.9}
              >
                {/* Image */}
                <View className="aspect-video bg-gray-200">
                  <Image
                    source={{ uri: destination.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                {/* Contenu */}
                <View className="p-5">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text 
                      className="text-2xl font-light text-black tracking-tight flex-1"
                      style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
                    >
                      {destination.name}
                    </Text>
                    <View 
                      className="w-3 h-3 rounded-full ml-3"
                      style={{ backgroundColor: destination.color }}
                    />
                  </View>
                  
                  <Text 
                    className="text-gray-600 text-base font-light leading-6 mb-4"
                    style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
                  >
                    {destination.description}
                  </Text>

                  {/* Lien Discover */}
                  <TouchableOpacity className="self-start">
                    <Text className="text-black text-sm font-medium uppercase tracking-widest underline">
                      {t('discover')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Menu Sidebar Fullscreen */}
      <MenuSidebar 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />

      {/* Navigation Barre en Bas - FIX: position absolue */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300">
        <SafeAreaView edges={['bottom']}>
          <BottomTabBar currentRoute={pathname} />
        </SafeAreaView>
      </View>
    </View>
  );
}

