// src/screens/ChatbotScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type: 'text' | 'audio';
  audioUrl?: string;
  duration?: number;
}

export default function ChatbotScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Récupère l'ID de la conversation
  const { t, isRTL } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('chatbotWelcome'),
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAudioInterface, setShowAudioInterface] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Charger les messages de la conversation si un ID est fourni
  useEffect(() => {
    if (id) {
      // Ici vous chargeriez les messages depuis votre stockage/API
      console.log('Chargement de la conversation:', id);
    }
  }, [id]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const startRecording = () => {
    setIsRecording(true);
    setShowAudioInterface(true);
    console.log('Début enregistrement audio');
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShowAudioInterface(false);
    
    const audioMessage: Message = {
      id: Date.now().toString(),
      text: t('audioMessage'),
      isUser: true,
      timestamp: new Date(),
      type: 'audio',
      audioUrl: 'simulated-audio-url',
      duration: 15
    };

    setMessages(prev => [...prev, audioMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: t('audioResponse'),
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setShowAudioInterface(false);
    console.log('Enregistrement annulé');
  };

  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('marrakech') || lowerMessage.includes('مراكش')) {
      return t('marrakechInfo');
    } else if (lowerMessage.includes('sahara') || lowerMessage.includes('الصحراء')) {
      return t('saharaInfo');
    } else if (lowerMessage.includes('food') || lowerMessage.includes('طعام') || lowerMessage.includes('مأكولات')) {
      return t('moroccanFoodInfo');
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('مرحبا')) {
      return t('chatbotGreeting');
    } else {
      return t('chatbotDefault');
    }
  };

  const renderMessage = (message: Message) => {
    if (message.type === 'audio') {
      return (
        <View className="flex-row items-center">
          <Ionicons name="play-circle" size={24} color={message.isUser ? '#FFFFFF' : '#000000'} />
          <View className="ml-3">
            <Text className={`text-sm ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
              {t('audio')} • {message.duration}s
            </Text>
            <View className="w-32 h-1 bg-gray-400 rounded-full mt-1">
              <View className="w-16 h-1 bg-green-500 rounded-full" />
            </View>
          </View>
        </View>
      );
    }

    return (
      <Text 
        className={`text-base leading-6 ${message.isUser ? 'text-white' : 'text-gray-800'}`}
        style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
      >
        {message.text}
      </Text>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mr-4 active:opacity-70"
            >
              <Ionicons 
                name={isRTL ? "chevron-forward" : "chevron-back"} 
                size={24} 
                color="#000000" 
              />
            </TouchableOpacity>

            <View className="w-10 h-10 bg-black rounded-full items-center justify-center mr-3">
              <Ionicons name="chatbubble-ellipses" size={20} color="#FFFFFF" />
            </View>
            
            <View className="flex-1">
              <Text 
                className="text-black text-xl font-light"
                style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
              >
                {t('chatbot')}
              </Text>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                <Text 
                  className="text-gray-500 text-sm font-light"
                  style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
                >
                  En ligne
                </Text>
              </View>
            </View>

            <TouchableOpacity className="p-2">
              <Ionicons name="ellipsis-vertical" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-6 py-4"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View className="gap-4">
            {messages.map((message) => (
              <View
                key={message.id}
                className={`flex-row ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <View
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-3
                    ${message.isUser 
                      ? 'bg-black' 
                      : 'bg-gray-100'
                    }
                  `}
                >
                  {renderMessage(message)}
                  <Text 
                    className={`
                      text-xs mt-1
                      ${message.isUser ? 'text-gray-400' : 'text-gray-500'}
                    `}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Interface d'enregistrement audio */}
        {showAudioInterface && (
          <View className="bg-black mx-6 mb-4 rounded-2xl py-4 px-6 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-red-500 rounded-full items-center justify-center">
                <Ionicons name="mic" size={20} color="#FFFFFF" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-white text-sm font-medium mb-1">
                  {isRecording ? 'Enregistrement...' : 'Traitement...'}
                </Text>
                <View className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <View 
                    className="h-1 bg-red-500 rounded-full"
                    style={{ width: isRecording ? '60%' : '100%' }}
                  />
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              onPress={cancelRecording}
              className="ml-4 active:opacity-70"
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Input */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="border-t border-gray-200"
        >
          <View className="flex-row items-center px-6 py-4">
            <TouchableOpacity 
              onPress={startRecording}
              className="mr-3 active:opacity-70"
            >
              <Ionicons 
                name="mic" 
                size={24} 
                color={isRecording ? '#DC2626' : '#6B7280'} 
              />
            </TouchableOpacity>

            <TextInput
              className="flex-1 bg-gray-100 rounded-full py-3 px-4 text-black text-base"
              placeholder="Message..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
              multiline
              maxLength={500}
            />

            {isRecording ? (
              <TouchableOpacity
                onPress={stopRecording}
                className="ml-3 w-10 h-10 bg-red-500 items-center justify-center rounded-full active:scale-95"
              >
                <Ionicons name="stop" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSendMessage}
                disabled={inputText.trim() === ''}
                className="ml-3 w-10 h-10 bg-black rounded-full items-center justify-center disabled:opacity-40 active:scale-95"
              >
                <Ionicons name="send" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}