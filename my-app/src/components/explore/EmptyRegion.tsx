import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function EmptyRegion() {
  return (
    <View className="bg-white items-center pt-20 px-6 mb-80">
      <Ionicons name="search-outline" size={48} color="#9CA3AF" />
      
      <Text className="text-lg font-medium text-gray-600 mt-4 text-center">
        Aucune région trouvée
      </Text>

      <Text className="text-sm text-gray-400 mt-2 text-center">
        Essayez un autre terme de recherche
      </Text>
    </View>
  );
}
