import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FavoritesHeaderProps {
  count: number;
  onMenuPress: () => void;
  onSearchPress: () => void;
}

export const FavoritesHeader: React.FC<FavoritesHeaderProps> = ({
  count,
  onMenuPress,
  onSearchPress,
}) => (
  <View className="px-6 py-4 bg-white border-b border-gray-100">
    <View className="flex-row items-center justify-between mb-4">
      <TouchableOpacity onPress={onMenuPress} className="p-2 -ml-2">
        <Ionicons name="menu" size={26} color="#000" />
      </TouchableOpacity>
      
      <Text className="text-xl font-semibold text-black tracking-tight">
        MES FAVORIS
      </Text>
      
      <TouchableOpacity className="p-2 -mr-2" onPress={onSearchPress}>
        <Ionicons name="search" size={24} color="#000" />
      </TouchableOpacity>
    </View>

    <View className="flex-row items-center">
      <Ionicons name="heart" size={18} color="#EF4444" />
      <Text className="text-gray-600 text-sm ml-2">
        {count} {count > 1 ? 'destinations sauvegardées' : 'destination sauvegardée'}
      </Text>
    </View>
  </View>
);