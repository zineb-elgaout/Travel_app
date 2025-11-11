// Photos animées colorées
export const ANIMATED_IMAGES = {
  transport: 'https://res.cloudinary.com/dpkjgfhcc/image/upload/v1762902063/pexels-photo-19190382_mfnnlj.jpg',
  walking: 'https://images.pexels.com/photos/19190382/pexels-photo-19190382.jpeg',
  riads: 'https://images.pexels.com/photos/30257102/pexels-photo-30257102.jpeg',
  water: 'https://images.pexels.com/photos/14602556/pexels-photo-14602556.jpeg',
  food: 'https://images.pexels.com/photos/30574975/pexels-photo-30574975.jpeg',
  waste: 'https://images.pexels.com/photos/4502972/pexels-photo-4502972.jpeg',
  bottle: 'https://images.pexels.com/photos/4916544/pexels-photo-4916544.jpeg',
  artisan: 'https://images.pexels.com/photos/8169414/pexels-photo-8169414.jpeg',
  baskets: 'https://images.pexels.com/photos/4502967/pexels-photo-4502967.jpeg',
  quality: 'https://images.pexels.com/photos/18687094/pexels-photo-18687094.jpeg',
  heritage: 'https://images.pexels.com/photos/13811658/pexels-photo-13811658.jpeg',
  hiking: 'https://images.pexels.com/photos/1632259/pexels-photo-1632259.jpeg',
  photography: 'https://images.pexels.com/photos/4621092/pexels-photo-4621092.jpeg',
  recycling: 'https://images.pexels.com/photos/30550611/pexels-photo-30550611.jpeg',
  plastic: 'https://images.pexels.com/photos/30413959/pexels-photo-30413959.jpeg',
  beach: 'https://images.pexels.com/photos/34626734/pexels-photo-34626734.jpeg',
};

// Types TypeScript
export interface EcoTip {
  id: string;
  title: string;
  image: string;
  gradient: [string, string];
  description: string;
  longDescription: string;
  tips: string[];
}

export interface EcoTipsSection {
  id: string;
  title: string;
  subtitle: string;
  categories: EcoTip[];
}

export interface EcoTipsData {
  sections: EcoTipsSection[];
}

