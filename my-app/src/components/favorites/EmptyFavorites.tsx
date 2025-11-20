import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyFavoritesProps {
  onExplore: () => void;
}

export const EmptyFavorites: React.FC<EmptyFavoritesProps> = ({ onExplore }) => (
  <View className="flex-1 items-center justify-center py-20">
    <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-4">
      <Ionicons name="heart-outline" size={48} color="#D1D5DB" />
    </View>
    <Text className="text-gray-900 text-lg font-semibold mb-2">
      Aucun favori
    </Text>
    <Text className="text-gray-500 text-sm text-center px-8 mb-6">
      Explorez et ajoutez vos destinations préférées à vos favoris
    </Text>
    <TouchableOpacity 
      className="bg-black px-6 py-3 rounded-full"
      onPress={onExplore}
    >
      <Text className="text-white text-sm font-medium">
        Explorer maintenant
      </Text>
    </TouchableOpacity>
  </View>
);