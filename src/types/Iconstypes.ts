import { Ionicons } from "@expo/vector-icons";

export const getCategoryIcon = (name1: string): keyof typeof Ionicons.glyphMap => {
  const map: Record<string, keyof typeof Ionicons.glyphMap> = {
    Food: "fast-food-outline",         // or "nutrition-outline"
    Transport: "car-outline",
    Bills: "receipt-outline",
    Shopping: "cart-outline",
    Entertainment: "musical-notes-outline",
    Housing: "home-outline",
    Health: "medkit-outline",
    Other: "pricetag-outline",
  };

  return map[name1] || "help-outline";
};