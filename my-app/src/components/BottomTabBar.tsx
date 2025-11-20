// src/components/BottomTabBar.tsx
import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';

interface BottomTabBarProps {
  currentRoute: string;
}

interface Tab {
  name: string;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  activeIcon?: React.ComponentProps<typeof Ionicons>['name'];
  route: string;
}

interface TabButtonProps {
  tab: Tab;
  isActive: boolean;
  onPress: () => void;
  isRTL: boolean;
}

const TabButton = ({ tab, isActive, onPress }: TabButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1.15 : 1,
      useNativeDriver: true,
      friction: 6,
      tension: 80
    }).start();
  }, [isActive]);

  const getIconName = () => {
    if (isActive && tab.activeIcon) return tab.activeIcon;
    return tab.icon;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-1 items-center justify-center px-1 py-4"
    >
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ scale: scaleAnim }]
        }}
      >
        <Ionicons
          name={getIconName()}
          size={isActive ? 30 : 26}           // ⬅️ Icône plus grande quand active
          color={isActive ? '#1d4c4c' : '#6B7280'}
          marginBottom={isActive ? 0 : 2}    // ⬅️ Ajustement du margin pour l’alignement
        />

       
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function BottomTabBar({ currentRoute }: BottomTabBarProps) {
  const router = useRouter();
  const { t, isRTL } = useLanguage();

  const tabs = [
    {
      name: 'chatbot',
      label: t('chatbot') || 'Chatbot',
      icon: 'chatbubble-outline',
      activeIcon: 'chatbubble',
      route: '/conversation'
    },
    {
      name: 'ecotips',
      label: t('ecotips') || 'Éco-Tips',
      icon: 'leaf-outline',
      activeIcon: 'leaf',
      route: '/ecotips'
    },
    {
      name: 'explore',
      label: t('explore') || 'Explorer',
      icon: 'compass-outline',
      activeIcon: 'compass',
      route: '/explore'
    },
    {
      name: 'favorites',
      label: t('favorites') || 'Favoris',
      icon: 'heart-outline',
      activeIcon: 'heart',
      route: '/favorites'
    },
    {
      name: 'donations',
      label: t('donations') || 'Dons',
      icon: 'people-outline', 
      activeIcon: 'people',
      route: '/donations'
    }
  ] as const;

  return (
    <View
      className="absolute bottom-0 left-0 right-0"
      style={{
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 8
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          backdropFilter: 'blur(10px)'
        }}
      />

      <SafeAreaView edges={['bottom']}>
        <View
          className="flex-row items-center "
          style={{ paddingHorizontal: 22 }}
        >
          {tabs.map((tab) => {
            const isActive = currentRoute === tab.route;
            return (
              <TabButton
                key={tab.name}
                tab={tab}
                isActive={isActive}
                onPress={() => router.push(tab.route as any)}
                isRTL={isRTL}
              />
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}
