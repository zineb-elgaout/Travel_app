// src/components/BottomTabBar.tsx 
import React, { useEffect, useRef } from 'react'; 
import { View, Text, TouchableOpacity, Animated } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useRouter } from 'expo-router'; 
import { useLanguage } from '../contexts/LanguageContext'; 
import { Ionicons } from '@expo/vector-icons'; 
 
interface BottomTabBarProps { 
  currentRoute: string; 
} 

const TabButton = ({ tab, isActive, onPress, isRTL }) => {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive]);

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 999,
          backgroundColor: isActive ? '#90AF84' : 'transparent',
          transform: [{ scale: scaleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.95, 1],
          })}],
        }}
      >
        <Ionicons  
          name={tab.icon}  
          size={24}  
          color={isActive ? '#FFFFFF' : '#9CA3AF'}  
        /> 
        {isActive && (
          <Animated.View
            style={{
              marginLeft: 8,
              opacity: opacityAnim,
              transform: [{ 
                translateX: opacityAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                })
              }],
            }}
          >
            <Text  
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: '500',
                textTransform: 'capitalize',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              }} 
            > 
              {tab.label} 
            </Text>
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
 
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
      name: 'ecotips', 
      label: t('ecotips'), 
      icon: 'leaf', 
      route: '/ecotips' 
    }, 
    { 
      name: 'chatbot', 
      label: t('chatbot'), 
      icon: 'chatbubble', 
      route: '/chatbot' 
    }, 
  ]; 
 
  return ( 
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
    }}> 
      <SafeAreaView edges={['bottom']}> 
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingHorizontal: 18,
          paddingVertical: 18,
        }}> 
          {tabs.map((tab) => { 
            const isActive = currentRoute === tab.route; 
             
            return ( 
              <TabButton
                key={tab.name}
                tab={tab}
                isActive={isActive}
                onPress={() => router.push(tab.route)}
                isRTL={isRTL}
              />
            ); 
          })} 
        </View> 
      </SafeAreaView> 
    </View> 
  ); 
}