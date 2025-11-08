// src/components/BottomTabBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';

interface BottomTabBarProps {
  currentRoute: string;
}

export default function BottomTabBar({ currentRoute }: BottomTabBarProps) {
  const router = useRouter();
  const { t, isRTL } = useLanguage();

  const tabs = [
    {
      name: 'explore',
      label: t('explore'),
      icon: 'compass',
      route: '/explore'
    },
    {
      name: 'favorites',
      label: t('favorites'),
      icon: 'heart',
      route: '/favorites'
    },
    {
      name: 'itinerary',
      label: t('itinerary'),
      icon: 'map',
      route: '/itinerary'
    },
    {
      name: 'chatbot',
      label: t('chatbot'),
      icon: 'chatbubble',
      route: '/chatbot'
    },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300">
      <SafeAreaView edges={['bottom']}>
        <View className="flex-row justify-between items-center px-6 py-1">
          {tabs.map((tab) => {
            const isActive = currentRoute === tab.route;
            
            return (
              <TouchableOpacity
                key={tab.name}
                onPress={() => router.push(tab.route)}
                className="items-center justify-center py-2 flex-1"
                activeOpacity={0.8}
              >
                <Ionicons 
                  name={tab.icon} 
                  size={22} 
                  color={isActive ? '#000000' : '#6B7280'} 
                />
                <Text 
                  className={`text-xs mt-1 uppercase tracking-wider ${
                    isActive ? 'text-black font-medium' : 'text-gray-500 font-light'
                  }`}
                  style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}