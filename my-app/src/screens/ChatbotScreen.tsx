// src/screens/ChatbotScreen.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'expo-router';
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
    // Ici vous intégrerez la logique d'enregistrement audio
    console.log('Début enregistrement audio');
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShowAudioInterface(false);
    
    // Simuler l'envoi d'un message audio
    const audioMessage: Message = {
      id: Date.now().toString(),
      text: t('audioMessage'),
      isUser: true,
      timestamp: new Date(),
      type: 'audio',
      audioUrl: 'simulated-audio-url',
      duration: 15 // secondes
    };

    setMessages(prev => [...prev, audioMessage]);

    // Réponse du bot
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
        {/* Header avec flèche de retour */}
        <View className="px-6 py-4 border-b border-gray-300">
          <View className="flex-row items-center">
            {/* Bouton retour */}
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mr-4"
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
              <Text 
                className="text-gray-500 text-sm font-light"
                style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
              >
                {t('chatbotSubtitle')}
              </Text>
            </View>
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
                    max-w-[80%] rounded-none px-4 py-3
                    ${message.isUser 
                      ? 'bg-black' 
                      : 'bg-gray-100 border border-gray-300'
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
          <View className="bg-red-500 mx-6 mb-4 rounded-lg py-4 px-6 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Ionicons name="mic" size={24} color="#FFFFFF" />
              <View className="ml-4 flex-1">
                <Text className="text-white text-base font-medium">
                  {isRecording ? t('recording') : t('processing')}
                </Text>
                <View className="w-full h-1 bg-red-300 rounded-full mt-2">
                  <View 
                    className="h-1 bg-white rounded-full"
                    style={{ width: isRecording ? '60%' : '100%' }}
                  />
                </View>
              </View>
            </View>
            
            <TouchableOpacity onPress={cancelRecording}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Input avec option audio */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="border-t border-gray-300"
        >
          <View className="flex-row items-center px-6 py-4">
            {/* Bouton microphone */}
            <TouchableOpacity 
              onPress={startRecording}
              onLongPress={startRecording}
              delayLongPress={300}
              className="mr-3"
            >
              <Ionicons 
                name="mic" 
                size={24} 
                color={isRecording ? '#DC2626' : '#6B7280'} 
              />
            </TouchableOpacity>

            {/* Champ texte */}
            <TextInput
              className="flex-1 bg-gray-100 rounded-full py-3 px-4 text-black text-base border border-gray-300"
              placeholder={t('typeMessage')}
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
              multiline
              maxLength={500}
            />

            {/* Bouton d'envoi ou d'arrêt d'enregistrement */}
            {isRecording ? (
              <TouchableOpacity
                onPress={stopRecording}
                className="ml-3 w-12 h-12 bg-red-500 items-center justify-center rounded-full"
              >
                <Ionicons name="stop" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSendMessage}
                disabled={inputText.trim() === ''}
                className="ml-3 w-12 h-12 bg-black rounded-full items-center justify-center disabled:opacity-40"
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}