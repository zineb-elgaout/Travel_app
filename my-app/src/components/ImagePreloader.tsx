// components/ImagePreloader.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { ANIMATED_IMAGES } from '../constants/ecotips';

export const ImagePreloader: React.FC<{
  onReady?: () => void;
  children: React.ReactNode;
}> = ({ onReady, children }) => {
  // Récupère toutes les URLs d'images
  const allImageUrls = Object.values(ANIMATED_IMAGES);
  
  const { loadedCount, total, isReady } = useImagePreloader(allImageUrls);

  React.useEffect(() => {
    if (isReady && onReady) {
      onReady();
    }
  }, [isReady, onReady]);

  // Affiche un indicateur de chargement pendant le preload
  if (!isReady) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <View className="items-center">
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Chargement des ressources...
          </Text>
          <View className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <View 
              className="h-full bg-custom-green rounded-full transition-all duration-300"
              style={{ width: `${(loadedCount / total) * 100}%` }}
            />
          </View>
          <Text className="text-sm text-gray-500 mt-2">
            {loadedCount}/{total} images chargées
          </Text>
        </View>
      </View>
    );
  }

  return <>{children}</>;
};