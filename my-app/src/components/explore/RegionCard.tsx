import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Region {
  id: string;
  name: string;
  images: string[];
}

interface RegionCardProps {
  region: Region;
}

export function RegionCard({ region }: RegionCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/exploreDetail',
      params: {
        regionId: region.id,
        regionName: region.name,
      },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handlePress}
      className="mb-4 rounded-2xl overflow-hidden bg-white border border-gray-200"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}
    >
      <View className="flex-row items-center h-28">
        <View className="relative ml-4" style={{ width: 96, height: 80 }}>
          <View
            className="absolute rounded-lg overflow-hidden border-2 border-white"
            style={{
              width: 64,
              height: 80,
              left: 16,
              zIndex: 20,
            }}
          >
            <Image source={{ uri: region.images[0] }} className="w-full h-full" />
          </View>

          <View
            className="absolute rounded-lg overflow-hidden border-2 border-white"
            style={{
              width: 56,
              height: 64,
              left: 0,
              top: 8,
              zIndex: 10,
              transform: [{ rotate: '-6deg' }],
            }}
          >
            <Image source={{ uri: region.images[1] }} className="w-full h-full" />
          </View>

          <View
            className="absolute rounded-lg overflow-hidden border-2 border-white"
            style={{
              width: 56,
              height: 64,
              right: 0,
              top: 8,
              zIndex: 10,
              transform: [{ rotate: '6deg' }],
            }}
          >
            <Image source={{ uri: region.images[2] }} className="w-full h-full" />
          </View>
        </View>

        <View className="flex-1 mx-4">
          <Text className="text-lg font-bold text-gray-900" numberOfLines={2}>
            {region.name}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-1">Discover Morocco</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" className="mr-3" />
      </View>
    </TouchableOpacity>
  );
}
