// src/components/MenuSidebar.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';

interface MenuSidebarProps {
  visible: boolean;
  onClose: () => void;
}

export default function MenuSidebar({ visible, onClose }: MenuSidebarProps) {
  const router = useRouter();
  const { t, isRTL } = useLanguage();

  const menuOptions = [
    {
      icon: 'person-outline',
      label: t('profile'),
      route: '/profile'
    },
    {
      icon: 'time-outline',
      label: t('history'),
      route: '/history'
    },
    {
      icon: 'settings-outline',
      label: t('settings'),
      route: '/settings'
    },
    {
      icon: 'language-outline',
      label: t('language'),
      route: '/language'
    },
  ];

  const handleMenuOption = (route: string) => {
    onClose();
    router.push(route);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
          {/* Header du menu */}
          <View className="px-6 pt-4 pb-6 border-b border-gray-200">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-3xl font-light text-black">
                {t('menu')}
              </Text>
              <TouchableOpacity 
                onPress={onClose}
                className="p-2 -mr-2"
              >
                <Ionicons name="close" size={28} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Options du menu */}
          <ScrollView className="flex-1 px-6 pt-6">
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className="py-5 border-b border-gray-100"
                onPress={() => handleMenuOption(option.route)}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <Ionicons name={option.icon} size={22} color="#000000" />
                    <Text 
                      className="text-black text-lg font-light ml-4"
                      style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
                    >
                      {option.label}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Footer avec nom de l'app */}
          <View className="px-6 py-5 border-t border-gray-200">
            <Text className="text-gray-800 text-base font-medium text-center mb-1">
              Morocco Travel
            </Text>
            <Text className="text-gray-400 text-xs text-center">
              Discover the beauty of Morocco
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}