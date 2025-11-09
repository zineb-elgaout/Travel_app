export const CONTENT_FILTERS = [
  { id: 'cities', nameKey: 'cities', icon: 'business' },
  { id: 'crafts', nameKey: 'crafts', icon: 'color-palette' },
  { id: 'eco', nameKey: 'eco', icon: 'leaf' },
] as const;

export const SUB_FILTERS = {
  cities: [
    { id: 'popular', nameKey: 'popular' },
    { id: 'imperial', nameKey: 'imperial' },
    { id: 'coastal', nameKey: 'coastal' },
    { id: 'mountain', nameKey: 'mountain' },
    { id: 'desert', nameKey: 'desert' },
  ],
  crafts: [
    { id: 'popular', nameKey: 'popular' },
    { id: 'textile', nameKey: 'textile' },
    { id: 'ceramic', nameKey: 'ceramic' },
    { id: 'leather', nameKey: 'leather' },
    { id: 'jewelry', nameKey: 'jewelry' },
  ],
  eco: [
    { id: 'popular', nameKey: 'popular' },
    { id: 'accommodation', nameKey: 'accommodation' },
    { id: 'agriculture', nameKey: 'agriculture' },
    { id: 'nature', nameKey: 'nature' },
    { id: 'sustainable', nameKey: 'sustainable' },
  ],
} as const;