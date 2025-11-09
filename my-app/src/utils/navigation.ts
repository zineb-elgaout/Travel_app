import type { ContentFilterType } from '../types/explore';

export const getRouteForItem = (
  contentFilter: ContentFilterType,
  itemId: number
): string => {
  const routes: Record<ContentFilterType, string> = {
    cities: `/destination/${itemId}`,
    crafts: `/craft/${itemId}`,
    eco: `/eco/${itemId}`,
  };
  
  return routes[contentFilter];
};