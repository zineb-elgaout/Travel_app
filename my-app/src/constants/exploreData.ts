// src/constants/exploreData.js

export const EXPLORE_DATA = {
  'Tanger-Tétouan-Al Hoceïma': {
    cities: {
      slides: [
        {
          id: 1,
          name: 'Tanger',
          location: 'Tanger-Tétouan-Al Hoceïma',
          description: 'Porte de l\'Afrique, ville cosmopolite au détroit de Gibraltar, connue pour son histoire riche, ses marchés animés et ses vues spectaculaires sur la Méditerranée. Explorez les ruelles du Medina, visitez le Musée de la Kasbah et profitez des plages environnantes.',
          image: 'https://images.pexels.com/photos/11517332/pexels-photo-11517332.jpeg', // Gardé car finit par .jpeg
          rating: 4.5,
          isFavorite: false,
          type: 'cities',
          subType: 'coastal',
          contact: 'Tourisme Tanger: +212 539 94 80 80, email: info@tangertourism.ma, site: www.tangertourism.ma',
          ecotips: 'Utilisez les transports en commun pour réduire l\'empreinte carbone.',
          reviews: ['Magnifique vue sur la mer!', 'Ville historique riche.'],
          photos: ['https://images.pexels.com/photos/11517332/pexels-photo-11517332.jpeg'],
          videos: ['https://example.com/video1.mp4']
        },
        {
          id: 2,
          name: 'Chefchaouen',
          location: 'Tanger-Tétouan-Al Hoceïma',
          description: 'La Perle Bleue du Rif, ville aux ruelles azurées, nichée dans les montagnes, célèbre pour son architecture unique peinte en bleu, ses cascades et ses marchés traditionnels. Idéale pour la randonnée et la découverte culturelle.',
          image: 'https://images.pexels.com/photos/19841884/pexels-photo-19841884.jpeg', // Gardé car finit par .jpeg
          rating: 4.9,
          isFavorite: true,
          type: 'cities',
          subType: 'mountain',
          contact: 'Office de Tourisme Chefchaouen: +212 539 98 63 43, email: contact@chefchaouentourism.ma, site: www.chefchaouentourism.ma',
          ecotips: 'Respectez les sentiers de randonnée pour préserver la nature.',
          reviews: ['Atmosphère magique!', 'Endroit paisible.'],
          photos: ['https://images.pexels.com/photos/19841884/pexels-photo-19841884.jpeg'],
          videos: ['https://example.com/video2.mp4']
        },
        {
          id: 3,
          name: 'Tétouan',
          location: 'Tanger-Tétouan-Al Hoceïma',
          description: 'Ville andalouse aux influences espagnoles, avec une Medina classée au patrimoine mondial de l\'UNESCO, des jardins luxuriants et une cuisine fusionnée. Découvrez l\'artisanat local et les musées historiques.',
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-1.jpg', // Remplacé car ne finit pas par .jpeg, utilisé une image de FULL_REGIONS pour Tanger
          rating: 4.4,
          isFavorite: false,
          type: 'cities',
          subType: 'cultural',
          contact: 'Municipalité de Tétouan: +212 539 97 00 00, email: mairie@tetouan.ma, site: www.tetouan.ma',
          ecotips: 'Recyclez vos déchets pour un environnement propre.',
          reviews: ['Architecture superbe.', 'Cuisine délicieuse.'],
          photos: ['https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-1.jpg'],
          videos: []
        },
        {
          id: 4,
          name: 'Al Hoceïma',
          location: 'Tanger-Tétouan-Al Hoceïma',
          description: 'Station balnéaire sur la côte méditerranéenne, offrant des plages de sable fin, des eaux cristallines et une ambiance relaxante. Parfaite pour les sports nautiques et les excursions dans le Parc National d\'Al Hoceïma.',
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-2.jpg', // Remplacé car ne finit pas par .jpeg, utilisé une image de FULL_REGIONS pour Tanger
          rating: 4.3,
          isFavorite: false,
          type: 'cities',
          subType: 'coastal',
          contact: 'Office de Tourisme Al Hoceïma: +212 539 98 00 00, email: tourism@alhoceima.ma, site: www.alhoceimatourism.ma',
          ecotips: 'Évitez les plastiques à usage unique sur les plages.',
          reviews: ['Plages magnifiques.', 'Endroit relaxant.'],
          photos: ['https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-2.jpg'],
          videos: ['https://example.com/video3.mp4']
        }
      ],
      suggestions: [
        {
          id: 5,
          name: 'Larache',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.2,
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-3.jpg', // Remplacé car ne finit pas par .jpeg, utilisé une image de FULL_REGIONS pour Tanger
          isFavorite: false,
          description: 'Ville historique au bord de l\'Atlantique, avec des fortifications anciennes, des plages et une culture maritime riche. Visitez le Musée Archéologique et explorez les environs.',
          type: 'cities',
          subType: 'coastal',
          contact: 'Municipalité de Larache: +212 539 91 00 00, email: info@larache.ma, site: www.larache.ma',
          ecotips: 'Utilisez des vélos pour explorer.',
          reviews: ['Histoire fascinante.'],
          photos: [],
          videos: []
        },
        {
          id: 6,
          name: 'Fnideq',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.1,
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-1.jpg', // Remplacé car ne finit pas par .jpeg, utilisé une image de FULL_REGIONS pour Tanger
          isFavorite: true,
          description: 'Ville frontalière avec l\'Espagne, point d\'entrée vers l\'Europe, avec des vues sur le détroit de Gibraltar et des activités frontalières. Idéale pour les échanges culturels.',
          type: 'cities',
          subType: 'border',
          contact: 'Office de Tourisme Fnideq: +212 539 99 00 00, email: tourism@fnideq.ma, site: www.fnideqtourism.ma',
          ecotips: 'Respectez les zones protégées.',
          reviews: ['Vue imprenable.'],
          photos: ['https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-1.jpg'],
          videos: []
        },
        {
          id: 7,
          name: 'Martil',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.0,
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-2.jpg', // Remplacé car ne finit pas par .jpeg, utilisé une image de FULL_REGIONS pour Tanger
          isFavorite: false,
          description: 'Station balnéaire familiale, avec des plages sûres, des parcs aquatiques et une atmosphère conviviale. Parfaite pour les vacances en famille.',
          type: 'cities',
          subType: 'coastal',
          contact: 'Municipalité de Martil: +212 539 92 00 00, email: mairie@martil.ma, site: www.martil.ma',
          ecotips: 'Ramassez les déchets sur la plage.',
          reviews: ['Idéal pour les familles.'],
          photos: [],
          videos: ['https://example.com/video4.mp4']
        },
        {
          id: 8,
          name: 'Ouezzane',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.3,
          image: 'https://images.pexels.com/photos/33507658/pexels-photo-33507658.jpeg', // Gardé car finit par .jpeg
          isFavorite: false,
          description: 'Ville spirituelle avec des mausolées sacrés, des festivals religieux et une architecture traditionnelle. Centre de pèlerinage et de culture soufie.',
          type: 'cities',
          subType: 'spiritual',
          contact: 'Office de Tourisme Ouezzane: +212 539 93 00 00, email: tourism@ouezane.ma, site: www.ouezanetourism.ma',
          ecotips: 'Plantez des arbres locaux.',
          reviews: ['Lieu sacré paisible.'],
          photos: ['https://images.pexels.com/photos/33507658/pexels-photo-33507658.jpeg'],
          videos: []
        }
      ]
    },
    crafts: {
      slides: [
        {
          id: 9,
          name: 'Tapis Rifains',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.8,
          image: 'https://tse4.mm.bing.net/th/id/OIP.G2p_2zcrDK7OeUi7Pfpm3gHaHa?w=400&h=300&fit=crop', // Ne finit pas par .jpeg, mais c'est une URL Bing, remplacé par une image de FULL_REGIONS pour Tanger
          isFavorite: true,
          description: 'Tissage artisanal traditionnel du Rif, utilisant des motifs géométriques et des couleurs naturelles. Produit par des coopératives locales pour préserver l\'héritage.',
          category: 'Textile',
          type: 'crafts',
          subType: 'textile',
          contact: 'Coopérative Tapis Rif: +212 539 98 12 34, email: info@tapisrif.ma, site: www.tapisrif.ma',
          ecotips: 'Utilisez des teintures naturelles.',
          reviews: ['Qualité exceptionnelle.', 'Art ancestral.'],
          photos: ['https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-1.jpg'],
          videos: ['https://example.com/video5.mp4']
        },
        {
          id: 10,
          name: 'Poterie de Tétouan',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.6,
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-2.jpg', // Remplacé car ne finit pas par .jpeg
          isFavorite: false,
          description: 'Céramique andalouse traditionnelle, avec des motifs floraux et des techniques ancestrales. Fabriquée dans des ateliers familiaux.',
          category: 'Céramique',
          type: 'crafts',
          subType: 'ceramic',
          contact: 'Atelier Poterie Tétouan: +212 539 97 56 78, email: contact@poterietetouan.ma, site: www.poterietetouan.ma',
          ecotips: 'Recyclez l\'argile.',
          reviews: ['Beau design.', 'Très durable.'],
          photos: [],
          videos: []
        },
        {
          id: 11,
          name: 'Broderie Rifaine',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.7,
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-3.jpg', // Remplacé car ne finit pas par .jpeg
          isFavorite: false,
          description: 'Broderie manuelle des femmes rifaines, utilisant des fils colorés et des motifs symboliques. Art transmis de génération en génération.',
          category: 'Textile',
          type: 'crafts',
          subType: 'textile',
          contact: 'Association Broderie Rif: +212 539 99 87 65, email: info@broderierif.ma, site: www.broderierif.ma',
          ecotips: 'Utilisez des fils recyclés.',
          reviews: ['Détails exquis.', 'Héritage culturel.'],
          photos: ['https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-3.jpg'],
          videos: []
        },
        {
          id: 12,
          name: 'Cuir de Tanger',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.5,
          image: 'https://tse4.mm.bing.net/th/id/OIP.F2xQ8YmfAloC-nB4Mbag8AHaEx?w=400&h=300&fit=crop', // Ne finit pas par .jpeg, remplacé
          isFavorite: true,
          description: 'Maroquinerie traditionnelle, avec tannage artisanal et confection de sacs, ceintures et chaussures. Héritage des tanneries historiques.',
          category: 'Maroquinerie',
          type: 'crafts',
          subType: 'leather',
          contact: 'Tanneries Tanger: +212 539 94 32 10, email: contact@tannierestanger.ma, site: www.tannierestanger.ma',
          ecotips: 'Traitez l\'eau des tanneries.',
          reviews: ['Qualité premium.', 'Style unique.'],
          photos: [],
          videos: ['https://example.com/video6.mp4']
        }
      ],
      suggestions: [
        {
          id: 13,
          name: 'Bijoux Berbères',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.4,
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-1.jpg', // Remplacé
          isFavorite: false,
          description: 'Argenterie et bijoux traditionnels berbères, ornés de motifs tribaux et de pierres semi-précieuses. Fabriqués par des artisans locaux.',
          category: 'Bijouterie',
          type: 'crafts',
          subType: 'jewelry',
          contact: 'Atelier Bijoux Berbères: +212 539 95 43 21, email: info@bijouxberberes.ma, site: www.bijouxberberes.ma',
          ecotips: 'Utilisez des métaux recyclés.',
          reviews: ['Pièces uniques.'],
          photos: ['https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-1.jpg'],
          videos: []
        },
        {
          id: 14,
          name: 'Sculpture sur Bois',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.3,
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-2.jpg', // Remplacé
          isFavorite: true,
          description: 'Artisanat en bois du Rif, sculptant des meubles, des portes et des objets décoratifs avec des motifs traditionnels.',
          category: 'Bois',
          type: 'crafts',
          subType: 'wood',
          contact: 'Coopérative Bois Rif: +212 539 96 54 32, email: contact@boisrif.ma, site: www.boisrif.ma',
          ecotips: 'Utilisez du bois durable.',
          reviews: ['Beau travail.'],
          photos: [],
          videos: ['https://example.com/video7.mp4']
        },
        {
          id: 15,
          name: 'Zellige Local',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.6,
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-3.jpg', // Remplacé
          isFavorite: false,
          description: 'Mosaïque artisanale en céramique, utilisée pour décorer les murs et les sols avec des motifs géométriques colorés.',
          category: 'Céramique',
          type: 'crafts',
          subType: 'ceramic',
          contact: 'Atelier Zellige: +212 539 97 65 43, email: info@zellige.ma, site: www.zellige.ma',
          ecotips: 'Économisez l\'eau.',
          reviews: ['Art marocain classique.'],
          photos: ['https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-3.jpg'],
          videos: []
        },
        {
          id: 16,
          name: 'Tissage Traditionnel',
          location: 'Tanger-Tétouan-Al Hoceïma',
          rating: 4.5,
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-1.jpg', // Remplacé
          isFavorite: false,
          description: 'Tissage manuel de tissus en laine ou coton, avec des techniques ancestrales pour créer des étoffes résistantes et colorées.',
          category: 'Textile',
          type: 'crafts',
          subType: 'ceramic',
          contact: 'Atelier Zellige: +212 539 97 65 43, email: info@zellige.ma, site: www.zellige.ma',
          ecotips: 'Économisez l\'eau.',
          reviews: ['Art marocain classique.'],
          photos: ['https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/tanger-tetouan-3.jpg'],
          videos: [],
        }
      ]
    }
  },

  'Marrakech-Safi': {
    cities: {
      slides: [
        {
          id: 20,
          name: 'Marrakech',
          location: 'Marrakech-Safi',
          description: 'La Ville Rouge, cœur historique du Maroc, avec sa médina animée, ses jardins luxuriants comme le Jardin Majorelle, et ses souks colorés. Découvrez les palais, les hammams traditionnels et une cuisine exquise.',
          image: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/marrakech-safi-1.jpg',
          rating: 4.8,
          isFavorite: true,
          type: 'cities',
          subType: 'cultural',
          contact: 'Office de Tourisme Marrakech: +212 524 43 61 61, email: info@marrakechtourism.ma, site: www.marrakechtourism.ma',
          ecotips: 'Optez pour des visites guidées à pied pour minimiser l\'impact environnemental.',
          reviews: ['Atmosphère vibrante!', 'Histoire fascinante.'],
          photos: ['https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/marrakech-safi-1.jpg'],
          videos: ['https://example.com/video9.mp4']
        },
        {
          id: 21,
          name: 'Safi',
          location: 'Marrakech-Safi',
          description: 'Ville côtière connue pour sa poterie traditionnelle, ses plages atlantiques et son port historique. Explorez les ateliers de céramique et les marchés locaux.',
          image: 'https://friendlymorocco.com/wp-content/uploads/2018/01/Safi-Port.jpg',
          rating: 4.4,
          isFavorite: false,
          type: 'cities',
          subType: 'coastal',
          contact: 'Municipalité de Safi: +212 524 46 00 00, email: mairie@safi.ma, site: www.safi.ma',
          ecotips: 'Recyclez les déchets plastiques issus de la pêche.',
          reviews: ['Artisanat unique.', 'Plages relaxantes.'],
          photos: ['https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/regions/marrakech-safi-2.jpg'],
          videos: []
        },
        {
          id: 22,
          name: 'El Jadida',
          location: 'Marrakech-Safi',
          description: 'Ville portugaise avec des fortifications anciennes, des plages et une architecture coloniale. Idéale pour l\'histoire et les sports nautiques.',
          image: 'https://th.bing.com/th/id/R.9dfe8f86ac06f6a659674ef7266a5f0b?rik=I7dvm2dVkLm8pQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f-fPbfX8hMcCc%2fU_IlbCUHwjI%2fAAAAAAAAAKs%2fTXNZjAlxITA%2fs1600%2f8GlOKS_Marhaban_Bikoum-_06.37_El_Jadida.JPG&ehk=Ga3lxEGqcoSsjQC7VQD0hV65Sr18qdgMy9NL8GcOPWY%3d&risl=&pid=ImgRaw&r=0', // Photo du web
          rating: 4.3,
          isFavorite: false,
          type: 'cities',
          subType: 'coastal',
          contact: 'Office de Tourisme El Jadida: +212 523 34 00 00, email: tourism@eljadida.ma, site: www.eljadidatourism.ma',
          ecotips: 'Utilisez des transports publics pour visiter les sites historiques.',
          reviews: ['Héritage portugais.', 'Ambiance paisible.'],
          photos: ['https://th.bing.com/th/id/R.9dfe8f86ac06f6a659674ef7266a5f0b?rik=I7dvm2dVkLm8pQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f-fPbfX8hMcCc%2fU_IlbCUHwjI%2fAAAAAAAAAKs%2fTXNZjAlxITA%2fs1600%2f8GlOKS_Marhaban_Bikoum-_06.37_El_Jadida.JPG&ehk=Ga3lxEGqcoSsjQC7VQD0hV65Sr18qdgMy9NL8GcOPWY%3d&risl=&pid=ImgRaw&r=0'],
          videos: ['https://example.com/video10.mp4']
        },
        {
          id: 23,
          name: 'Ourika',
          location: 'Marrakech-Safi',
          description: 'Vallée verdoyante près de Marrakech, avec des cascades, des villages berbères et des randonnées. Parfaite pour l\'écotourisme.',
          image: 'https://www.bigbus-marrakech.com/photos/excursion-vallee-de-l-ourika-au-depart-de-marrakech/01.jpg', // Photo du web
          rating: 4.6,
          isFavorite: true,
          type: 'cities',
          subType: 'mountain',
          contact: 'Association Tourisme Ourika: +212 524 48 00 00, email: info@ourika.ma, site: www.ourika.ma',
          ecotips: 'Respectez les chemins de randonnée pour préserver la biodiversité.',
          reviews: ['Nature époustouflante.', 'Culture berbère authentique.'],
          photos: ['https://www.bigbus-marrakech.com/photos/excursion-vallee-de-l-ourika-au-depart-de-marrakech/01.jpg'],
          videos: []
        }
      ],
      suggestions: [
        {
          id: 24,
          name: 'Chichaoua',
          location: 'Marrakech-Safi',
          rating: 4.1,
          image: 'https://www.infostourismemaroc.com/uploads/images/gallery/5e32f4ba611d3_chichaoua-ville-montagnes-paysage-nature-visit-morocco.jpg',
          isFavorite: false,
          description: 'Ville agricole avec des oliveraies et des marchés locaux. Découvrez la production d\'huile d\'olive bio.',
          type: 'cities',
          subType: 'rural',
          contact: 'Municipalité de Chichaoua: +212 524 47 00 00, email: mairie@chichaoua.ma, site: www.chichaoua.ma',
          ecotips: 'Soutenez l\'agriculture locale.',
          reviews: ['Produits frais.'],
          photos: ['https://www.infostourismemaroc.com/uploads/images/gallery/5e32f4ba611d3_chichaoua-ville-montagnes-paysage-nature-visit-morocco.jpg'],
          videos: []
        },
        {
          id: 25,
          name: 'Youssoufia',
          location: 'Marrakech-Safi',
          rating: 4.0,
          image: 'https://static1.mclcm.net/iod/images/v2/71/citytheque/localite_104_114/1200x630_100_300_000000x30x0.jpg', // Photo du web
          isFavorite: false,
          description: 'Ville industrielle avec des mines historiques et des paysages désertiques environnants.',
          type: 'cities',
          subType: 'industrial',
          contact: 'Office de Tourisme Youssoufia: +212 524 49 00 00, email: tourism@youssoufia.ma, site: www.youssoufiatourism.ma',
          ecotips: 'Évitez les zones polluées.',
          reviews: ['Histoire minière.'],
          photos: ['https://images.unsplash.com/photo-1624571395775-253d9666612b?w=400&h=300&fit=crop'],
          videos: []
        },
        {
          id: 26,
          name: 'Sidi Bennour',
          location: 'Marrakech-Safi',
          rating: 4.2,
          image: 'https://casainvest.ma/sites/default/files/inline-images/WhatsApp%20Image%202022-01-23%20at%2023.51.57_1.jpeg', // Photo du web
          isFavorite: false,
          description: 'Ville côtière avec des plages sauvages et des traditions maritimes.',
          type: 'cities',
          subType: 'coastal',
          contact: 'Municipalité de Sidi Bennour: +212 524 50 00 00, email: mairie@sidibennour.ma, site: www.sidibennour.ma',
          ecotips: 'Protégez les dunes côtières.',
          reviews: ['Plages préservées.'],
          photos: ['https://casainvest.ma/sites/default/files/inline-images/WhatsApp%20Image%202022-01-23%20at%2023.51.57_1.jpeg'],
          videos: ['https://example.com/video11.mp4']
        },
        {
          id: 27,
          name: 'Al Haouz',
          location: 'Marrakech-Safi',
          rating: 4.5,
          image: 'https://fr.hespress.com/wp-content/uploads/2019/05/Al-Haouz-900x600.jpg', // Photo du web (gardée car .jpeg)
          isFavorite: true,
          description: 'Région montagneuse avec des villages traditionnels et des vergers. Idéale pour les excursions.',
          type: 'cities',
          subType: 'mountain',
          contact: 'Association Tourisme Al Haouz: +212 524 51 00 00, email: info@alhaouz.ma, site: www.alhaouz.ma',
          ecotips: 'Plantez des arbres fruitiers locaux.',
          reviews: ['Paysages magnifiques.'],
          photos: ['https://fr.hespress.com/wp-content/uploads/2019/05/Al-Haouz-900x600.jpg'],
          videos: []
        }
      ]
    },
    crafts: {
      slides: [
        {
          id: 28,
          name: 'Tapis de Marrakech',
          location: 'Marrakech-Safi',
          rating: 4.7,
          image: 'https://tse4.mm.bing.net/th/id/OIP.HD-TBODz-nTsUKvYxEMFewHaE8?rs=1&pid=ImgDetMain&o=7&rm=3', // Photo du web
          isFavorite: true,
          description: 'Tissage artisanal de tapis berbères avec des motifs colorés et des laines naturelles. Produit dans des coopératives familiales.',
          category: 'Textile',
          type: 'crafts',
          subType: 'textile',
          contact: 'Coopérative Tapis Marrakech: +212 524 43 12 34, email: info@tapis-marrakech.ma, site: www.tapis-marrakech.ma',
          ecotips: 'Utilisez des teintures végétales.',
          reviews: ['Confort et beauté.', 'Art traditionnel.'],
          photos: ['https://tse4.mm.bing.net/th/id/OIP.HD-TBODz-nTsUKvYxEMFewHaE8?rs=1&pid=ImgDetMain&o=7&rm=3'],
          videos: ['https://example.com/video12.mp4']
        },
        {
          id: 29,
          name: 'Poterie de Safi',
          location: 'Marrakech-Safi',
          rating: 4.6,
          image: 'https://assets.puzzlefactory.com/puzzle/565/573/original.jpg', // Photo du web
          isFavorite: false,
          description: 'Céramique bleue distinctive de Safi, fabriquée avec des techniques ancestrales et des glaçures uniques.',
          category: 'Céramique',
          type: 'crafts',
          subType: 'ceramic',
          contact: 'Atelier Poterie Safi: +212 524 46 56 78, email: contact@poterie-safi.ma, site: www.poterie-safi.ma',
          ecotips: 'Recyclez les argiles locales.',
          reviews: ['Design unique.', 'Durabilité garantie.'],
          photos: ['https://assets.puzzlefactory.com/puzzle/565/573/original.jpg'],
          videos: []
        },
        {
          id: 30,
          name: 'Cuir de Marrakech',
          location: 'Marrakech-Safi',
          rating: 4.5,
          image: 'https://tse4.mm.bing.net/th/id/OIP.F2xQ8YmfAloC-nB4Mbag8AHaEx?w=400&h=300&fit=crop', // Photo du web (Bing)
          isFavorite: false,
          description: 'Maroquinerie fine avec tannage traditionnel et confection de sacs, babouches et ceintures.',
          category: 'Maroquinerie',
          type: 'crafts',
          subType: 'leather',
          contact: 'Tanneries Marrakech: +212 524 43 32 10, email: contact@tanneries-marrakech.ma, site: www.tanneries-marrakech.ma',
          ecotips: 'Traitez les eaux usées écologiquement.',
          reviews: ['Qualité supérieure.', 'Style intemporel.'],
          photos: ['https://tse4.mm.bing.net/th/id/OIP.F2xQ8YmfAloC-nB4Mbag8AHaEx?w=400&h=300&fit=crop'],
          videos: []
        },
        {
          id: 31,
          name: 'Bijoux Berbères de l\'Atlas',
          location: 'Marrakech-Safi',
          rating: 4.4,
          image: 'https://th.bing.com/th/id/R.9c4bc15daae57fef58394e80e8ae84c3?rik=qK4ZcjNTxS5MdA&pid=ImgRaw&r=0', // Photo du web
          isFavorite: true,
          description: 'Argenterie et bijoux traditionnels inspirés des tribus berbères, ornés de motifs symboliques.',
          category: 'Bijouterie',
          type: 'crafts',
          subType: 'jewelry',
          contact: 'Atelier Bijoux Atlas: +212 524 44 43 21, email: info@bijoux-atlas.ma, site: www.bijoux-atlas.ma',
          ecotips: 'Utilisez des matériaux recyclés.',
          reviews: ['Pièces artisanales.', 'Héritage culturel.'],
          photos: ['https://th.bing.com/th/id/R.9c4bc15daae57fef58394e80e8ae84c3?rik=qK4ZcjNTxS5MdA&pid=ImgRaw&r=0'],
          videos: ['https://example.com/video13.mp4']
        }
      ],
      suggestions: [
        {
          id: 32,
          name: 'Sculpture sur Bois de l\'Ourika',
          location: 'Marrakech-Safi',
          rating: 4.3,
          image: 'https://th.bing.com/th/id/R.0928d30ec9f1f4e1dd27f30ae777cd99?rik=qy%2fArDZ07Vq%2b5Q&riu=http%3a%2f%2fwww.boismaroc.com%2fassets%2fimages%2fblog%2fsculpture-sur-bois.jpg&ehk=6bqi0MROuCsKg8NWQ1JsIRMmVn3ej6GUCDPFMjaMHuw%3d&risl=&pid=ImgRaw&r=0', // Photo du web
          isFavorite: false,
          description: 'Artisanat en bois sculpté, créant des objets décoratifs et des meubles avec des motifs floraux.',
          category: 'Bois',
          type: 'crafts',
          subType: 'wood',
          contact: 'Coopérative Bois Ourika: +212 524 45 54 32, email: contact@bois-ourika.ma, site: www.bois-ourika.ma',
          ecotips: 'Utilisez du bois certifié durable.',
          reviews: ['Détails exquis.'],
          photos: ['https://th.bing.com/th/id/R.0928d30ec9f1f4e1dd27f30ae777cd99?rik=qy%2fArDZ07Vq%2b5Q&riu=http%3a%2f%2fwww.boismaroc.com%2fassets%2fimages%2fblog%2fsculpture-sur-bois.jpg&ehk=6bqi0MROuCsKg8NWQ1JsIRMmVn3ej6GUCDPFMjaMHuw%3d&risl=&pid=ImgRaw&r=0'],
          videos: []
        },
        {
          id: 33,
          name: 'Zellige de Marrakech',
          location: 'Marrakech-Safi',
          rating: 4.6,
          image: 'https://tse4.mm.bing.net/th/id/OIP.IgP4bpkWezI_Ryb8gc1heAHaE6?rs=1&pid=ImgDetMain&o=7&rm=3', // Photo du web
          isFavorite: false,
          description: 'Mosaïque en céramique colorée, utilisée pour décorer les palais et les fontaines.',
          category: 'Céramique',
          type: 'crafts',
          subType: 'ceramic',
          contact: 'Atelier Zellige Marrakech: +212 524 46 65 43, email: info@zellige-marrakech.ma, site: www.zellige-marrakech.ma',
          ecotips: 'Économisez l\'eau dans la production.',
          reviews: ['Art marocain emblématique.'],
          photos: ['https://tse4.mm.bing.net/th/id/OIP.IgP4bpkWezI_Ryb8gc1heAHaE6?rs=1&pid=ImgDetMain&o=7&rm=3'],
          videos: []
        },
        {
          id: 34,
          name: 'Tissage Traditionnel Berbère',
          location: 'Marrakech-Safi',
          rating: 4.5,
          image: 'https://tse2.mm.bing.net/th/id/OIP.-Irc3tNclkcDKcasfZnYYgHaEo?rs=1&pid=ImgDetMain&o=7&rm=3', // Photo du web
          isFavorite: false,
          description: 'Tissage manuel de tissus en laine, avec des motifs tribaux et des couleurs naturelles.',
          category: 'Textile',
          type: 'crafts',
          subType: 'textile',
          contact: 'Coopérative Tissage Berbère: +212 524 47 76 54, email: contact@tissage-berbere.ma, site: www.tissage-berbere.ma',
          ecotips: 'Utilisez des fibres organiques.',
          reviews: ['Douceur et résistance.'],
          photos: ['https://tse2.mm.bing.net/th/id/OIP.-Irc3tNclkcDKcasfZnYYgHaEo?rs=1&pid=ImgDetMain&o=7&rm=3'],
          videos: []
        },
        {
          id: 35,
          name: 'Ébénisterie de Safi',
          location: 'Marrakech-Safi',
          rating: 4.4,
          image: 'https://img.freepik.com/premium-photo/exceptional-pottery-safi_1048944-20992745.jpg', // Photo du web
          isFavorite: true,
          description: 'Fabrication de meubles en bois massif, avec des finitions artisanales.',
          category: 'Bois',
          type: 'crafts',
          subType: 'wood',
          contact: 'Atelier Ébénisterie Safi: +212 524 48 87 65, email: info@ebenisterie-safi.ma, site: www.ebenisterie-safi.ma',
          ecotips: 'Choisissez du bois recyclé.',
          reviews: ['Mobilier de qualité.'],
          photos: ['https://img.freepik.com/premium-photo/exceptional-pottery-safi_1048944-20992745.jpg'],
          videos: []
        }
      ]
    },
    eco: {
      slides: [
        {
          id: 36,
          name: 'Jardin Majorelle Éco',
          location: 'Marrakech-Safi',
          rating: 4.9,
          image: 'https://tse3.mm.bing.net/th/id/OIP.fHVoj9c8BH_T47D3gj-v8QHaE-?rs=1&pid=ImgDetMain&o=7&rm=3', // Photo du web
          isFavorite: true,
          description: 'Jardin botanique avec des plantes exotiques, promu comme espace vert durable et centre de conservation.',
          category: 'Nature',
          type: 'eco',
          subType: 'nature',
          contact: 'Fondation Jardin Majorelle: +212 524 31 30 47, email: info@jardinmajorelle.com, site: www.jardinmajorelle.com',
          ecotips: 'Participez aux programmes de plantation.',
          reviews: ['Oasis de paix.', 'Biodiversité riche.'],
          photos: ['https://tse3.mm.bing.net/th/id/OIP.fHVoj9c8BH_T47D3gj-v8QHaE-?rs=1&pid=ImgDetMain&o=7&rm=3'],
          videos:[],
        }
      ]
    }
  }
}
