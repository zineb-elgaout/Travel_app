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
    className={`px-2 py-3 ml-1 ${
      isActive ? 'border-b-2 rounded-l border-indigo-200' : ''
    }`}
  >
    <Text 
      className={`text-base font-medium ${
        isActive ? 'text-black' : 'text-gray-600'
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);