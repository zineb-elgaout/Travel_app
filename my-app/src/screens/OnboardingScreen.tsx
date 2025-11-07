// src/screens/OnboardingScreen.tsx
import { Text, View, TouchableOpacity, ImageBackground, Dimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent, GestureResponderEvent } from 'react-native';
import { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';

const { width: screenWidth } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const slides = [
    {
      image:  require('../../assets/images/riad.jpg'),
      color: '#ffffff',
      titleKey: 'slide1_title',
      subtitleKey: 'slide1_subtitle',
      descKey: 'slide1_desc',
    },
    {
      image: require('../../assets/images/chawen.jpg'),
      color: '#ffffff',
      titleKey: 'slide2_title',
      subtitleKey: 'slide2_subtitle',
      descKey: 'slide2_desc',
    },
    {
      image:  require('../../assets/images/marakech.jpg'),
      color: '#F59E0B',
      titleKey: 'slide3_title',
      subtitleKey: 'slide3_subtitle',
      descKey: 'slide3_desc',
    },
    {
      image:  require('../../assets/images/tborida.jpg'),
      color: '#F59E0B',
      titleKey: 'slide4_title',
      subtitleKey: 'slide4_subtitle',
      descKey: 'slide4_desc',
    },
    {
      image: require('../../assets/images/sahara.jpg'),
      color: '#F59E0B',
      titleKey: 'slide5_title',
      subtitleKey: 'slide5_subtitle',
      descKey: 'slide5_desc',
    },
    {
      image:  require('../../assets/images/ozod.jpg'),
      color: '#ffffff',
      titleKey: 'slide6_title',
      subtitleKey: 'slide6_subtitle',
      descKey: 'slide6_desc',
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentSlide(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      const nextIndex = currentSlide + 1;
      setCurrentSlide(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      const prevIndex = currentSlide - 1;
      setCurrentSlide(prevIndex);
      scrollViewRef.current?.scrollTo({
        x: prevIndex * screenWidth,
        animated: true,
      });
    }
  };

  const skipToEnd = () => {
    const lastIndex = slides.length - 1;
    setCurrentSlide(lastIndex);
    scrollViewRef.current?.scrollTo({
      x: lastIndex * screenWidth,
      animated: true,
    });
  };

  const handleScreenPress = (event: GestureResponderEvent) => {
    const { locationX } = event.nativeEvent;
    const screenMiddle = screenWidth / 2;
    
    if (locationX > screenMiddle) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const handleGetStarted = () => {
    router.replace('/explore');
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {slides.map((slide, index) => (
          <TouchableOpacity 
            key={index} 
            style={{ width: screenWidth }}
            activeOpacity={1}
            onPress={handleScreenPress}
          >
            <ImageBackground
              source={typeof slide.image === 'string' ? { uri: slide.image } : slide.image}
              className="flex-1"
              resizeMode="cover"
            >
              <View className="absolute inset-0 bg-black/60" />
              <View className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent" />

              <SafeAreaView className="flex-1">
                <View className="flex-1 justify-end px-6 pb-8">
                
                <View className="bg-white/10 rounded-3xl border border-white/20 p-8 mb-8">
                  
                  <View 
                    className="w-12 h-1 rounded-full mb-6"
                    style={{ 
                      backgroundColor: slide.color,
                      alignSelf: isRTL ? 'flex-end' : 'flex-start'
                    }}
                  />

                  <Text 
                    className="text-white text-5xl font-bold mb-2"
                    style={{ 
                      letterSpacing: 2,
                      textAlign: isRTL ? 'right' : 'left',
                      writingDirection: isRTL ? 'rtl' : 'ltr'
                    }}>
                    {t(slide.titleKey)}
                  </Text>

                  <Text 
                    className="text-white/70 text-sm mb-6 uppercase"
                    style={{ 
                      letterSpacing: 3,
                      textAlign: isRTL ? 'right' : 'left',
                      writingDirection: isRTL ? 'rtl' : 'ltr'
                    }}>
                    {t(slide.subtitleKey)}
                  </Text>

                  <Text 
                    className="text-white/80 text-base leading-6 mb-6"
                    style={{ 
                      textAlign: isRTL ? 'right' : 'left',
                      writingDirection: isRTL ? 'rtl' : 'ltr'
                    }}>
                    {t(slide.descKey)}
                  </Text>

                  <View className={`flex-row gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {index === slides.length - 1 ? (
                      <TouchableOpacity 
                        className="flex-1 bg-white px-6 py-4 rounded-2xl active:scale-95"
                        activeOpacity={0.9}
                        onPress={handleGetStarted}
                      >
                        <Text 
                          className="text-black text-center text-sm font-bold uppercase"
                          style={{ letterSpacing: 2 }}>
                          {t('getStarted')}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity 
                          onPress={nextSlide}
                          className="flex-1 bg-white px-6 py-4 rounded-2xl active:scale-95"
                          activeOpacity={0.9}
                        >
                          <Text 
                            className="text-black text-center text-sm font-semibold"
                            style={{ letterSpacing: 1 }}>
                            {t('next')}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          className="bg-white/20 px-6 py-4 rounded-2xl active:scale-95"
                          activeOpacity={0.8}
                          onPress={skipToEnd}
                        >
                          <Text className="text-white text-center text-sm font-semibold">
                            {t('skip')}
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>

                <View className="flex-row justify-center items-center gap-2 mb-4">
                  {slides.map((_, dotIndex) => (
                    <TouchableOpacity
                      key={dotIndex}
                      onPress={() => goToSlide(dotIndex)}
                      activeOpacity={0.7}
                    >
                      <View
                        className={`h-2 rounded-full ${
                          dotIndex === currentSlide 
                            ? 'bg-white w-8'
                            : 'bg-white/40 w-2'
                        }`}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </SafeAreaView>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}