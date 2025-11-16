import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import {Header, SearchBar, RegionCard, EmptyRegion } from '../components/explore/index';

import { useRegions } from '../hooks/useRegions';
import BottomTabBar from '../components/BottomTabBar';
import MenuSidebar from '../components/MenuSidebar';

export default function RegionSelectorScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const { filteredRegions } = useRegions(searchQuery);

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#1d4c4c', '#000']}
        style={{ flex: 1 }}
      >
        <SafeAreaView className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 110 }}
          >
            {/* HEADER */}
            <Header onMenu={() => setMenuVisible(true)} />

            <View className="px-5">
              <Text className="text-3xl font-bold text-white leading-[42px] mb-3" style={{ fontFamily: 'Georgia' }}>
                    Salam{' '}
                    <Text style={{ fontFamily: 'Georgia', color: '#eed753', fontStyle: 'italic' }}>
                      Zineb
                    </Text>{' '}
                    ! What do you want to explore ?
                  </Text>

              <Text className="text-base text-white/90 mb-5">
                Tapez votre région pour explorer les villes et activités
              </Text>

              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </View>

            {/* CONTENT */}
            <View className="bg-white rounded-t-3xl pt-5 px-5 mt-7">
              <Text className="text-2sm font-bold text-gray-900 mb-6 ml-1">
                All regions
              </Text>

              {filteredRegions.length > 0 ? (
                filteredRegions.map((region) => (
                  <RegionCard key={region.id} region={region} />
                ))
              ) : (
                
                <EmptyRegion />
              )}
            </View>
          </ScrollView>

          {/* MENU */}
          <MenuSidebar visible={menuVisible} onClose={() => setMenuVisible(false)} />

          {/* FOOTER */}
          <BottomTabBar currentRoute="/explore" />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
