import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../redux/slices/authSlice';
import { disconnectSocket } from '../../services/socketService';

const placeholderAvatar = require('../../assets/user.png');


export default function ProfileScreen() {
  const user = useSelector(state => state.auth?.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await AsyncStorage.clear();
      disconnectSocket();
      router.replace('/login');
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  

  const quickAction = (emoji, label, onPress) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    <Text style={styles.actionIcon}>{emoji}</Text>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

  return (
  <View style={styles.container}>
    <View style={styles.userCard}>
      <Image
        source={user?.profileImage ? { uri: user.profileImage } : placeholderAvatar}
        style={styles.avatar}
      />

      <Text style={styles.name}>
        {user?.fullName ||
          user?.name ||
          'User'}
      </Text>

      <Text style={styles.info}>
        {user?.email}
      </Text>

      <Text style={styles.info}>
        {user?.phone}
      </Text>

      <Text style={styles.memberText}>
        Food Explorer 🍔
      </Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.grid}>
        {quickAction(
          '📦',
          'My Orders',
          () => router.push('/orders')
        )}

        {quickAction(
          '⚙️',
          'Settings',
          () => Alert.alert('Coming Soon')
        )}

        {quickAction(
          '❓',
          'Support',
          () => Alert.alert('Coming Soon')
        )}

        {quickAction(
          'ℹ️',
          'About',
          () =>
            Alert.alert(
              'Food Delivery App v1.0'
            )
        )}
      </View>
    </View>

    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() =>
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: handleLogout,
      },
    ]
  )
}
    >
      <Text style={styles.logoutText}>
        Logout
      </Text>
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },

  userCard: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    paddingVertical: 28,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,

    marginBottom: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
    backgroundColor: '#EEE',
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },

  info: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },

  memberText: {
    marginTop: 12,
    color: '#E23744',
    fontWeight: '700',
    fontSize: 15,
  },

  section: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  actionCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 22,
    paddingVertical: 24,
    alignItems: 'center',

    marginBottom: 14,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },

  actionIcon: {
    fontSize: 28,
    marginBottom: 10,
  },

  actionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  logoutButton: {
    marginTop: 'auto',
    height: 58,
    borderRadius: 18,
    backgroundColor: '#E23744',

    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
