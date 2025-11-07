// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Toutes vos traductions centralisées
const translations = {
  en: {
    // Navigation
    home: 'Home',
    explore: 'Explore',
    favorites: 'Favorites',
    profile: 'Profile',
    itinerary: 'Itinerary',
    menu: 'Menu',
    
    // Onboarding
    next: 'Next',
    skip: 'Skip',
    getStarted: 'Get Started',
    
    // Common
    welcome: 'Welcome to Morocco',
    discover: 'Discover',
    discoverMorocco: 'Discover the beauty and colors of Morocco',
    viewOnboarding: 'View Onboarding Again',
    settings: 'Settings',
    language: 'Language',
    history: 'History',
    searchDestinations: 'Search destinations...',
    
    // Categories
    all: 'All',
    cities: 'Cities',
    nature: 'Nature',
    culture: 'Culture',
    food: 'Food',
    
    // Destinations
    marrakechDesc: 'The red city of palaces and vibrant souks',
    chefchaouenDesc: 'The blue pearl of Morocco nestled in mountains',
    saharaDesc: 'Endless golden dunes under vast desert skies',
    atlasDesc: 'Majestic mountain ranges with Berber villages',
    fesDesc: 'Ancient medina and spiritual heart of Morocco',
    cuisineDesc: 'Rich flavors and aromatic spices of tradition',
    
    // Chatbot
    chatbot: 'Assistant',
    chatbotSubtitle: 'Your Morocco travel guide',
    chatbotWelcome: 'Hello! I\'m your Morocco travel assistant. How can I help you plan your journey?',
    chatbotGreeting: 'Hello! I\'m here to help you discover the wonders of Morocco. What would you like to know?',
    chatbotDefault: 'I\'d be happy to help you learn more about Morocco! You can ask me about destinations like Marrakech, the Sahara Desert, Moroccan cuisine, or travel tips.',
    typeMessage: 'Type your message...',
    marrakechInfo: 'Marrakech, known as the "Red City", is famous for its vibrant souks, historic palaces like Bahia Palace, and the bustling Jemaa el-Fnaa square. Don\'t miss the Majorelle Garden and traditional riads for accommodation.',
    saharaInfo: 'The Sahara Desert offers unforgettable experiences like camel trekking, overnight camping in Berber tents, and stunning starry nights. The best time to visit is from October to April when temperatures are milder.',
    moroccanFoodInfo: 'Moroccan cuisine is a delight! Must-try dishes include tagine (slow-cooked stew), couscous, pastilla (savory pastry), and mint tea. Don\'t forget to try traditional street food in the medinas.',
    
    // Slides
    slide1_title: 'Moroccan Riad',
    slide1_subtitle: 'Traditional Elegance',
    slide1_desc: 'Discover the architectural beauty of traditional Moroccan riads',
    
    slide2_title: 'CHEFCHAOUEN',
    slide2_subtitle: 'The Blue Pearl',
    slide2_desc: 'Wander through azure streets and discover timeless serenity',
    
    slide3_title: 'SAHARA',
    slide3_subtitle: 'Golden Dunes',
    slide3_desc: 'Experience the infinite beauty of endless golden horizons',
    
    slide4_title: 'DESERT ADVENTURE',
    slide4_subtitle: 'Sand & Stars',
    slide4_desc: 'Journey through majestic dunes under vast desert skies',
    
    slide5_title: 'SAHARA MAJESTY',
    slide5_subtitle: 'Golden Sands',
    slide5_desc: 'Embrace the mystical charm of the endless desert',
    
    slide6_title: 'ATLAS VALLEYS',
    slide6_subtitle: 'Nature Unveiled',
    slide6_desc: 'Embrace the raw elegance of mountain landscapes',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    explore: 'استكشف',
    favorites: 'المفضلة',
    profile: 'الملف الشخصي',
    itinerary: 'المسار',
    menu: 'القائمة',
    
    // Onboarding
    next: 'التالي',
    skip: 'تخطي',
    getStarted: 'ابدأ',
    
    // Common
    welcome: 'مرحبا بك في المغرب',
    discover: 'اكتشف',
    discoverMorocco: 'اكتشف جمال وألوان المغرب',
    viewOnboarding: 'عرض التقديم مرة أخرى',
    settings: 'الإعدادات',
    language: 'اللغة',
    history: 'السجل',
    searchDestinations: 'ابحث عن الوجهات...',
    
    // Categories
    all: 'الكل',
    cities: 'المدن',
    nature: 'الطبيعة',
    culture: 'الثقافة',
    food: 'الطعام',
    
    // Destinations
    marrakechDesc: 'المدينة الحمراء للقصور والأسواق النابضة بالحياة',
    chefchaouenDesc: 'اللؤلؤة الزرقاء للمغرب في الجبال',
    saharaDesc: 'كثبان ذهبية لا نهائية تحت سماء الصحراء الشاسعة',
    atlasDesc: 'سلاسل جبلية مهيبة مع القرى الأمازيغية',
    fesDesc: 'المدينة القديمة والقلب الروحي للمغرب',
    cuisineDesc: 'نكهات غنية وتوابل عطرية من التراث',
    
    // Chatbot
    chatbot: 'المساعد',
    chatbotSubtitle: 'مرشدك السياحي للمغرب',
    chatbotWelcome: 'مرحباً! أنا مساعدك السياحي للمغرب. كيف يمكنني مساعدتك في التخطيط لرحلتك؟',
    chatbotGreeting: 'مرحباً! أنا هنا لمساعدتك في اكتشاف عجائب المغرب. ماذا تريد أن تعرف؟',
    chatbotDefault: 'سأكون سعيداً بمساعدتك في التعرف أكثر على المغرب! يمكنك سؤالي عن وجهات مثل مراكش، الصحراء الكبرى، المأكولات المغربية، أو نصائح السفر.',
    typeMessage: 'اكتب رسالتك...',
    marrakechInfo: 'مراكش، المعروفة باسم "المدينة الحمراء"، تشتهر بأسواقها النابضة بالحياة، القصور التاريخية مثل قصر الباهية، وساحة جامع الفنا الصاخبة. لا تفوت حديقة ماجوريل والرياض التقليدية للإقامة.',
    saharaInfo: 'تقدم الصحراء الكبرى تجارب لا تُنسى مثل رحلات الجمال، التخييم الليلي في الخيام الأمازيغية، وليالي مرصعة بالنجوم. أفضل وقت للزيارة هو من أكتوبر إلى أبريل عندما تكون درجات الحرارة معتدلة.',
    moroccanFoodInfo: 'المطبخ المغربي متعة! تشمل الأطباق التي يجب تجربتها الطاجين (الطبق المطهو ببطء)، الكسكس، البسطيلة (المعجنات المالحة)، والشاي بالنعناع. لا تنسى تجربة الطعام التقليدي في المدن القديمة.',
    
    // Slides
    slide1_title: 'رياض مغربي',
    slide1_subtitle: 'الأناقة التقليدية',
    slide1_desc: 'اكتشف جمال العمارة المغربية التقليدية',
    
    slide2_title: 'شفشاون',
    slide2_subtitle: 'اللؤلؤة الزرقاء',
    slide2_desc: 'تجول في الشوارع الزرقاء واكتشف الصفاء الخالد',
    
    slide3_title: 'الصحراء',
    slide3_subtitle: 'الكثبان الذهبية',
    slide3_desc: 'استمتع بجمال لا نهائي للآفاق الذهبية',
    
    slide4_title: 'مغامرة الصحراء',
    slide4_subtitle: 'الرمال والنجوم',
    slide4_desc: 'رحلة عبر الكثبان المهيبة تحت سماء الصحراء الشاسعة',
    
    slide5_title: 'جلالة الصحراء',
    slide5_subtitle: 'الرمال الذهبية',
    slide5_desc: 'احتضن السحر الغامض للصحراء اللانهائية',
    
    slide6_title: 'وديان الأطلس',
    slide6_subtitle: 'الطبيعة المكشوفة',
    slide6_desc: 'احتضن الأناقة الخام للمناظر الجبلية',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      if (savedLanguage === 'ar' || savedLanguage === 'en') {
        setLanguageState(savedLanguage);
        setIsRTL(savedLanguage === 'ar');
        I18nManager.forceRTL(savedLanguage === 'ar');
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('userLanguage', lang);
      setLanguageState(lang);
      setIsRTL(lang === 'ar');
      I18nManager.forceRTL(lang === 'ar');
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};