// hooks/useImagePreloader.ts
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';

export const useImagePreloader = (imageUrls: string[]) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      const promises = imageUrls.map(url => 
        new Promise<void>((resolve) => {
          Image.prefetch(url)
            .then(() => {
              if (isMounted) {
                setLoadedCount(prev => prev + 1);
              }
              resolve();
            })
            .catch(() => resolve()); // Ignore les erreurs silencieusement
        })
      );

      await Promise.all(promises);
      if (isMounted) {
        setIsReady(true);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return { loadedCount, total: imageUrls.length, isReady };
};