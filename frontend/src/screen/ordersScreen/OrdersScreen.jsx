import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { fetchOrders } from '../../api/services/orderService';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { initSocket, onOrderStatusUpdated } from '../../services/socketService';
import Toast from 'react-native-toast-message';


const STATUS_COLORS = {
  placed: '#FF9800',
  preparing: '#2196F3',
  out_for_delivery: '#9C27B0',
  delivered: '#4CAF50',
};

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  const authUser = useSelector(state => state.auth?.user);

  useEffect(() => {
    if (!authUser) return;
    const userId = authUser._id || authUser.id;
    const socket = initSocket(userId);
    const handleStatus = ({ orderId, status }) => {
      setOrders(prev => prev.map(o => (o._id === orderId ? { ...o, status } : o)));
      const msgs = {
        preparing: 'Restaurant has started preparing your food.',
        out_for_delivery: 'Your order is out for delivery.',
        delivered: 'Order delivered successfully.',
      };
      if (msgs[status]) {
        Toast.show({ type: 'success', text1: msgs[status] });
      }
    };
    onOrderStatusUpdated(handleStatus);
  }, [authUser]);

  useEffect(() => {
    fetchOrders()
      .then(response => {
        setOrders(response.data || []);
      })
      .catch(err => console.error('Failed to fetch orders', err));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.restaurantName}>
            Order #{(item._id ?? item.id)?.slice(-6)}
          </Text>

          <Text style={styles.orderDate}>
            {
              item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : 'Today'
            }
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                STATUS_COLORS[item.status] || '#999',
            },
          ]}
        >
          <Text style={styles.statusText}>
            {
              item.status
                ?.replaceAll('_', ' ')
                ?.replace(/\b\w/g, c => c.toUpperCase())
            }
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {item.items?.map((it, idx) => (
        <View
          key={idx}
          style={styles.itemRow}
        >
          <Text style={styles.itemName}>
            {(typeof it.menuItem === 'object'
              ? it.menuItem.name
              : it.menuItem) || 'Food Item'}
          </Text>

          <Text style={styles.itemQty}>
            x{it.quantity}
          </Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.paymentLabel}>
            Payment
          </Text>

          <Text style={styles.paymentValue}>
            {item.paymentMethod === 'COD'
              ? 'Cash On Delivery'
              : item.paymentMethod}
          </Text>
        </View>

        <View>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.totalValue}>
            ₹{item.totalAmount}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.trackButton}
        onPress={() =>
          router.push(`/order/${item._id}`)
        }
      >
        <Text style={styles.trackButtonText}>
          Track Order
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) =>
        (item._id ?? item.id).toString()
      }
      renderItem={renderItem}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>
          No orders found.
        </Text>
      )}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            My Orders
          </Text>

          <Text style={styles.headerSubtitle}>
            Track all your orders
          </Text>
        </View>
      )}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#F8F8F8',
    flexGrow: 1,
  },

  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  orderDate: {
    color: '#777',
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F1F1',
    marginVertical: 16,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  itemName: {
    fontSize: 15,
    color: '#222',
  },

  itemQty: {
    color: '#777',
    fontWeight: '600',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },

  paymentLabel: {
    color: '#777',
    fontSize: 13,
  },

  paymentValue: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 3,
  },

  totalLabel: {
    color: '#777',
    fontSize: 13,
    textAlign: 'right',
  },

  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E23744',
    marginTop: 3,
  },

  trackButton: {
    marginTop: 20,
    backgroundColor: '#E23744',
    borderRadius: 16,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },

  trackButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },

  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },

  separator: {
    height: 12,
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
    fontSize: 16,
  },

  header: {
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
  },

  headerSubtitle: {
    fontSize: 15,
    color: '#777',
    marginTop: 4,
  },
});
