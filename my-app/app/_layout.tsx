import { Stack } from "expo-router";
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './globals.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#000000' },
            animation: 'fade',
          }}
        />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
