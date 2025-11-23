export type ContentFilterType = 'cities' | 'crafts' | 'eco';

export type DetailTabType = 'information' | 'contact' | 'ecotips' | 'avis' | 'photos' | 'videos';

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
  contact?: string; // Ajouté pour cohérence avec le composant
  ecotips?: string;
  reviews?: string[];
  photos?: string[];
  videos?: string[];
}

export interface Filter {
  id: string;
  name: string;
  icon?: string;
  nameKey?: string; // Ajouté pour cohérence avec l'usage dans les composants
}

export interface SubFilter {
  id: string;
  nameKey: string;
}