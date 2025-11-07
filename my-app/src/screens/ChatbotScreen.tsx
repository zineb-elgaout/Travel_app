// src/screens/ChatbotScreen.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../contexts/LanguageContext';
import { usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatbotScreen() {
  const { t, isRTL } = useLanguage();
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('chatbotWelcome'),
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simuler une réponse du chatbot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
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

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 border-b border-gray-300">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-black rounded-full items-center justify-center mr-3">
              <Ionicons name="chatbubble-ellipses" size={20} color="#FFFFFF" />
            </View>
            <View>
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
                  <Text 
                    className={`
                      text-base leading-6
                      ${message.isUser ? 'text-white' : 'text-gray-800'}
                    `}
                    style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
                  >
                    {message.text}
                  </Text>
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

        {/* Input */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="border-t border-gray-300"
        >
          <View className="flex-row items-center px-6 py-4">
            <TextInput
              className="flex-1 bg-gray-100 rounded-none py-3 px-4 text-black text-base border border-gray-300"
              placeholder={t('typeMessage')}
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={inputText.trim() === ''}
              className="ml-3 w-12 h-12 bg-black items-center justify-center disabled:opacity-40"
            >
              <Ionicons name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      
    </View>
  );
}