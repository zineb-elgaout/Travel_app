// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomeScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View 
        className="flex-1 justify-center items-center px-8"
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        
        {/* Header élégant */}
        <View className="items-center mb-16">
          
          
          <Text 
            className="text-black text-5xl font-light text-center mb-6 tracking-tight"
            style={{ 
              textAlign: 'center',
              writingDirection: isRTL ? 'rtl' : 'ltr'
            }}
          >
            {t('welcome')}
          </Text>
          
          <View className="border-t border-black/20 w-20 mb-6" />
          
          <Text 
            className="text-gray-600 text-lg text-center leading-7 font-light px-4"
            style={{ 
              textAlign: 'center',
              writingDirection: isRTL ? 'rtl' : 'ltr'
            }}
          >
            {t('discover')}
          </Text>
        </View>

        {/* Boutons Login & Sign Up style Zara */}
        <View className="w-full gap-4">
          <TouchableOpacity 
            className="bg-black rounded-none py-4 px-8 border border-black active:opacity-80"
            onPress={() => router.push('/login')}
          >
            <Text 
              className="text-white text-center text-base font-medium uppercase tracking-widest"
              style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
            >
              {t('login')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-white rounded-none py-4 px-8 border border-gray-300 active:opacity-80"
            onPress={() => router.push('/signup')}
          >
            <Text 
              className="text-black text-center text-base font-medium uppercase tracking-widest"
              style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
            >
              {t('signUp')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lien pour continuer sans compte */}
        <TouchableOpacity 
          className="mt-8"
          onPress={() => router.push('/explore')}
        >
          <Text 
            className="text-gray-500 text-sm font-light underline tracking-wide"
            style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
          >
            {t('continueWithoutAccount')}
          </Text>
        </TouchableOpacity>

        {/* Footer texte */}
        <Text 
          className="text-gray-400 text-xs text-center mt-16 font-light tracking-wide"
          style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
        >
          {t('experienceMorocco')}
        </Text>
      </View>
    </SafeAreaView>
  );
}