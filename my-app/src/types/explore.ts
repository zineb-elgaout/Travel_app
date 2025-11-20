export type ContentFilterType = 'cities' | 'crafts' | 'eco';

export interface ExploreItem {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  isFavorite: boolean;
  type: ContentFilterType;
  subType: string;
  category?: string;
}

export interface Filter {
  id: string;
  name: string;
  icon?: string;
}


