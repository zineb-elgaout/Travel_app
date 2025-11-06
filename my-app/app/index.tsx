import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MotiView } from "moti";

export default function App() {
  return (
    <View className="flex-1 bg-gray-900">
      {/* Dégradé d’arrière-plan */}
      <LinearGradient
        colors={["#0f2027", "#203a43", "#2c5364"]}
        className="absolute inset-0"
      />

      {/* Image de fond optionnelle */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1503264116251-35a269479413",
        }}
        resizeMode="cover"
        className="flex-1"
      >
        {/* Superposition sombre */}
        <View className="absolute inset-0 bg-black/40" />

        {/* Contenu principal */}
        <View className="flex-1 justify-center items-center px-6">
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 800 }}
          >
            <BlurView intensity={70} tint="dark" className="p-8 rounded-3xl w-80">
              <Text className="text-white text-4xl font-extrabold text-center mb-3">
                Welcome 👋
              </Text>
              <Text className="text-gray-200 text-center mb-6">
                Discover your next adventure with style and technology.
              </Text>

              <TouchableOpacity
                className="bg-blue-500/80 rounded-2xl py-3"
                activeOpacity={0.8}
              >
                <Text className="text-white text-lg font-semibold text-center">
                  Get Started 🚀
                </Text>
              </TouchableOpacity>
            </BlurView>
          </MotiView>
        </View>
      </ImageBackground>

      <StatusBar style="light" />
    </View>
  );
}
