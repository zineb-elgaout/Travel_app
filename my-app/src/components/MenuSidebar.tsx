// src/components/MenuSidebar.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
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
  const { width: screenWidth } = Dimensions.get('window');

  const menuOptions = [
    {
      icon: 'person-outline',
      label: t('profile') || 'Profil',
      route: '/profile',
      description: 'Gérer votre compte'
    },
    {
      icon: 'heart-outline',
      label: t('favorites') || 'Favoris',
      route: '/favorites',
      description: 'Vos destinations sauvegardées'
    },
    {
      icon: 'time-outline',
      label: t('history') || 'Historique',
      route: '/history',
      description: 'Vos visites récentes'
    },
    {
      icon: 'notifications-outline',
      label: t('notifications') || 'Notifications',
      route: '/notifications',
      description: 'Alertes et nouveautés'
    },
    {
      icon: 'language-outline',
      label: t('language') || 'Langue',
      route: '/language',
      description: 'Français • العربية • English'
    },
    {
      icon: 'settings-outline',
      label: t('settings') || 'Paramètres',
      route: '/settings',
      description: 'Préférences de l\'application'
    },
  ];

  const handleMenuOption = (route: string) => {
    onClose();
    setTimeout(() => {
      router.push(route);
    }, 300);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay avec effet blur */}
      <View className="flex-1 bg-black/40">
        <TouchableOpacity 
          className="flex-1"
          onPress={onClose}
          activeOpacity={1}
        />
        
        {/* Sidebar minimaliste depuis la gauche */}
        <View 
          className="absolute top-0 bottom-0 left-0 bg-white"
          style={{
            width: screenWidth * 0.85,
            shadowColor: '#000',
            shadowOffset: { width: 4, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
            {/* Header avec X, avatar et nom dans la même ligne */}
            <View className="px-6 pt-6 pb-6 border-b border-gray-100">
              <View className="flex-row items-center justify-between">
                {/* Avatar et nom */}
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 rounded-full bg-black items-center justify-center">
                    <Text className="text-white text-base font-bold">MA</Text>
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-black text-sm font-semibold tracking-tight">
                      Mohamed Ali
                    </Text>
                    <Text className="text-gray-500 text-xs mt-0.5">
                      Explorateur
                    </Text>
                  </View>
                </View>
                
                {/* Bouton X */}
                <TouchableOpacity 
                  onPress={onClose}
                  className="p-2 -mr-2"
                >
                  <Ionicons name="close" size={22} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Options du menu */}
            <ScrollView 
              className="flex-1 pt-4"
              showsVerticalScrollIndicator={false}
            >
              <View className="px-6">
                {menuOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    className="py-4 border-b border-gray-50"
                    onPress={() => handleMenuOption(option.route)}
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-center">
                      {/* Icône minimaliste */}
                      <View className="w-10 h-10 items-center justify-center">
                        <Ionicons name={option.icon} size={22} color="#000" />
                      </View>
                      
                      {/* Label et description */}
                      <View className="flex-1 ml-3">
                        <Text 
                          className="text-black text-sm font-medium tracking-tight"
                          style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
                        >
                          {option.label}
                        </Text>
                        <Text 
                          className="text-gray-400 text-xs mt-0.5"
                          style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
                        >
                          {option.description}
                        </Text>
                      </View>
                      
                      {/* Flèche */}
                      <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Section Actions */}
              <View className="px-6 mt-6 pt-6 border-t border-gray-100">
                <Text className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                  ACTIONS
                </Text>
                
                {/* Aide et support */}
                <TouchableOpacity
                  className="py-3 flex-row items-center"
                  onPress={() => console.log('Aide')}
                  activeOpacity={0.7}
                >
                  <View className="w-10 h-10 items-center justify-center">
                    <Ionicons name="help-circle-outline" size={22} color="#6B7280" />
                  </View>
                  <Text className="text-gray-600 text-sm ml-3">
                    {t('help') || 'Aide et support'}
                  </Text>
                </TouchableOpacity>

                {/* À propos */}
                <TouchableOpacity
                  className="py-3 flex-row items-center"
                  onPress={() => console.log('À propos')}
                  activeOpacity={0.7}
                >
                  <View className="w-10 h-10 items-center justify-center">
                    <Ionicons name="information-circle-outline" size={22} color="#6B7280" />
                  </View>
                  <Text className="text-gray-600 text-sm ml-3">
                    {t('about') || 'À propos'}
                  </Text>
                </TouchableOpacity>

                {/* Déconnexion */}
                <TouchableOpacity
                  className="py-3 flex-row items-center mt-2"
                  onPress={() => console.log('Déconnexion')}
                  activeOpacity={0.7}
                >
                  <View className="w-10 h-10 items-center justify-center">
                    <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                  </View>
                  <Text className="text-red-500 text-sm ml-3 font-medium">
                    {t('logout') || 'Déconnexion'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Footer avec version */}
            <View className="px-6 py-4 border-t border-gray-100">
              <Text className="text-gray-400 text-xs text-center">
                Morocco Explorer
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}