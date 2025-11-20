import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GlobalHeaderProps {
  onMenuPress: () => void;
  onSearchPress: () => void;
  element: string;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  onMenuPress,
  onSearchPress,
  element,
}) => (
    
    <View className="flex-row items-center justify-between mb-4">
      <TouchableOpacity onPress={onMenuPress} className="p-2 -ml-2">
        <Ionicons name="menu" size={26} color="#000" />
      </TouchableOpacity>
      
      <Text className="text-xl font-semibold text-black tracking-tight">
        {element}
      </Text>
      
      <TouchableOpacity className="p-2 -mr-2" onPress={onSearchPress}>
        <Ionicons name="search" size={24} color="#000" />
      </TouchableOpacity>
    </View>
);