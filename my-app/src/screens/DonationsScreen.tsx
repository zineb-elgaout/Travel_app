import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import BottomTabBar from '../components/BottomTabBar';

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

export default function DonationsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');

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
      contact: 'benevoles.atlas@example.com', // Exemple de contact
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
    ? causes
    : causes.filter(c => c.category === selectedCategory);

  const percentage = (c: number, g: number) => (c / g) * 100;

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
    // Ici, logique pour traiter le don (e.g., appel API)
    Alert.alert('Merci !', `Votre don de ${donationAmount} DH a été enregistré.`);
    closeModal();
  };

  const handleContact = () => {
    if (selectedCause) {
      // Ouvrir l'email ou l'app de messagerie
      const email = selectedCause.contact;
      Alert.alert('Contacter', `Envoyer un email à ${email}`, [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Ouvrir Email', onPress: () => {/* Logique pour ouvrir l'email */} },
      ]);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={['top']}>
        
        {/* HEADER */}
        <View className="px-6 pt-4 pb-3">
          <View className="flex-row items-center justify-between mb-2">
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={26} color="#1d4c4c" />
            </TouchableOpacity>

            <Text className="text-xl font-light tracking-tight" style={{ color: '#1d4c4c' }}>
              Dons
            </Text>

            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="heart-outline" size={26} color="#1d4c4c" />
            </TouchableOpacity>
          </View>

          
        </View>

        {/* CATEGORIES - Style amélioré */}
        <View className="px-6 pb-3">
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

        {/* LISTE DES PROJETS */}
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ 
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 160 // Espace pour le BottomTabBar
          }}
        >
          {filtered.map(cause => (
            <TouchableOpacity
              key={cause.id}
              activeOpacity={0.85}
              onPress={() => openModal(cause)} // Ouvre le modal au clic sur l'élément
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
          ))}
        </ScrollView>

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