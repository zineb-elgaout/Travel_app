import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

interface OptimizedImageProps {
  source: { uri: string };
  className?: string;
  priority?: 'high' | 'normal' | 'low';
}

const imageCache = new Set<string>();

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  source,
  className,
  priority = 'normal',
}) => {
  const [isLoading, setIsLoading] = useState(!imageCache.has(source.uri));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (priority === 'high' && !imageCache.has(source.uri)) {
      const img = new Image();
      img.src = source.uri;
      img.onload = () => {
        imageCache.add(source.uri);
        setIsLoading(false);
      };
    }
  }, [source.uri, priority]);

  return (
    <View className={className}>
      {isLoading && (
        <View className="absolute inset-0 bg-gray-200 items-center justify-center rounded-2xl z-10 animate-pulse">
          <Ionicons name="image-outline" size={24} color="#9CA3AF" />
        </View>
      )}
      
      {hasError && (
        <View className="absolute inset-0 bg-gray-200 items-center justify-center rounded-2xl z-10">
          <Ionicons name="alert-circle-outline" size={24} color="#EF4444" />
        </View>
      )}
      
      <Image
        source={{ uri: source.uri }}
        className={className}
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
        recyclingKey={source.uri}
        onLoad={() => {
          imageCache.add(source.uri);
          setIsLoading(false);
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </View>
  );
};