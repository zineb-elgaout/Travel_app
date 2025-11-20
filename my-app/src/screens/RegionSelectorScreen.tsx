import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header, RegionCard, EmptyRegion } from '../components/explore/index';
import { useRegions } from '../hooks/useRegions';
import BottomTabBar from '../components/BottomTabBar';
import MenuSidebar from '../components/MenuSidebar';

const { width } = Dimensions.get('window');

const carouselData = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/30574975/pexels-photo-30574975.jpeg',
    title: 'Welcome to MoroccoExplore',
    subtitle: 'Discover the magic of Morocco'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/4502973/pexels-photo-4502973.jpeg',
    title: 'Explore Ancient Cities',
    subtitle: 'From Marrakech to Fes'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/12214734/pexels-photo-12214734.jpeg',
    title: 'Desert Adventures',
    subtitle: 'Experience the Sahara'
  }
];

export default function RegionSelectorScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);

  const { filteredRegions } = useRegions(searchQuery);

  const handleScroll = (event) => {
    const slideSize = width - 40;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideSize);
    setActiveSlide(index);
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
        >
          {/* HEADER - Icône de notifications au lieu de recherche */}
          <View className="px-5 pt-4 pb-3 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="reorder-three-outline" size={28} color="#1d4c4c" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {/* Logique pour notifications */}}>
              <Ionicons name="notifications-outline" size={24} color="#1d4c4c" />
            </TouchableOpacity>
          </View>

          {/* TEXTE DE BIENVENUE */}
          <View className="px-5 mb-4">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenue sur MoroccoExplore
            </Text>
            <Text className="text-lg text-gray-600">
              Découvrez la magie du Maroc
            </Text>
          </View>

          {/* SEARCH BAR - Toujours affichée */}
          <View className="px-5 mb-4">
            <View className="bg-gray-100 rounded-full px-4 py-3 flex-row items-center">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-base"
                placeholder="Rechercher une région..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={false} // Pas d'autoFocus par défaut
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* CAROUSEL - Conditionnel (caché si recherche active) */}
          {!searchQuery && (
            <View className="mb-6 mt-4">
              <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={width - 40}
                contentContainerStyle={{ paddingHorizontal: 8 }}
              >
                {carouselData.map((item) => (
                  <View
                    key={item.id}
                    style={{ width: width - 40, marginRight: 0 }}
                    className="rounded-2xl overflow-hidden shadow-lg ml-4"
                  >
                    <Image
                      source={{ uri: item.image }}
                      className="w-full h-64"
                      resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-black/40 justify-end p-5">
                      <Text className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia' }}>
                        {item.title}
                      </Text>
                      <Text className="text-base text-white/90">
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* DOTS INDICATOR */}
              <View className="flex-row justify-center mt-4">
                {carouselData.map((_, index) => (
                  <View
                    key={index}
                    className="h-2 rounded-full mx-1"
                    style={{
                      width: activeSlide === index ? 20 : 8,
                      backgroundColor: activeSlide === index ? '#1d4c4c' : '#ccc'
                    }}
                  />
                ))}
              </View>
            </View>
          )}

          {/* ALL REGIONS - Toujours affiché, filtré si recherche */}
          <View className="px-5">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Toutes les régions
            </Text>

            {filteredRegions.length > 0 ? (
              filteredRegions.map((region) => (
                <RegionCard key={region.id} region={region} />
              ))
            ) : (
              <EmptyRegion />
            )}
          </View>
        </ScrollView>

        {/* MENU */}
        <MenuSidebar visible={menuVisible} onClose={() => setMenuVisible(false)} />

        {/* FOOTER */}
        <BottomTabBar currentRoute="/explore" />
      </SafeAreaView>
    </View>
  );
}
