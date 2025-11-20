// src/screens/ConversationsScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Pressable, Modal, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export default function ConversationsScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [longPressedItem, setLongPressedItem] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Voyage à Marrakech',
      lastMessage: 'Merci pour les informations sur les riads',
      timestamp: '2m',
    },
    {
      id: '2',
      title: 'Cuisine marocaine',
      lastMessage: 'Quels sont les meilleurs tajines ?',
      timestamp: '1h',
    },
    {
      id: '3',
      title: 'Désert du Sahara',
      lastMessage: 'Les nuits sont magnifiques !',
      timestamp: '3h',
    },
    {
      id: '4',
      title: 'Culture berbère',
      lastMessage: "J'aimerais en savoir plus",
      timestamp: '1j',
    },
    {
      id: '5',
      title: 'Casablanca',
      lastMessage: 'Quels sont les lieux incontournables ?',
      timestamp: '2j',
    }
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewConversation = () => {
    router.push('/chatbot');
  };

  const handleOpenConversation = (conversationId: string) => {
    if (!longPressedItem) {
      router.push(`/chatbot?id=${conversationId}`);
    }
  };

  const handleLongPress = (id: string) => {
    setLongPressedItem(id);
  };

  const handleDelete = (id: string) => {
    setConversations(conversations.filter(conv => conv.id !== id));
    setDeleteConfirmId(null);
    setLongPressedItem(null);
  };

  const handleArchive = (id: string) => {
    // Logique d'archivage ici
    console.log('Archiver:', id);
    setLongPressedItem(null);
  };

  const confirmDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const renderConversation = ({ item }: { item: Conversation }) => {
    const isSelected = longPressedItem === item.id;

    return (
      <>
        <Pressable
          onPress={() => handleOpenConversation(item.id)}
          onLongPress={() => handleLongPress(item.id)}
          delayLongPress={500}
          className={`${isSelected ? 'bg-gray-100' : 'bg-white'} active:bg-gray-50`}
        >
          <View className="flex-row items-center px-6 py-4 border-b border-gray-100">
            {/* Checkbox si sélectionné */}
            {isSelected && (
              <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center mr-4">
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              </View>
            )}

            {/* Contenu */}
            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                <Text 
                  className={`font-normal text-black text-base flex-1`} 
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text className={`text-gray-500 text-xs ml-2`}>
                  {item.timestamp}
                </Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text 
                  className={`text-gray-500 text-sm flex-1`} 
                  numberOfLines={1}
                >
                  {item.lastMessage}
                </Text>
                
              </View>
            </View>
          </View>
        </Pressable>

        {/* Actions bottom sheet style WhatsApp */}
        {isSelected && (
          <View className="absolute top-0 right-0 left-0 bg-green-600 flex-row items-center justify-between px-6 py-3 z-10">
            <TouchableOpacity
              onPress={() => setLongPressedItem(null)}
              className="flex-row items-center"
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
              <Text className="text-white text-base ml-3 font-medium">1</Text>
            </TouchableOpacity>

            <View className="flex-row items-center gap-6">
              <TouchableOpacity onPress={() => handleArchive(item.id)}>
                <Ionicons name="archive-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  };

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center py-20">
      <Ionicons name="chatbubbles-outline" size={64} color="#D1D5DB" />
      <Text className="text-gray-400 text-lg mt-4">Aucune conversation</Text>
      <TouchableOpacity
        onPress={handleNewConversation}
        className="mt-6 px-6 py-3 bg-green-600 rounded-full"
      >
        <Text className="text-white text-sm font-medium">Nouvelle conversation</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        {/* Header */}
        {longPressedItem ? (
          // Header de sélection (style WhatsApp)
          <View className="bg-green-600 px-6 py-4">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => setLongPressedItem(null)}
                className="flex-row items-center"
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
                <Text className="text-white text-xl ml-4 font-medium">1</Text>
              </TouchableOpacity>

              <View className="flex-row items-center gap-6">
                <TouchableOpacity onPress={() => longPressedItem && handleArchive(longPressedItem)}>
                  <Ionicons name="archive-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => longPressedItem && confirmDelete(longPressedItem)}>
                  <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                
                <TouchableOpacity>
                  <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          // Header normal
          <View className="px-6 py-4 border-b border-gray-200">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-black text-2xl font-light">Messages</Text>
              <View className="flex-row items-center gap-4">
                <TouchableOpacity className="p-2">
                  <Ionicons name="camera-outline" size={24} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNewConversation}
                  className="p-2"
                >
                  <Ionicons name="add" size={28} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Barre de recherche */}
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
              <Ionicons name="search" size={18} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-2 text-black text-sm"
                placeholder="Rechercher..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Liste des conversations */}
        <FlatList
          data={filteredConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />

        {/* FAB - Floating Action Button */}
        {!longPressedItem && (
          <TouchableOpacity
            onPress={handleNewConversation}
            className="absolute bottom-20 right-6 w-14 h-14 bg-green-600 rounded-full items-center justify-center shadow-lg active:scale-95"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </SafeAreaView>

      <BottomTabBar currentRoute="/conversation" />

      {/* Modal de confirmation de suppression */}
      <Modal
        visible={deleteConfirmId !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteConfirmId(null)}
      >
        <Pressable 
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setDeleteConfirmId(null)}
        >
          <View className="bg-white rounded-2xl mx-6 w-80 overflow-hidden">
            <View className="p-6">
              <Text className="text-xl font-semibold text-black mb-2">
                Supprimer la conversation ?
              </Text>
              <Text className="text-gray-600 text-base leading-6">
                Cette conversation sera définitivement supprimée. Cette action est irréversible.
              </Text>
            </View>

            <View className="border-t border-gray-200">
              <TouchableOpacity
                onPress={() => setDeleteConfirmId(null)}
                className="py-4 border-b border-gray-200 active:bg-gray-100"
              >
                <Text className="text-center text-base text-blue-500 font-medium">
                  Annuler
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                className="py-4 active:bg-gray-100"
              >
                <Text className="text-center text-base text-red-600 font-semibold">
                  Supprimer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}