import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Image, ImageLoadEventData } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

interface OptimizedImageProps {
  source: { uri: string };
  className?: string;
  priority?: 'high' | 'normal' | 'low';
  resizeMode?: 'cover' | 'contain' | 'stretch';
}

const imageCache = new Set<string>();
const imagePreloadQueue = new Set<string>();

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  source,
  className,
  priority = 'normal',
  resizeMode = 'cover',
}) => {
  const [isLoading, setIsLoading] = useState(!imageCache.has(source.uri));
  const [hasError, setHasError] = useState(false);

  // Preload high-priority images
  useEffect(() => {
    if (priority === 'high' && !imageCache.has(source.uri) && !imagePreloadQueue.has(source.uri)) {
      imagePreloadQueue.add(source.uri);
      // expo-image handles caching automatically; mark as preloaded after a moment
      const timer = setTimeout(() => {
        imagePreloadQueue.delete(source.uri);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [source.uri, priority]);

  const handleLoad = useCallback((event: ImageLoadEventData) => {
    imageCache.add(source.uri);
    setIsLoading(false);
    setHasError(false);
  }, [source.uri]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <View className="relative">
      <Image
        source={{ uri: source.uri }}
        className={className}
        contentFit={resizeMode as any}
        transition={300}
        cachePolicy="memory-disk"
        recyclingKey={source.uri}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {isLoading && (
        <View className="absolute inset-0 bg-gray-200 items-center justify-center rounded-2xl">
          <ActivityIndicator size="large" color="#6B7280" />
        </View>
      )}
      
      {hasError && (
        <View className="absolute inset-0 bg-gray-200 items-center justify-center rounded-2xl">
          <Ionicons name="alert-circle-outline" size={32} color="#EF4444" />
        </View>
      )}
    </View>
  );
};




