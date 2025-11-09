import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ExploreItem, ContentFilterType } from "../../types/explore";

interface ExploreCardProps {
  item: ExploreItem;
  contentFilter: ContentFilterType;
  onPress: () => void;
  onToggleFavorite?: (id: number) => void; 
  variant?: "slide" | "suggestion";
}

export const ExploreCard: React.FC<ExploreCardProps> = ({
  item,
  contentFilter,
  onPress,
  onToggleFavorite,
  variant = "slide",
}) => {
  const isSlide = variant === "slide";
  const showCategoryBadge = contentFilter !== "cities";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-${isSlide ? "3xl" : "2xl"} overflow-hidden bg-white shadow-lg`}
      style={isSlide ? { width: 288 } : { width: "47%" }}
      activeOpacity={0.9}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className={`w-full ${isSlide ? "h-56" : "h-48"}`}
          resizeMode="cover"
        />

        {/* Effet noir sur la moitié inférieure */}
        <LinearGradient
          colors={["rgba(0,1,0.8,0.95)", "transparent"]}
          start={{ x: 0.7, y: 1 }}
          end={{ x: 0.7, y: 0 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80%",
            borderBottomLeftRadius: isSlide ? 24 : 16,
            borderBottomRightRadius: isSlide ? 24 : 16,
          }}
        />

        {/* Catégorie */}
        {showCategoryBadge && item.category && (
          <View
            className={`absolute top-${isSlide ? "4" : "3"} left-${
              isSlide ? "4" : "3"
            } px-${isSlide ? "3" : "2"} py-1 rounded-full ${
              contentFilter === "crafts" ? "bg-amber-600" : "bg-green-600"
            }`}
          >
            <Text className="text-white text-xs font-semibold">
              {item.category}
            </Text>
          </View>
        )}

        {/* Bouton favoris */}
        <TouchableOpacity
          className={`
            absolute rounded-full items-center justify-center shadow-lg
            ${isSlide ? "top-4 right-4 w-10 h-10 bg-white" : "top-3 right-3 w-8 h-8 bg-white/90"}
          `}
          onPress={() => onToggleFavorite?.(item.id)}
          accessibilityRole="button"
          accessibilityLabel={`${item.isFavorite ? "Remove from" : "Add to"} favorites: ${item.name}`}
          accessibilityState={{ checked: item.isFavorite }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.9}
        >
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={isSlide ? 20 : 16}
            color={item.isFavorite ? "#EC4899" : "#6B7280"}
          />
        </TouchableOpacity>

        {/* Texte et note */}
        <View className={`absolute bottom-0 left-0 right-0 p-${isSlide ? "5" : "3"}`}>
          {isSlide && (
            <View className="flex-row items-center mb-2">
              <Ionicons name="location" size={16} color="#FFF" />
              <Text className="text-white text-sm ml-1 font-medium">
                {item.location}
              </Text>
            </View>
          )}

          <Text
            className={`text-white ${isSlide ? "text-xl" : "text-base"} font-bold mb-1`}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text
            className={`text-white/80 ${isSlide ? "text-sm" : "text-xs"} mb-2`}
            numberOfLines={1}
          >
            {item.description}
          </Text>

          <View className="flex-row items-center">
            <Ionicons name="star" size={isSlide ? 16 : 12} color="#FBBF24" />
            <Text
              className={`text-white ${isSlide ? "text-base" : "text-sm"} ml-1 font-${
                isSlide ? "semibold" : "medium"
              }`}
            >
              {item.rating}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};