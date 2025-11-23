import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ExploreItem } from '../../types/explore'; // Assurez-vous que le chemin est correct

interface DetailContentProps {
  selectedItem: ExploreItem | null;
  detailTab: string; // Utilisez un type plus strict si possible, comme DetailTabType
}

const DetailContent: React.FC<DetailContentProps> = ({ selectedItem, detailTab }) => {
  if (!selectedItem) return null;

  switch (detailTab) {
    case 'information':
      return (
        <View className="px-5">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Description</Text>
          <Text className="text-gray-600 leading-6 text-sm">
            {selectedItem.description || 'Description non disponible.'}
          </Text>
          <TouchableOpacity className="mt-2">
            <Text className="text-pink-500 font-medium text-sm">Read More</Text>
          </TouchableOpacity>
        </View>
      );

    case 'contact':
      return (
        <View className="px-5">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Contact</Text>
          <Text className="text-gray-600 leading-6 text-sm">
            {selectedItem.contact || 'Informations de contact non disponibles.'}
          </Text>
        </View>
      );

    case 'ecotips':
      return (
        <View className="px-5">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Ecotips</Text>
          <Text className="text-gray-600 leading-6 text-sm">
            {selectedItem.ecotips || 'Conseils écologiques non disponibles.'}
          </Text>
        </View>
      );

    case 'avis':
      return (
        <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
          {selectedItem.reviews?.length > 0 ? (
            selectedItem.reviews.map((review: string, index: number) => (
              <View key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                <View className="flex-row items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Ionicons key={i} name="star" size={14} color="#fbbf24" />
                  ))}
                </View>
                <Text className="text-gray-700 text-sm">{review}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 text-center py-8">Aucun avis disponible.</Text>
          )}
        </ScrollView>
      );

    case 'photos':
      return (
        <View className="px-5">
          <View className="flex-row flex-wrap">
            {selectedItem.photos?.length > 0 ? (
              selectedItem.photos.map((photo: string, index: number) => (
                <View key={index} className="w-[48%] mr-[4%] mb-3" style={{ marginRight: index % 2 === 0 ? '4%' : 0 }}>
                  <Image
                    source={{ uri: photo }}
                    className="w-full h-32 rounded-lg"
                    resizeMode="cover"
                  />
                </View>
              ))
            ) : (
              <Text className="text-gray-500 text-center w-full py-8">Aucune photo disponible.</Text>
            )}
          </View>
        </View>
      );

    case 'videos':
      return (
        <View className="px-5">
          {selectedItem.videos?.length > 0 ? (
            selectedItem.videos.map((video: string, index: number) => (
              <View key={index} className="bg-gray-50 p-4 rounded-lg mb-3 flex-row items-center">
                <Ionicons name="videocam" size={20} color="#1d4c4c" />
                <Text className="text-gray-700 ml-3 flex-1 text-sm">{video}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 text-center py-8">Aucune vidéo disponible.</Text>
          )}
        </View>
      );

    default:
      return <Text className="text-gray-500 text-center py-8">Contenu non disponible.</Text>;
  }
};

export default DetailContent;