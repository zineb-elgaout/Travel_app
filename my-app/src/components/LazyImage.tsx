// components/LazyImage.tsx
import React from 'react';
import { OptimizedImage } from './OptimizedImage';
import { useIsInViewport } from '../hooks/useIsInViewport';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LazyImageProps {
  source: { uri: string };
  className?: string;
  placeholder?: React.ReactNode;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  source,
  className,
  placeholder,
}) => {
  const { ref, isInViewport } = useIsInViewport(300); // 300px d'avance

  if (!isInViewport) {
    return (
      <View ref={ref} className={className}>
        {placeholder || (
          <View className="flex-1 bg-gray-200 rounded-2xl items-center justify-center">
            <Ionicons name="image-outline" size={24} color="#9CA3AF" />
          </View>
        )}
      </View>
    );
  }

  return (
    <View ref={ref} className={className}>
      <OptimizedImage source={source} className="flex-1" />
    </View>
  );
};