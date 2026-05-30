// src/components/CustomInput.jsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { colors } from '../styles/authStyles';

/**
 * Reusable text input with a left icon and optional password visibility toggle.
 */
export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  icon = 'mail',
  secure = false,
}) {
  const [isSecure, setIsSecure] = useState(secure);

  return (
    <View style={styles.container}>
      <Feather name={icon} size={20} color={colors.borderGray} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.borderGray}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        style={styles.input}
        autoCapitalize="none"
      />
      {secure && (
        <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.toggle}>
          <MaterialIcons name={isSecure ? 'visibility' : 'visibility-off'} size={20} color={colors.borderGray} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    height: 44,
    backgroundColor: '#FFF',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  toggle: {
    padding: 4,
  },
});
