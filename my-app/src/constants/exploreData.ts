export const EXPLORE_DATA = {
  cities: {
    slides: [
      {
      id: 1,
      name: 'Marrakech',
      location: 'Marrakech-Safi',
      description: 'La Perle du Sud, ville impériale aux souks animés',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      rating: 4.8,
      isFavorite: true,
      type: 'cities',
      subType: 'imperial'
    },
    {
      id: 2,
      name: 'Chefchaouen',
      location: 'Tanger-Tétouan-Al Hoceïma',
      description: 'La Perle Bleue du Rif, ville aux ruelles azurées',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop',
      rating: 4.9,
      isFavorite: false,
      type: 'cities',
      subType: 'mountain'
    },
    {
      id: 3,
      name: 'Fès',
      location: 'Fès-Meknès',
      description: 'Capitale spirituelle et plus ancienne ville impériale',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      rating: 4.7,
      isFavorite: false,
      type: 'cities',
      subType: 'imperial'
    },
    {
      id: 4,
      name: 'Essaouira',
      location: 'Marrakech-Safi',
      description: 'Ville côtière fortifiée aux alizés permanents',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      rating: 4.6,
      isFavorite: true,
      type: 'cities',
      subType: 'coastal'
    }
    ],
    suggestions: [
      {
      id: 5,
      name: 'Casablanca',
      location: 'Casablanca-Settat',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      isFavorite: false,
      description: 'Capitale économique et Hassan II',
      type: 'cities',
      subType: 'coastal'
    },
    {
      id: 6,
      name: 'Meknès',
      location: 'Fès-Meknès',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1624571395775-253d9666612b?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Ville impériale de Moulay Ismail',
      type: 'cities',
      subType: 'imperial'
    },
    {
      id: 7,
      name: 'Agadir',
      location: 'Souss-Massa',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Station balnéaire sur l\'Atlantique',
      type: 'cities',
      subType: 'coastal'
    },
    {
      id: 8,
      name: 'Tanger',
      location: 'Tanger-Tétouan-Al Hoceïma',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Porte de l\'Afrique sur le détroit',
      type: 'cities',
      subType: 'coastal'
    },
    ]
  },
  crafts: {
    slides: [
        {
      id: 9,
      name: 'Poterie de Safi',
      location: 'Safi',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Céramique traditionnelle bleue',
      category: 'Céramique',
      type: 'crafts',
      subType: 'ceramic'
    },
    {
      id: 10,
      name: 'Tapis Berbères',
      location: 'Moyen Atlas',
      rating: 4.8,
      image: 'https://tse4.mm.bing.net/th/id/OIP.G2p_2zcrDK7OeUi7Pfpm3gHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
      isFavorite: false,
      description: 'Tissage artisanal ancestral',
      category: 'Textile',
      type: 'crafts',
      subType: 'textile'
    },
    {
      id: 11,
      name: 'Cuir de Fès',
      location: 'Fès',
      rating: 4.6,
      image: 'https://tse4.mm.bing.net/th/id/OIP.F2xQ8YmfAloC-nB4Mbag8AHaEx?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
      isFavorite: false,
      description: 'Tanneries traditionnelles',
      category: 'Maroquinerie',
      type: 'crafts',
      subType: 'leather'
    },
    {
      id: 12,
      name: 'Argenterie de Tiznit',
      location: 'Tiznit',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Bijoux berbères en argent',
      category: 'Bijouterie',
      type: 'crafts',
      subType: 'jewelry'
    }
        
    ],
    suggestions: [
        {
      id: 17,
      name: 'Bois Sculpté',
      location: 'Meknès',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Sculpture sur bois traditionnelle',
      category: 'Bois',
      type: 'crafts',
      subType: 'wood'
    },
    {
      id: 18,
      name: 'Broderie Fassi',
      location: 'Fès',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Broderie traditionnelle de Fès',
      category: 'Textile',
      type: 'crafts',
      subType: 'textile'
    },
    {
      id: 19,
      name: 'Zellige Artisanal',
      location: 'Fès',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1581539251075-5c9c55e18c9b?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Mosaïque traditionnelle marocaine',
      category: 'Céramique',
      type: 'crafts',
      subType: 'ceramic'
    },
    {
      id: 20,
      name: 'Cuir Tanné',
      location: 'Marrakech',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Cuir traditionnel des tanneries',
      category: 'Maroquinerie',
      type: 'crafts',
      subType: 'leather'
    },
    ]
  },
  eco: {
    slides: [
        {
      id: 13,
      name: 'Randonnée Atlas',
      location: 'Haut Atlas',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Trekking écologique en montagne',
      category: 'Nature',
      type: 'eco',
      subType: 'nature'
    },
    {
      id: 14,
      name: 'Coopérative Argan',
      location: 'Essaouira',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Production durable d\'huile d\'argan',
      category: 'Agriculture',
      type: 'eco',
      subType: 'agriculture'
    },
    {
      id: 15,
      name: 'Éco-lodge Sahara',
      location: 'Merzouga',
      rating: 4.8,
      image: 'https://www.ecolodge-palmeraie-ouarzazate.com/wp/wp-content/uploads/2024/05/ECOLODGE-PALMERAIE-OUARZAZATE-MAROC-LODGE-AFRICAIN-1030x686.jpg',
      isFavorite: false,
      description: 'Hébergement solaire dans le désert',
      category: 'Hébergement',
      type: 'eco',
      subType: 'accommodation'
    },
    {
      id: 16,
      name: 'Jardins Bio Ourika',
      location: 'Vallée de l\'Ourika',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Permaculture et plantes médicinales',
      category: 'Agriculture',
      type: 'eco',
      subType: 'agriculture'
    }
    ],
    suggestions: [
        {
      id: 21,
      name: 'Tourisme Solidaire',
      location: 'Anti-Atlas',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Voyage responsable avec les communautés',
      category: 'Solidaire',
      type: 'eco',
      subType: 'sustainable'
    },
    {
      id: 22,
      name: 'Éco-Randonnée',
      location: 'Rif',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Randonnée écologique préservant la nature',
      category: 'Nature',
      type: 'eco',
      subType: 'nature'
    },
    {
      id: 23,
      name: 'Ferme Biologique',
      location: 'Souss',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
      isFavorite: true,
      description: 'Agriculture biologique et durable',
      category: 'Agriculture',
      type: 'eco',
      subType: 'agriculture'
    },
    {
      id: 24,
      name: 'Campement Éco',
      location: 'Zagora',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop',
      isFavorite: false,
      description: 'Hébergement écologique dans le désert',
      category: 'Hébergement',
      type: 'eco',
      subType: 'accommodation'
    },
    ]
  }
};