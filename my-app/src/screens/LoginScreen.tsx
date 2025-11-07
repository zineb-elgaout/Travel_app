// src/screens/LoginScreen.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();

  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  const handleAppleLogin = () => {
    console.log('Apple login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View 
        className="flex-1 justify-center px-8"
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        {/* Header */}
        <View className="items-center mb-12">
          <Text 
            className="text-black text-4xl font-light text-center mb-4 tracking-tight"
            style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
          >
            {t('login')}
          </Text>
          <Text 
            className="text-gray-600 text-base text-center font-light"
            style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
          >
            {t('welcomeBack')}
          </Text>
        </View>

        {/* Formulaire */}
        <View className="gap-4 mb-8">
          <TextInput
            className="bg-white border border-gray-300 rounded-none py-4 px-4 text-black text-base"
            placeholder={t('email')}
            placeholderTextColor="#9CA3AF"
            style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
            autoCapitalize="none"
          />
          
          <TextInput
            className="bg-white border border-gray-300 rounded-none py-4 px-4 text-black text-base"
            placeholder={t('password')}
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
          />
        </View>

        {/* Bouton Login */}
        <TouchableOpacity 
          className="bg-black rounded-none py-4 px-8 mb-8 active:opacity-80"
          onPress={() => router.push('/explore')}
        >
          <Text className="text-white text-center text-base font-medium uppercase tracking-widest">
            {t('login')}
          </Text>
        </TouchableOpacity>

        {/* Texte "Continue with" */}
        <Text 
          className="text-gray-500 text-sm text-center mb-6 font-light uppercase tracking-widest"
          style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
        >
          {t('continueWith')}
        </Text>

        {/* Icônes Social Login - Sans cadre, couleur gris foncé */}
        <View className="flex-row justify-center gap-8 mb-8">
          {/* Google Login */}
          <TouchableOpacity 
            className="p-2 active:opacity-60"
            onPress={handleGoogleLogin}
          >
            <Ionicons name="logo-google" size={28} color="#374151" />
          </TouchableOpacity>

          {/* Apple Login (iOS seulement) */}
          {Platform.OS === 'ios' && (
            <TouchableOpacity 
              className="p-2 active:opacity-60"
              onPress={handleAppleLogin}
            >
              <Ionicons name="logo-apple" size={28} color="#374151" />
            </TouchableOpacity>
          )}
        </View>

        {/* Lien vers Sign Up */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500 text-sm font-light mr-1">
            {t('dontHaveAccount')}
          </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className="text-black text-sm font-medium underline">
              {t('signUp')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}