// Données principales
export const ecoTipsData: Record<string, EcoTipsData> = {
  en: {
    sections: [
      {
        id: 'transport',
        title: 'Getting Around',
        subtitle: 'Eco-friendly transportation options',
        categories: [
          {
            id: '1',
            title: 'Public Transport',
            image: ANIMATED_IMAGES.transport,
            gradient: ['#FF6B6B', '#FF8E53'],
            description: 'Take the bus or tram to reduce your carbon footprint.',
            longDescription: 'Using public transportation is one of the most effective ways to reduce your environmental impact while traveling. In Morocco, buses and trams are affordable, reliable, and connect major cities and tourist destinations.',
            tips: [
              'Download local transport apps for schedules',
              'Buy multi-day passes for better value',
              'Travel during off-peak hours when possible',
              'Keep small change for tickets'
            ]
          },
          {
            id: '2',
            title: 'Walk & Bike',
            image: ANIMATED_IMAGES.walking,
            gradient: ['#4ECDC4', '#44A08D'],
            description: 'Explore medinas on foot - the best way to discover Morocco.',
            longDescription: 'Walking and cycling are the most eco-friendly ways to explore Morocco\'s beautiful cities and landscapes. The medinas are best experienced on foot.',
            tips: [
              'Wear comfortable walking shoes',
              'Start early to avoid midday heat',
              'Bring a refillable water bottle',
              'Use offline maps to navigate medinas'
            ]
          },
        ]
      },
      {
        id: 'accommodation',
        title: 'Stay Green',
        subtitle: 'Sustainable accommodation choices',
        categories: [
          {
            id: '3',
            title: 'Traditional Riads',
            image: ANIMATED_IMAGES.riads,
            gradient: ['#FF9A8B', '#FF6B88'],
            description: 'Stay in riads that support local communities.',
            longDescription: 'Riads are traditional Moroccan houses with interior gardens. Staying in locally-owned riads supports the community directly and preserves architectural heritage.',
            tips: [
              'Book directly with the riad when possible',
              'Ask about their sustainability practices',
              'Support riads that employ local staff',
              'Respect the traditional architecture'
            ]
          },
          {
            id: '4',
            title: 'Save Water',
            image: ANIMATED_IMAGES.water,
            gradient: ['#74B9FF', '#0984E3'],
            description: 'Reuse towels - water is precious in Morocco.',
            longDescription: 'Water is a precious resource in Morocco, especially in desert regions. Simple actions like reusing towels make a significant difference.',
            tips: [
              'Hang towels to reuse them',
              'Take shorter showers',
              'Report any leaking faucets',
              'Use water refill stations'
            ]
          },
        ]
      },
      {
        id: 'food',
        title: 'Eat & Drink',
        subtitle: 'Sustainable dining experiences',
        categories: [
          {
            id: '5',
            title: 'Eat Local',
            image: ANIMATED_IMAGES.food,
            gradient: ['#FD79A8', '#E84393'],
            description: 'Enjoy traditional Moroccan cuisine at local spots.',
            longDescription: 'Moroccan cuisine is rich and delicious. Eating at local restaurants supports the community and reduces carbon footprint.',
            tips: [
              'Try street food from busy vendors',
              'Visit local markets for fresh produce',
              'Ask locals for restaurant recommendations',
              'Learn about traditional cooking methods'
            ]
          },
          {
            id: '6',
            title: 'No Food Waste',
            image: ANIMATED_IMAGES.waste,
            gradient: ['#FDCB6E', '#E17055'],
            description: 'Finish your tagine - food is sacred here.',
            longDescription: 'In Moroccan culture, food is considered a blessing. By finishing your meals, you respect the culture and reduce waste.',
            tips: [
              'Order smaller portions if unsure',
              'Share dishes with travel companions',
              'Ask for takeaway containers',
              'Compost when facilities are available'
            ]
          },
          {
            id: '7',
            title: 'Refill Water',
            image: ANIMATED_IMAGES.bottle,
            gradient: ['#00B894', '#00A085'],
            description: 'Use a reusable bottle and refill at your riad.',
            longDescription: 'Plastic bottle waste is a major environmental issue. A reusable bottle significantly reduces plastic waste.',
            tips: [
              'Bring a bottle with a filter',
              'Ask your riad about water quality',
              'Use water purification tablets if needed',
              'Freeze water bottles for hot days'
            ]
          },
        ]
      },
      {
        id: 'shopping',
        title: 'Shop Smart',
        subtitle: 'Conscious shopping choices',
        categories: [
          {
            id: '8',
            title: 'Buy Handmade',
            image: ANIMATED_IMAGES.artisan,
            gradient: ['#A29BFE', '#6C5CE7'],
            description: 'Support artisans - each piece tells a story.',
            longDescription: 'Moroccan craftsmanship is world-renowned. Buying directly from artisans supports traditional skills.',
            tips: [
              'Visit artisan cooperatives',
              'Ask about the making process',
              'Negotiate prices respectfully',
              'Choose quality over quantity'
            ]
          },
          {
            id: '9',
            title: 'Traditional Baskets',
            image: ANIMATED_IMAGES.baskets,
            gradient: ['#E66767', '#DC5353'],
            description: 'Use Moroccan baskets instead of plastic bags.',
            longDescription: 'Traditional Moroccan baskets are sustainable and part of cultural heritage. Perfect souvenir with purpose.',
            tips: [
              'Buy a basket at local souks',
              'Choose sturdy woven designs',
              'Use for shopping and beach trips',
              'They make great gifts too'
            ]
          },
          {
            id: '10',
            title: 'Quality Items',
            image: ANIMATED_IMAGES.quality,
            gradient: ['#FAB1A0', '#E77B67'],
            description: 'Choose fewer, authentic pieces that last.',
            longDescription: 'Invest in fewer high-quality items that will last. Supports artisans and reduces waste.',
            tips: [
              'Research authentic products beforehand',
              'Check for quality craftsmanship',
              'Ask for certificates of authenticity',
              'Consider shipping for larger items'
            ]
          },
        ]
      },
      {
        id: 'activities',
        title: 'Explore Responsibly',
        subtitle: 'Sustainable tourism activities',
        categories: [
          {
            id: '11',
            title: 'Respect Heritage',
            image: ANIMATED_IMAGES.heritage,
            gradient: ['#55EFC4', '#00B894'],
            description: 'Preserve historical sites for future generations.',
            longDescription: 'Morocco\'s historical sites are irreplaceable treasures. Respect helps preserve them for future generations.',
            tips: [
              'Follow designated paths and areas',
              'Don\'t touch ancient structures',
              'Hire licensed guides',
              'Report any damage you observe'
            ]
          },
          {
            id: '12',
            title: 'Stay on Trails',
            image: ANIMATED_IMAGES.hiking,
            gradient: ['#81ECEC', '#00CEC9'],
            description: 'Follow marked trails in Atlas Mountains.',
            longDescription: 'The Atlas Mountains are fragile environments. Staying on trails prevents erosion and protects plant life.',
            tips: [
              'Use established hiking trails only',
              'Follow your guide\'s instructions',
              'Avoid shortcuts that damage terrain',
              'Close gates behind you'
            ]
          },
          {
            id: '13',
            title: 'Photo Respectfully',
            image: ANIMATED_IMAGES.photography,
            gradient: ['#FED330', '#F7B731'],
            description: 'Ask permission before photographing people.',
            longDescription: 'While Morocco offers incredible photo opportunities, respect people\'s privacy and cultural sensitivities.',
            tips: [
              'Learn basic Arabic phrases to ask permission',
              'Be respectful in religious areas',
              'Offer to share photos with subjects',
              'Avoid photographing military sites'
            ]
          },
        ]
      },
      {
        id: 'waste',
        title: 'Reduce Waste',
        subtitle: 'Minimize your environmental footprint',
        categories: [
          {
            id: '14',
            title: 'Recycle',
            image: ANIMATED_IMAGES.recycling,
            gradient: ['#D8D8D8', '#B8B8B8'],
            description: 'Use recycling bins when available.',
            longDescription: 'While recycling infrastructure is developing, use recycling bins when you see them.',
            tips: [
              'Separate recyclables from trash',
              'Learn local recycling symbols',
              'Ask your accommodation about recycling',
              'Reduce packaging waste when possible'
            ]
          },
          {
            id: '15',
            title: 'Refuse Plastic',
            image: ANIMATED_IMAGES.plastic,
            gradient: ['#636E72', '#2D3436'],
            description: 'Say no to single-use plastic bags.',
            longDescription: 'Single-use plastics are a major pollution problem. Refusing plastic bags reduces waste.',
            tips: [
              'Carry reusable shopping bags',
              'Refuse plastic straws',
              'Bring your own utensils',
              'Choose products with minimal packaging'
            ]
          },
          {
            id: '16',
            title: 'Leave No Trace',
            image: ANIMATED_IMAGES.beach,
            gradient: ['#74B9FF', '#0984E3'],
            description: 'Keep beaches clean - pack out your trash.',
            longDescription: 'Morocco\'s beaches are stunning but face litter challenges. Take all your trash with you.',
            tips: [
              'Bring a bag for collecting trash',
              'Participate in beach cleanups',
              'Dispose of waste properly in towns',
              'Set an example for others'
            ]
          },
        ]
      },
    ]
  },
  fr: {
    sections: [
      {
        id: 'transport',
        title: 'Se Déplacer',
        subtitle: 'Options de transport écologiques',
        categories: [
          {
            id: '1',
            title: 'Transports Publics',
            image: ANIMATED_IMAGES.transport,
            gradient: ['#FF6B6B', '#FF8E53'],
            description: 'Prenez le bus ou le tram pour réduire votre empreinte.',
            longDescription: 'Utiliser les transports en commun est l\'un des moyens les plus efficaces de réduire votre impact environnemental en voyageant.',
            tips: [
              'Téléchargez les apps de transport local',
              'Achetez des pass multi-jours',
              'Voyagez en dehors des heures de pointe',
              'Gardez de la monnaie pour les billets'
            ]
          },
          {
            id: '2',
            title: 'Marchez & Vélo',
            image: ANIMATED_IMAGES.walking,
            gradient: ['#4ECDC4', '#44A08D'],
            description: 'Explorez les médinas à pied - la meilleure façon.',
            longDescription: 'Marcher et faire du vélo sont les moyens les plus écologiques d\'explorer les villes.',
            tips: [
              'Portez des chaussures confortables',
              'Partez tôt pour éviter la chaleur',
              'Apportez une gourde',
              'Utilisez des cartes hors ligne'
            ]
          },
        ]
      },
      // ... autres sections en français
    ]
  },
  ar: {
    sections: [
      {
        id: 'transport',
        title: 'التنقل',
        subtitle: 'خيارات النقل الصديقة للبيئة',
        categories: [
          {
            id: '1',
            title: 'النقل العام',
            image: ANIMATED_IMAGES.transport,
            gradient: ['#FF6B6B', '#FF8E53'],
            description: 'استخدم الحافلة أو الترامواي لتقليل الانبعاثات.',
            longDescription: 'استخدام وسائل النقل العام هو أحد أكثر الطرق فعالية لتقليل تأثيرك البيئي.',
            tips: [
              'قم بتنزيل تطبيقات النقل المحلية',
              'اشترِ تذاكر متعددة الأيام',
              'سافر خارج ساعات الذروة',
              'احتفظ بنقود صغيرة للتذاكر'
            ]
          },
          {
            id: '2',
            title: 'مشي ودراجة',
            image: ANIMATED_IMAGES.walking,
            gradient: ['#4ECDC4', '#44A08D'],
            description: 'استكشف المدن القديمة سيراً - أفضل طريقة.',
            longDescription: 'المشي وركوب الدراجات هما أكثر الطرق الصديقة للبيئة.',
            tips: [
              'ارتدِ أحذية مريحة',
              'ابدأ مبكراً لتجنب حرارة النهار',
              'أحضر زجاجة ماء قابلة لإعادة الملء',
              'استخدم خرائط دون اتصال'
            ]
          },
        ]
      },
      // ... autres sections en arabe
    ]
  },
};