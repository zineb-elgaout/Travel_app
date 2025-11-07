import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      color: '#000000',
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      color: '#000000',
    },
  ];

  const handleContinue = () => {
    if (selectedLanguage) {
      // Sauvegarder la langue choisie
      router.replace('/onboarding');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center px-8">
          
          {/* Header élégant avec quote inspirante */}
          <View className="items-center mb-20">
            
            
            <Text className="text-black text-4xl font-light text-center mb-6 tracking-tight">
              Morocco
            </Text>
            
            <View className="border-t border-black/20 w-16 mb-6" />
            
            <Text className="text-gray-600 text-lg text-center leading-7 font-light italic px-4">
              "Where ancient traditions meet modern elegance. Discover the soul of Morocco in every detail."
            </Text>
          </View>

          {/* Language Selection - Style minimaliste */}
          <View className="gap-6 mb-16">
            <Text className="text-black text-sm font-medium uppercase tracking-widest text-center mb-2">
              Select Language
            </Text>
            
            {languages.map((language) => {
              const isSelected = selectedLanguage === language.code;
              
              return (
                <TouchableOpacity
                  key={language.code}
                  onPress={() => setSelectedLanguage(language.code)}
                  activeOpacity={0.7}
                  className="relative"
                >
                  <View 
                    className={`
                      bg-white rounded-none py-5 px-6
                      border
                      ${isSelected ? 'border-black' : 'border-gray-300'}
                    `}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text className="text-black text-xl font-light mb-1 tracking-wide">
                          {language.name}
                        </Text>
                        <Text className="text-gray-500 text-base font-light">
                          {language.nativeName}
                        </Text>
                      </View>

                      {/* Checkmark minimaliste */}
                      <View 
                        className={`
                          w-6 h-6 rounded-sm items-center justify-center
                          border
                          ${isSelected ? 'bg-black border-black' : 'bg-white border-gray-400'}
                        `}
                      >
                        {isSelected && (
                          <Text className="text-white text-xs font-bold">✓</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Continue Button - Style Zara */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!selectedLanguage}
            activeOpacity={0.8}
            className={`
              bg-black rounded-none py-4 px-8
              ${selectedLanguage ? 'opacity-100' : 'opacity-30'}
            `}
          >
            <Text className="text-white text-center text-base font-medium uppercase tracking-widest">
              Continue
            </Text>
          </TouchableOpacity>

          {/* Footer Text minimaliste */}
          <Text className="text-gray-400 text-xs text-center mt-12 font-light tracking-wide">
            Language can be changed in settings
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}