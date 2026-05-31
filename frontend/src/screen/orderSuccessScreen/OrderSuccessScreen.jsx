import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OrderSuccessScreen() {
  const router = useRouter();

  const {
    orderId = 'ORD12345',
    paymentMethod = 'COD',
  } = useLocalSearchParams();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.replace('/orders');
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  const paymentLabel =
    paymentMethod === 'COD'
      ? 'Cash On Delivery'
      : paymentMethod;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      {/* Success Circle */}
      <View style={styles.successCircle}>
        <Ionicons
          name="checkmark"
          size={70}
          color="#22C55E"
        />
      </View>

      <Text style={styles.title}>
        Order Placed Successfully!
      </Text>

      <Text style={styles.subtitle}>
        Yay! Your food is being prepared.
      </Text>

      {/* Order Details Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name="receipt-outline"
            size={28}
            color="#E23744"
          />

          <View style={styles.rowContent}>
            <Text style={styles.label}>
              Order ID
            </Text>

            <Text style={styles.value}>
              #{orderId}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Ionicons
            name="wallet-outline"
            size={28}
            color="#E23744"
          />

          <View style={styles.rowContent}>
            <Text style={styles.label}>
              Payment Method
            </Text>

            <Text style={styles.value}>
              {paymentLabel}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Ionicons
            name="bicycle-outline"
            size={28}
            color="#E23744"
          />

          <View style={styles.rowContent}>
            <Text style={styles.label}>
              Estimated Delivery
            </Text>

            <Text style={styles.value}>
              30 - 45 mins
            </Text>
          </View>
        </View>
      </View>

      {/* Status Card */}
      <View style={styles.infoCard}>
        <Ionicons
          name="time-outline"
          size={30}
          color="#E23744"
        />

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.infoTitle}>
            We will notify you
          </Text>

          <Text style={styles.infoText}>
            Track your order in real-time
            from the Orders page.
          </Text>
        </View>
      </View>

      {/* Track Order */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => router.replace('/orders')}
      >
        <Ionicons
          name="location-outline"
          size={20}
          color="#fff"
        />

        <Text style={styles.primaryBtnText}>
          Track Order
        </Text>
      </TouchableOpacity>

      {/* Home */}
      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => router.replace('/tabs/home')}
      >
        <Ionicons
          name="home-outline"
          size={20}
          color="#E23744"
        />

        <Text style={styles.secondaryBtnText}>
          Back To Home
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },

  successCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#ECFDF3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center',
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowContent: {
    marginLeft: 14,
    flex: 1,
  },

  label: {
    fontSize: 14,
    color: '#777',
  },

  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 18,
  },

  infoCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 18,
    borderRadius: 20,
    marginBottom: 28,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },

  infoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  primaryBtn: {
    width: '100%',
    height: 58,
    backgroundColor: '#E23744',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  primaryBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 8,
  },

  secondaryBtn: {
    width: '100%',
    height: 58,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E23744',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryBtnText: {
    color: '#E23744',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 8,
  },
});