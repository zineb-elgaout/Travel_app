// src/components/MenuSidebar.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

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
      icon: 'compass-outline',
      label: t('explore') || 'Explorer',
      route: '/explore',
    },
    {
      icon: 'leaf-outline',
      label: t('eco_destinations') || 'Destinations Éco',
      route: '/eco-destinations',
    },
    {
      icon: 'map-outline',
      label: t('my_trips') || 'Mes Voyages',
      route: '/my-trips',
    },
    {
      icon: 'heart-outline',
      label: t('favorites') || 'Favoris',
      route: '/favorites',
    },
    {
      icon: 'calendar-outline',
      label: t('booking') || 'Réservations',
      route: '/booking',
    },
    {
      icon: 'information-circle-outline',
      label: t('travel_guide') || 'Guide de Voyage',
      route: '/travel-guide',
    },
  ];

  
  const bottomOptions = [
    {
      icon: 'settings-outline',
      label: t('settings') || 'Paramètres',
      route: '/settings',
    },
    {
      icon: 'heart-outline',
      label: t('help') || 'Aide & Support',
      route: '/help',
    },
    {
      icon: 'log-out-outline',
      label: t('logout') || 'Déconnexion',
      route: '/logout',
      isLogout: true,
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
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 flex-row">
        {/* Sidebar with blur effect */}
        <BlurView
          intensity={80}
          tint="dark"
          style={{
            width: screenWidth * 0.75,
            backgroundColor: 'rgba(29, 76, 76, 0.85)',
          }}
        >
          <SafeAreaView className="flex-1" edges={['top', 'bottom', 'left']} style={{ paddingTop: StatusBar.currentHeight || 0 }}>
            {/* Header with avatar and close button */}

            {/* Menu Options */}
            <ScrollView 
              className="flex-1 px-10 pt-12 pb-6"
              showsVerticalScrollIndicator={false}
            >
              {/* Header with avatar and close button */}
              <View className="px-5 pb-8">
              <View className="flex-row items-center justify-between mb-6">
                {/* Avatar */}
                <View className="w-11 h-11 rounded-full bg-white/20 items-center justify-center">
                  <Ionicons name="person" size={22} color="#FFF" />
                </View>
                
                {/* Close button */}
                <TouchableOpacity 
                  onPress={onClose}
                  className="p-2"
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Menu Options */}
            <ScrollView className="px-5">
              {menuOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className="py-3.5 flex-row items-center"
                  onPress={() => handleMenuOption(option.route)}
                  activeOpacity={0.7}
                >
                  <View className="w-9 items-start justify-center">
                    <Ionicons name={option.icon} size={20} color="#FFF" />
                  </View>
                  
                  <Text 
                    className="text-white text-[15px] font-normal ml-3"
                    style={{ 
                      writingDirection: isRTL ? 'rtl' : 'ltr',
                      letterSpacing: 0.2
                    }}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Divider */}
              <View className="h-px bg-white/10 my-4" />

              {/* Bottom Options */}
              {bottomOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className="py-3.5 flex-row items-center"
                  onPress={() => handleMenuOption(option.route)}
                  activeOpacity={0.7}
                >
                  <View className="w-9 items-start justify-center">
                    <Ionicons name={option.icon} size={20} color="#FFF" />
                  </View>
                  
                  <Text 
                    className="text-white text-[15px] font-normal ml-3"
                    style={{ 
                      writingDirection: isRTL ? 'rtl' : 'ltr',
                      letterSpacing: 0.2
                    }}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
              </ScrollView>
            </ScrollView>
          </SafeAreaView>
        </BlurView>

        {/* Right side - Touchable overlay to close */}
        <TouchableOpacity 
          className="flex-1"
          onPress={onClose}
          activeOpacity={1}
        >
          <BlurView
            intensity={20}
            tint="dark"
            style={{ flex: 1 }}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}