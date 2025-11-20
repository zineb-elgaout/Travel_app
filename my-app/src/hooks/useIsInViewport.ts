// hooks/useIsInViewport.ts
import { useState, useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import type { View } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const useIsInViewport = (offset: number = 500) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<View>(null);

  useEffect(() => {
    const checkVisibility = () => {
      ref.current?.measure((x, y, width, height, pageX, pageY) => {
        if (pageY !== null) {
          const isVisible = pageY < SCREEN_HEIGHT + offset;
          setIsInViewport(isVisible);
        }
      });
    };

    checkVisibility();
    
    const interval = setInterval(checkVisibility, 500);
    return () => clearInterval(interval);
  }, [offset]);

  return { ref, isInViewport };
};