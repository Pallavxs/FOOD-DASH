// src/styles/authStyles.js

export const colors = {
  primaryRed: '#E23744',
  backgroundWhite: '#FFFFFF',
  borderGray: '#E5E5E5',
  textPrimary: '#222222',
  textSecondary: '#666666',
};

export const fonts = {
  // You may load "Outfit" via expo-font in the app entry point.
  regular: 'Outfit-Regular',
  medium: 'Outfit-Medium',
  bold: 'Outfit-Bold',
};

export const dimensions = {
  heroHeightRatio: 0.38, // 38% of screen height
};
export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
};

export const input = {
  height: 50,
  borderRadius: 12,
  borderColor: '#E5E5E5',
  borderWidth: 1,
  paddingHorizontal: 12,
  fontSize: 16,
  color: colors.textPrimary,
};
