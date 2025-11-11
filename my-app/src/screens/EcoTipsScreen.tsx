// app/ecotips.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import BottomTabBar from '../components/BottomTabBar';
import { LinearGradient } from 'expo-linear-gradient';
import { ecoTipsData, EcoTip, EcoTipsSection } from '../constants/ecotips';

export default function EcoTipsScreen() {
  const { currentLanguage, isRTL } = useLanguage();
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedTip, setSelectedTip] = useState<EcoTip | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const data = ecoTipsData[currentLanguage] || ecoTipsData.en;

  const renderCategoryCard = (category: EcoTip, sectionIndex: number, cardIndex: number) => {
    // Animation améliorée pour éviter la disparition des images
    const base = (170 * sectionIndex) + (280 * cardIndex);
    const start = Math.max(base, 0);
    const end = start + 280;
    const inputRange = [-1, 0, start, end];

    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [0, 0, 0, 0],
      extrapolate: 'clamp',
    });

    const opA = -50;
    const opB = 0;
    const opC = Math.max(100 * sectionIndex - 50, opB);
    const opD = Math.max(100 * sectionIndex, opC);
    const opE = Math.max(100 * sectionIndex + 50, opD);

    const opacity = scrollY.interpolate({
      inputRange: [opA, opB, opC, opD, opE],
      outputRange: [1, 1, 1, 1, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={category.id}
        style={{
          transform: [{ translateY }],
          opacity,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedTip(category)}
          className="w-64 h-80 rounded-2xl overflow-hidden bg-gray-100 mr-4 shadow-lg shadow-black/10"
        >
          <Image
            source={{ uri: category.image }}
            className="w-full h-full absolute"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            className="absolute bottom-0 left-0 right-0 h-2/3"
          />
          <View className="absolute bottom-0 left-0 right-0 p-5">
            <Text className="text-white text-lg font-bold mb-2">
              {category.title}
            </Text>
            <Text className="text-white/90 text-sm leading-5">
              {category.description}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderSection = (section: EcoTipsSection, sectionIndex: number) => (
    <View key={section.id} className="mb-8">
      <View className="flex-row justify-between items-center px-5 mb-4">
        <View>
          <Text className="text-xl font-bold text-gray-900">
            {section.title}
          </Text>
        </View>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-custom-green font-semibold text-sm mr-1">
            {currentLanguage === 'ar' ? 'عرض الكل' : currentLanguage === 'fr' ? 'Voir tout' : 'See All'}
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#90AF84" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {section.categories.map((category, cardIndex) => 
          renderCategoryCard(category, sectionIndex, cardIndex)
        )}
      </ScrollView>
    </View>
  );

 

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      

      {/* Main Content */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Hero Section */}
        <View className="px-5 pt-2 pb-6">
  <View className="bg-white rounded-2xl p-4 shadow-lg shadow-black/10 border border-green-100">
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-gray-900 font-bold">
        {currentLanguage === 'ar' ? '🌱 تحدي اليوم' : currentLanguage === 'fr' ? '🌱 Défi du Jour' : '🌱 Daily Challenge'}
      </Text>
      <View className="bg-green-500 rounded-full px-3 py-1">
        <Text className="text-white text-xs font-bold">+10</Text>
      </View>
    </View>
    
    <Text className="text-gray-700 text-sm mb-3">
      {currentLanguage === 'ar' 
        ? 'استخدم كيس قماش للتسوق اليوم'
        : currentLanguage === 'fr'
        ? 'Utilisez un sac en tissu pour vos courses aujourd\'hui'
        : 'Use a cloth bag for shopping today'}
    </Text>
    
    <View className="flex-row space-x-2">
      <TouchableOpacity className="flex-1 bg-custom-green rounded-xl py-2 mr-2 items-center">
        <Text className="text-white font-semibold">
          {currentLanguage === 'ar' ? 'قمت به!' : currentLanguage === 'fr' ? 'Fait!' : 'Done!'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 bg-gray-100 rounded-xl py-2 items-center">
        <Text className="text-gray-600 font-semibold">
          {currentLanguage === 'ar' ? 'لاحقاً' : currentLanguage === 'fr' ? 'Plus tard' : 'Later'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</View>

        {/* Sections */}
        {data.sections.map((section, index) => renderSection(section, index))}
      </Animated.ScrollView>

      {/* Detail Modal */}
      <Modal
        visible={selectedTip !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedTip(null)}
      >
        {selectedTip && (
          <SafeAreaView className="flex-1 bg-white">
            <ScrollView 
              showsVerticalScrollIndicator={false}
              className="flex-1"
            >
              {/* Hero Image */}
              <Image
                source={{ uri: selectedTip.image }}
                className="w-full h-72"
                resizeMode="cover"
              />
              
              <View className="p-5">
                {/* Title Section */}
                <View className="flex-row justify-between items-start mb-4">
                  <Text className="text-2xl font-bold text-gray-900 flex-1 mr-4">
                    {selectedTip.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setSelectedTip(null)}
                    className="w-11 h-11 items-center justify-center rounded-2xl bg-gray-100"
                  >
                    <Ionicons name="close" size={22} color="#374151" />
                  </TouchableOpacity>
                </View>

                {/* Description */}
                <Text className="text-gray-600 text-base leading-6 mb-8">
                  {selectedTip.longDescription}
                </Text>

                {/* Tips Section */}
                <View className="mb-8">
                  <Text className="text-xl font-bold text-gray-900 mb-5">
                    {currentLanguage === 'ar' ? 'نصائح عملية' : currentLanguage === 'fr' ? 'Conseils Pratiques' : 'Practical Tips'}
                  </Text>
                  {selectedTip.tips.map((tip, index) => (
                    <View key={index} className="flex-row items-start mb-4">
                      <View className="w-7 h-7 rounded-full bg-custom-green items-center justify-center mr-3 mt-1">
                        <Text className="text-white font-bold text-xs">
                          {index + 1}
                        </Text>
                      </View>
                      <Text className="text-gray-700 text-base leading-6 flex-1">
                        {tip}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Action Button */}
                <TouchableOpacity 
                  className="bg-custom-green py-4 rounded-xl items-center shadow-lg shadow-green-500/30 mb-5"
                  onPress={() => setSelectedTip(null)}
                  activeOpacity={0.8}
                >
                  <Text className="text-white font-bold text-lg">
                    {currentLanguage === 'ar' ? 'طبق هذه النصائح' : currentLanguage === 'fr' ? 'Appliquer ces conseils' : 'Apply These Tips'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>

      <BottomTabBar currentRoute="/ecotips" />
    </SafeAreaView>
  );
}