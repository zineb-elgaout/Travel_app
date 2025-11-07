// app/_layout.tsx
import { Stack } from "expo-router";
import { LanguageProvider } from '../src/contexts/LanguageContext';
import './globals.css';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
          animation: 'fade',
        }}
      />
    </LanguageProvider>
  );
}