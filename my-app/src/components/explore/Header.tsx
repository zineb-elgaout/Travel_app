import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  onMenu: () => void;
}

export const Header = ({ onMenu }: HeaderProps) => {
  return (
    <View className="flex-row items-center justify-between mb-7 px-5">
      <TouchableOpacity onPress={onMenu} className="p-2">
        <Ionicons name="menu" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity className="p-2">
        <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
