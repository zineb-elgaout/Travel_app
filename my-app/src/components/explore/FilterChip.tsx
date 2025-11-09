// FilterChip.tsx
import React from "react";
import { View, Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FilterChipProps {
  label: string;
  // Use the Ionicons name prop type for stronger typing
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  isActive: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  icon,
  isActive,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    accessibilityRole="button"
    accessibilityState={{ selected: isActive }}
    accessibilityLabel={`Filter ${label}`}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    activeOpacity={0.85}
    className={`flex-row items-center px-4 py-2 rounded-full ${
      isActive ? 'bg-black' : 'bg-gray-100'
    }`}
  >
    {icon && (
      <View className="mr-2">
        <Ionicons
          name={icon}
          size={16}
          color={isActive ? "white" : "#6B7280"}
        />
      </View>
    )}
    <Text
      className={`text-sm font-medium ${
        isActive ? 'text-white' : 'text-gray-600'
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);