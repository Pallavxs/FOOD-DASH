import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, shadows } from '../styles/authStyles';

/**
 * Compact card used in the "Fastest Delivery" carousel.
 * Props:
 *   - restaurant: object containing at least { _id, image, name, deliveryTime }
 *   - onPress: callback when the card is tapped
 */
export default function FastCard({ restaurant, onPress }) {
  const { image, name, deliveryTime } = restaurant;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{name}</Text>
        <Text style={styles.time}>{deliveryTime} min</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    ...shadows.card,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
