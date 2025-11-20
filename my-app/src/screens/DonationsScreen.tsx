import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import BottomTabBar from '../components/BottomTabBar';
import MenuSidebar from '../components/MenuSidebar'; // Assuming it's available

const { width } = Dimensions.get('window');

// Composant FilterChip réutilisable
const FilterChip = ({ label, icon, isActive, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className={`flex-row items-center px-4 py-2.5 rounded-full ${
      isActive ? 'bg-[#1d4c4c]' : 'bg-gray-100 border border-gray-200'
    }`}
  >
    {icon && (
      <Ionicons
        name={icon}
        size={16}
        color={isActive ? '#FFF' : '#6B7280'}
        style={{ marginRight: 6 }}
      />
    )}
    <Text
      className={`text-sm font-medium ${
        isActive ? 'text-white' : 'text-gray-700'
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const carouselData = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800',
    title: 'Aidez l\'Éducation',
    subtitle: 'Transport scolaire pour les villages'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    title: 'Protégez la Nature',
    subtitle: 'Plantation d\'arganiers'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
    title: 'Accès à l\'Eau',
    subtitle: 'Construction de puits'
  }
];

export default function DonationsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);

  const categories = [
    { id: 'all', label: 'Tout', icon: 'grid-outline' },
    { id: 'education', label: 'Éducation', icon: 'school-outline' },
    { id: 'environment', label: 'Nature', icon: 'leaf-outline' },
    { id: 'community', label: 'Communauté', icon: 'people-outline' },
    { id: 'culture', label: 'Culture', icon: 'color-palette-outline' },
  ];

  const causes = [
    {
      id: '1',
      title: 'Transport Scolaire Atlas',
      subtitle: 'Villages de l\'Atlas',
      description: 'Assurer le transport quotidien de 120 étudiants.',
      goal: 50000,
      current: 32500,
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800',
      category: 'education',
      impact: '120 étudiants',
      contact: 'benevoles.atlas@example.com',
    },
    {
      id: '2',
      title: 'Plantation d\'Arganiers',
      subtitle: 'Essaouira',
      description: 'Planter 5000 arganiers pour préserver l\'écosystème.',
      goal: 30000,
      current: 18750,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      category: 'environment',
      impact: '5000 arbres',
      contact: 'benevoles.essaouira@example.com',
    },
    {
      id: '3',
      title: 'Construction de Puits',
      subtitle: 'Sud Marocain',
      description: 'Construire des puits pour l\'accès à l\'eau potable.',
      goal: 80000,
      current: 45000,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
      category: 'community',
      impact: '8 villages',
      contact: 'benevoles.sudmaroc@example.com',
    },
  ];

  const filtered = selectedCategory === 'all'
    ? causes.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
    : causes.filter(c => c.category === selectedCategory && (c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())));

  const percentage = (c: number, g: number) => (c / g) * 100;

  const handleScroll = (event) => {
    const slideSize = width - 40;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideSize);
    setActiveSlide(index);
  };

  const openModal = (cause: any) => {
    setSelectedCause(cause);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCause(null);
    setDonationAmount('');
  };

  const handleDonation = () => {
    if (!donationAmount || isNaN(Number(donationAmount))) {
      Alert.alert('Erreur', 'Veuillez entrer un montant valide.');
      return;
    }
    Alert.alert('Merci !', `Votre don de ${donationAmount} DH a été enregistré.`);
    closeModal();
  };

  const handleContact = () => {
    if (selectedCause) {
      const email = selectedCause.contact;
      Alert.alert('Contacter', `Envoyer un email à ${email}`, [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Ouvrir Email', onPress: () => {/* Logique pour ouvrir l'email */} },
      ]);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
        >
          {/* HEADER - Inspiré de ExploreScreen */}
          <View className="px-5 pt-4 pb-3 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="reorder-three-outline" size={28} color="#1d4c4c" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {/* Logique pour notifications */}}>
              <Ionicons name="notifications-outline" size={24} color="#1d4c4c" />
            </TouchableOpacity>
          </View>

          {/* TEXTE DE BIENVENUE - Inspiré de ExploreScreen */}
          <View className="px-5 mb-4">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenue sur les Dons
            </Text>
            <Text className="text-lg text-gray-600">
              Contribuez à des projets durables au Maroc
            </Text>
          </View>

          {/* SEARCH BAR - Toujours affichée, inspirée de ExploreScreen */}
          <View className="px-5 mb-4">
            <View className="bg-gray-100 rounded-full px-4 py-3 flex-row items-center">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-base"
                placeholder="Rechercher un projet..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* CAROUSEL - Conditionnel, inspiré de ExploreScreen */}
          {!searchQuery && (
            <View className="mb-6 mt-4">
              <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={width - 40}
                contentContainerStyle={{ paddingHorizontal: 8 }}
              >
                {carouselData.map((item) => (
                  <View
                    key={item.id}
                    style={{ width: width - 40, marginRight: 0 }}
                    className="rounded-2xl overflow-hidden shadow-lg ml-4"
                  >
                    <Image
                      source={{ uri: item.image }}
                      className="w-full h-64"
                      resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-black/40 justify-end p-5">
                      <Text className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia' }}>
                        {item.title}
                      </Text>
                      <Text className="text-base text-white/90">
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* DOTS INDICATOR */}
              <View className="flex-row justify-center mt-4">
                {carouselData.map((_, index) => (
                  <View
                    key={index}
                    className="h-2 rounded-full mx-1"
                    style={{
                      width: activeSlide === index ? 20 : 8,
                      backgroundColor: activeSlide === index ? '#1d4c4c' : '#ccc'
                    }}
                  />
                ))}
              </View>
            </View>
          )}

          {/* CATEGORIES - Style amélioré */}
          <View className="px-5 pb-3">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {categories.map(cat => (
                <FilterChip
                  key={cat.id}
                  label={cat.label}
                  icon={cat.icon}
                  isActive={selectedCategory === cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                />
              ))}
            </ScrollView>
          </View>

          {/* LISTE DES PROJETS - Filtrée par recherche */}
          <View className="px-5">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Tous les projets
            </Text>

            {filtered.length > 0 ? (
              filtered.map(cause => (
                <TouchableOpacity
                  key={cause.id}
                  activeOpacity={0.85}
                  onPress={() => openModal(cause)}
                  className="mb-6 rounded-2xl shadow-sm overflow-hidden"
                  style={{
                    backgroundColor: '#FFF',
                    shadowColor: '#000',
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    elevation: 3,
                  }}
                >
                  {/* IMAGE */}
                  <View className="relative">
                    <Image
                      source={{ uri: cause.image }}
                      className="w-full h-56"
                      resizeMode="cover"
                    />

                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.35)']}
                      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90 }}
                    />

                    {/* BADGE */}
                    <View className="absolute top-4 right-4 px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: 'rgba(29,76,76,0.9)' }}>
                      <Text className="text-white text-xs font-medium">{cause.impact}</Text>
                    </View>

                    {/* BARRE DE PROGRESSION */}
                    <View className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/40">
                      <View
                        style={{
                          width: `${percentage(cause.current, cause.goal)}%`,
                          backgroundColor: '#1d4c4c',
                        }}
                        className="h-full"
                      />
                    </View>
                  </View>

                  {/* CONTENU */}
                  <View className="p-5">
                    <Text className="text-[11px] uppercase tracking-widest text-gray-400 mb-1 font-medium">
                      {cause.subtitle}
                    </Text>

                    <Text className="text-lg font-light tracking-tight mb-2" style={{ color: '#1d4c4c' }}>
                      {cause.title}
                    </Text>

                    <Text className="text-sm text-gray-600 font-light leading-5 mb-4">
                      {cause.description}
                    </Text>

                    <View className="flex-row justify-between mb-4">
                      <View>
                        <Text className="text-[11px] text-gray-400 font-medium">Collecté</Text>
                        <Text className="text-base font-light" style={{ color: '#1d4c4c' }}>
                          {cause.current.toLocaleString()} DH
                        </Text>
                      </View>
                      <View className="items-end">
                        <Text className="text-[11px] text-gray-400 font-medium">Objectif</Text>
                        <Text className="text-base font-light" style={{ color: '#1d4c4c' }}>
                          {cause.goal.toLocaleString()} DH
                        </Text>
                      </View>
                    </View>

                    {/* Bouton Faire un don dans chaque élément */}
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => openModal(cause)}
                      className="py-3 rounded-xl items-center"
                      style={{ backgroundColor: '#1d4c4c' }}
                    >
                      <Text className="text-white text-sm font-medium tracking-wide">
                        Faire un don
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="items-center py-10">
                <Text className="text-gray-500">Aucun projet trouvé.</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* MENU */}
        <MenuSidebar visible={menuVisible} onClose={() => setMenuVisible(false)} />

        {/* MODAL POUR LES DÉTAILS DU DON ET CONTACT */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-2xl p-6 w-11/12 max-h-3/4">
              {/* Header avec titre et bouton fermeture */}
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold" style={{ color: '#1d4c4c' }}>
                  {selectedCause?.title}
                </Text>
                <TouchableOpacity 
                  onPress={closeModal}
                  className="p-2"
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {selectedCause && (
                <>
                  <Text className="text-sm text-gray-600 mb-6 leading-5">
                    {selectedCause.description}
                  </Text>

                  {/* Section Don */}
                  <View className="mb-6">
                    <Text className="text-lg font-semibold mb-3 text-gray-900">Faire un don</Text>
                    <TextInput
                      placeholderTextColor="#9CA3AF"
                      placeholder="Montant en DH"
                      value={donationAmount}
                      onChangeText={setDonationAmount}
                      keyboardType="numeric"
                      className="border border-gray-300 rounded-lg p-4 text-gray-900 mb-4"
                      style={{ fontSize: 16 }}
                    />
                    <TouchableOpacity
                      onPress={handleDonation}
                      className="py-4 rounded-xl items-center"
                      style={{ backgroundColor: '#1d4c4c' }}
                    >
                      <Text className="text-white text-base font-semibold">Confirmer le don</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Section Contact */}
                  <View>
                    <Text className="text-lg font-semibold mb-3 text-gray-900">Contacter les bénévoles responsables</Text>
                    <TouchableOpacity
                      onPress={handleContact}
                      className="py-4 rounded-xl items-center border border-gray-300 flex-row justify-center"
                    >
                      <Ionicons name="chatbubble-outline" size={20} color="#6B7280" style={{ marginRight: 8 }} />
                      <Text className="text-gray-700 text-base font-medium">Envoyer un message</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>

      </SafeAreaView>

      {/* BOTTOM TAB BAR */}
      <View className="absolute bottom-0 left-0 right-0">
        <SafeAreaView edges={['bottom']}>
          <BottomTabBar currentRoute='/donations' />
        </SafeAreaView>
      </View>
    </View>
  );
}
