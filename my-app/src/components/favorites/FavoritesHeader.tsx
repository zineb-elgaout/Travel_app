import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalHeader } from '../GlobalHeader';

interface FavoritesHeaderProps {
  count: number;
  onMenuPress: () => void;
  onSearchPress: () => void;
  element: string;
}

export const FavoritesHeader: React.FC<FavoritesHeaderProps> = ({
  count,
  onMenuPress,
  onSearchPress,
  element,
}) => (
  <View className="px-6 py-4 bg-white border-b border-gray-100">
    <GlobalHeader
      element={element}
      onMenuPress={onMenuPress}
      onSearchPress={onSearchPress}
    />

    <View className="flex-row items-center mt-2">
      <Ionicons name="heart" size={18} color="#EF4444" />
      <Text className="text-gray-600 text-sm ml-2">
        {count} {count > 1 ? 'destinations sauvegardées' : 'destination sauvegardée'}
      </Text>
    </View>
  </View>
);