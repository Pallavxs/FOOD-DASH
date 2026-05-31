import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { getOrderById } from '../../api/services/orderService';
import { initSocket, getSocket, onOrderStatusUpdated } from '../../services/socketService';

// Emoji icons for timeline
const STATUS_EMOJI = {
  placed: '🟠',
  preparing: '🔵',
  out_for_delivery: '🟣',
  delivered: '🟢',
};

const STATUS_LABEL = {
  placed: 'Order Placed',
  preparing: 'Preparing Food',
  out_for_delivery: 'Out For Delivery',
  delivered: 'Delivered',
};

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // order id from route
  const authUser = useSelector(state => state.auth?.user);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch order details
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getOrderById(id)
      .then(res => {
        setOrder(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch order', err);
        Toast.show({ type: 'error', text1: 'Unable to load order details' });
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Socket listeners for real‑time status updates
  useEffect(() => {
    if (!authUser) return;
    const userId = authUser._id || authUser.id;
    const socket = initSocket(userId);

    const handleStatus = ({ orderId, status }) => {
      if (order && order._id === orderId) {
        setOrder(prev => ({ ...prev, status }));
        const msgs = {
          preparing: 'Restaurant has started preparing your food.',
          out_for_delivery: 'Your order is out for delivery.',
          delivered: 'Order delivered successfully.',
        };
        if (msgs[status]) {
          Toast.show({ type: 'success', text1: msgs[status] });
        }
      }
    };

    onOrderStatusUpdated(handleStatus);

    // Cleanup: remove the listener but keep socket alive
    return () => {
      const socketInstance = getSocket();
      if (socketInstance) {
        socketInstance.off('order-status-updated', handleStatus);
      }
    };
  }, [authUser, order]);

  const renderTimeline = () => {
    if (!order) return null;

    const steps = [
      'placed',
      'preparing',
      'out_for_delivery',
      'delivered',
    ];

    const currentIndex =
      steps.indexOf(order.status);

    return (
      <View style={styles.timelineCard}>
        <Text style={styles.cardTitle}>
          Live Tracking
        </Text>

        {steps.map((step, index) => {
          const active =
            index <= currentIndex;

          return (
            <View
              key={step}
              style={styles.timelineRow}
            >
              <View
                style={[
                  styles.timelineCircle,
                  active &&
                  styles.activeCircle,
                ]}
              >
                <Text>
                  {STATUS_EMOJI[step]}
                </Text>
              </View>

              <View
                style={
                  styles.timelineTextContainer
                }
              >
                <Text
                  style={[
                    styles.timelineLabel,
                    active &&
                    styles.activeLabel,
                  ]}
                >
                  {STATUS_LABEL[step]}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#E23744" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Order not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      {/* Header */}
      <View style={styles.header}>
  <TouchableOpacity
    onPress={() => router.back()}
    style={styles.backBtn}
  >
    <Text style={styles.backBtnText}>
      ←
    </Text>
  </TouchableOpacity>

  <View>
    <Text style={styles.headerTitle}>
      Track Order
    </Text>

    <Text style={styles.headerSubtitle}>
      Live order updates
    </Text>
  </View>
</View>

      {/* Order Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order #{order._id.slice(-6)}</Text>
        <Text style={styles.cardDetail}>Status: {STATUS_LABEL[order.status] || order.status}</Text>
        <Text style={styles.cardDetail}>Date: {new Date(order.createdAt).toLocaleString()}</Text>
      </View>

      {/* Timeline Card */}
      {renderTimeline()}

      {/* Items Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Items</Text>
        {order.items.map((it, idx) => (
          <View key={idx} style={styles.itemRow}>
            <Text style={styles.itemName}>{it.menuItem?.name || it.menuItem}</Text>
            <Text style={styles.itemQty}>x{it.quantity}</Text>
          </View>
        ))}
      </View>


      {/* Address Card */}
      <View style={styles.card}>
  <Text style={styles.cardTitle}>
    📍 Delivery Address
  </Text>

  <Text style={styles.addressText}>
    G-01, Anjani Residency,
    Church Road,
    Manak Vihar,
    Patel Nagar,
    Bhopal,
    Madhya Pradesh – 462022,
    India
  </Text>
</View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
  <View style={styles.summaryTop}>
    <Text style={styles.summaryTitle}>
      Total Amount
    </Text>

    <Text style={styles.totalAmount}>
      ₹{Number(order.totalAmount).toLocaleString()}
    </Text>
  </View>

  <View style={styles.summaryDivider} />

  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>
      Payment
    </Text>

    <Text style={styles.summaryValue}>
      💵 Cash On Delivery
    </Text>
  </View>

  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>
      Delivery Time
    </Text>

    <Text style={styles.summaryValue}>
      🛵 30-45 mins
    </Text>
  </View>

  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>
      Status
    </Text>

    <View style={styles.statusContainer}>
      <Text style={styles.statusBadge}>
        {STATUS_LABEL[order.status]}
      </Text>
    </View>
  </View>
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
  paddingBottom: 120,
},

headerSubtitle: {
  color: '#777',
  marginTop: 2,
  fontSize: 14,
},

statusContainer: {
  backgroundColor: '#FFE7EA',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},
  statusContainer: {
  backgroundColor: '#FFE7EA',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},

statusBadge: {
  color: '#E23744',
  fontWeight: '700',
  fontSize: 13,
},
  summaryCard: {
  backgroundColor: '#FFF',
  borderRadius: 28,
  padding: 22,

  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 4,

  marginBottom: 16,
},

summaryTop: {
  alignItems: 'center',
},

summaryTitle: {
  fontSize: 16,
  color: '#777',
  marginBottom: 8,
},

totalAmount: {
  fontSize: 38,
  fontWeight: '700',
  color: '#E23744',
},

summaryDivider: {
  height: 1,
  backgroundColor: '#F2F2F2',
  marginVertical: 20,
},

summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 14,
},

summaryLabel: {
  color: '#777',
  fontSize: 14,
},

summaryValue: {
  color: '#111',
  fontSize: 15,
  fontWeight: '600',
},

statusBadge: {
  color: '#E23744',
  fontWeight: '700',
  fontSize: 15,
},

  totalPrice: {
  fontSize: 32,
  fontWeight: '700',
  color: '#E23744',
  marginBottom: 10,
},

paymentMethod: {
  fontSize: 15,
  color: '#444',
  marginBottom: 6,
},

deliveryEstimate: {
  fontSize: 15,
  color: '#444',
},
  addressText: {
  fontSize: 15,
  lineHeight: 24,
  color: '#444',
},
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  errorText: {
    color: '#E23744',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,

    backgroundColor: '#FFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  backBtnText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E23744',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',
  },

  headerSubtitle: {
    color: '#777',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111',
  },
  cardDetail: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineIcon: {
    fontSize: 20,
    width: 30,
  },
  timelineLabel: {
    fontSize: 15,
    color: '#555',
  },
  currentStatus: {
    fontWeight: '700',
    color: '#E23744',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 15,
    color: '#222',
  },
  itemQty: {
    fontSize: 15,
    color: '#777',
  },
  timelineCard: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 24,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  timelineCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,

    backgroundColor: '#EFEFEF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  activeCircle: {
    backgroundColor: '#FFE7EA',
  },

  timelineTextContainer: {
    marginLeft: 16,
  },

  activeLabel: {
    color: '#E23744',
    fontWeight: '700',
  },
});
