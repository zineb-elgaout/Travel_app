import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// EmptyState.tsx
export const EmptyState: React.FC = () => (
  <View className="py-8 items-center">
    <Ionicons name="search-outline" size={48} color="#9CA3AF" />
    <Text className="text-gray-500 text-lg mt-2">
      Aucun résultat trouvé
    </Text>
  </View>
);