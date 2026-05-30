import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/authStyles';

export default function CartTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {/* Add your cart UI here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundWhite,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
