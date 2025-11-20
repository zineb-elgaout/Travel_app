import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// SubFilterTab.tsx
interface SubFilterTabProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export const SubFilterTab: React.FC<SubFilterTabProps> = ({
  label,
  isActive,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-3 mx-1 ${isActive ? '' : ''}`}
    activeOpacity={0.7}
  >
    <View className="items-center">
      <Text 
        className={`text-base ${isActive ? 'text-black font-bold' : 'text-gray-600 font-medium'}`}
      >
        {label}
      </Text>
      
      {/* Ligne en bas - courte et centrée */}
      {isActive && (
        <View className="w-8 h-1 bg-black rounded-full mt-1" />
      )}
    </View>
  </TouchableOpacity>
);