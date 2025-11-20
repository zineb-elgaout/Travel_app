// src/services/appleAuth.ts
import * as AppleAuthentication from 'expo-apple-authentication';

export const signInWithApple = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    return credential;
  } catch (error) {
    console.error('Apple Sign-In error:', error);
  }
};