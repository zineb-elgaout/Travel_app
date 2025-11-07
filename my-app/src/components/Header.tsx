// src/components/Header.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import MenuSidebar from './MenuSidebar';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  showMenu?: boolean;
}

export default function Header({ 
  title, 
  subtitle, 
  showSearch = true, 
  showMenu = true 
}: HeaderProps) {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <View className="px-6 pt-6 pb-4">
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text 
              className="text-black text-3xl font-light tracking-tight"
              style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
            >
              {title}
            </Text>
            {subtitle && (
              <Text 
                className="text-gray-600 text-base font-light mt-1"
                style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
              >
                {subtitle}
              </Text>
            )}
          </View>
          
          {showMenu && (
            <TouchableOpacity 
              className="p-2"
              onPress={() => setMenuVisible(true)}
            >
              <View className="gap-1.5">
                <View className="w-7 h-0.5 bg-black" />
                <View className="w-5 h-0.5 bg-black" />
                <View className="w-6 h-0.5 bg-black" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {showSearch && (
          <TouchableOpacity 
            className="bg-gray-100 py-3 px-4 flex-row items-center"
            onPress={() => router.push('/search')}
          >
            <Ionicons name="search" size={20} color="#6B7280" />
            <Text className="text-gray-500 text-base font-light ml-3">
              {t('searchDestinations')}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <MenuSidebar 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />
    </>
  );
}