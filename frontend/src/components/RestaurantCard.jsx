import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors, shadows } from '../styles/authStyles';
import { useRouter } from 'expo-router';

const RestaurantCard = ({ restaurant, onPress }) => {
  const router = useRouter();
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (restaurant && restaurant._id) {
      router.push(`/restaurant/${restaurant._id}`);
    }
  };
  const {
    image,
    name,
    cuisine,
    rating,
    deliveryTime,
    deliveryFee, // optional, if undefined assume free delivery
  } = restaurant;

  // const feeLabel = deliveryFee && deliveryFee > 0 ? `${deliveryFee} ₹` : 'Free';

  return (
    <TouchableOpacity
    style={styles.card}
    onPress={handlePress}
    activeOpacity={0.9}
  >
  <Image source={{ uri: image }} style={styles.image} />

  <View style={styles.info}>
    <View style={styles.titleRow}>
      <Text style={styles.title} numberOfLines={1}>
        {name}
      </Text>

      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>⭐ {rating}</Text>
      </View>
    </View>

    <Text style={styles.cuisine} numberOfLines={1}>
      {cuisine}
    </Text>

    <View style={styles.separator} />

    <View style={styles.bottomRow}>
      <Text style={styles.deliveryTime}>
        🕒 {deliveryTime} min
      </Text>

      <Text style={styles.freeDelivery}>
        Taste the best 
      </Text>
    </View>
  </View>
</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
  backgroundColor: "#fff",
  borderRadius: 20,
  overflow: "hidden",
  marginBottom: 18,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
},

image: {
  width: "100%",
  height: 220,
},

favoriteBtn: {
  position: "absolute",
  top: 14,
  right: 14,
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#fff",
  justifyContent: "center",
  alignItems: "center",
  elevation: 4,
},

info: {
  padding: 16,
},

titleRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

title: {
  flex: 1,
  fontSize: 24,
  fontWeight: "700",
  color: "#222",
},

ratingBadge: {
  backgroundColor: "#B8860B",
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 6,
},

ratingText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 13,
},

cuisine: {
  marginTop: 8,
  fontSize: 15,
  color: "#666",
},

separator: {
  height: 1,
  backgroundColor: "#ECECEC",
  marginVertical: 14,
},

bottomRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

deliveryTime: {
  fontSize: 15,
  color: "#333",
},

freeDelivery: {
  color: "#E23744",
  fontWeight: "600",
  fontSize: 15,
},
});

export default RestaurantCard;
