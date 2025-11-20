import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <View
      className="flex-row items-center rounded-full px-4 py-4 mb-2 mt-2"
      style={{
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
    >
      <Ionicons name="search" size={20} color="#FFFFFF" />
      <TextInput
        className="flex-1 text-white text-[17px] ml-3"
        placeholder="Search for a region"
        placeholderTextColor="rgba(255, 255, 255, 0.8)"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
