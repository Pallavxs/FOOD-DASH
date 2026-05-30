import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, shadows } from '../styles/authStyles';

/**
 * A reusable elevated card that holds authentication forms.
 * It provides a white rounded container with subtle shadow, matching the premium Zomato aesthetic.
 */
export default function AuthFormCard({ children }) {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 22,
    padding: 20,
    marginHorizontal: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Android elevation
    elevation: 5,
  },
});
