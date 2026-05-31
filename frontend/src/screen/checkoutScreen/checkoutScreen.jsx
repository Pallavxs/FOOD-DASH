import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { clearCart } from '../../redux/slices/cartSlice';
import { createOrder } from '../../api/services/orderService';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const DELIVERY_FEE = 30;
const TAXES = 20;
const DELIVERY_ADDRESS = 'Home, Bhopal, Madhya Pradesh';

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart?.items ?? []);
  const userId = useSelector(state => state.auth?.user?.id || state.auth?.user?._id);
  const restaurantId = cartItems.length > 0 ? cartItems[0].restaurant : null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = subtotal + DELIVERY_FEE + TAXES;

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [promoInput, setPromoInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderError, setOrderError] = useState('');
  const placeOrder = async () => {
    if (isPlacing) return;
    setIsPlacing(true);
    setOrderError('');
    const payload = {
      user: userId,
      restaurant: restaurantId,

      items: cartItems.map(item => ({
        menuItem: item._id,
        quantity: item.quantity,
      })),

      paymentMethod,
      deliveryAddress: " G-01, Anjani Residency, Church Road, Manak Vihar, Patel Nagar, Bhopal, Madhya Pradesh – 462022.",

      totalAmount: grandTotal * (1 - discount),
      status: "placed",
    };
    try {
      const response = await createOrder(payload);
      const orderId = response?.data?._id || response?.data?.order?._id || response?.data?.orderId || response?.data?.id;
      dispatch(clearCart());


        router.replace({
          pathname: '/orderSuccess',
          params: { orderId, paymentMethod },
        });
    } catch (err) {

      setOrderError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setIsPlacing(false);
    }

  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
      <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
  <TouchableOpacity
    onPress={() => router.back()}
  >
    <Ionicons
      name="arrow-back"
      size={26}
      color="#E23744"
    />
  </TouchableOpacity>

  <Text style={styles.headerTitle}>
    Order Confirmed
  </Text>

  <View style={{ width: 26 }} />
</View>

        {/* Address Card */}
        <View style={styles.card}>
          <View style={styles.addressHeader}>
            <Text style={styles.sectionHeading}>Delivery Address</Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mapContainer}>
            <Image
              source={require('../../assets/Map.png.jpeg')}
              style={styles.mapImage}
            />

          </View>
        </View>

        {/* Payment Method */}
        <Text style={styles.mainSectionTitle}>
          Payment Method
        </Text>

        {[
          {
            key: 'COD',
            title: 'Cash On Delivery',
            subtitle: 'Pay when order arrives',
            icon: 'cash-outline',
          },
          {
            key: 'UPI',
            title: 'UPI Payment',
            subtitle: 'Google Pay, PhonePe',
            icon: 'phone-portrait-outline',
          },
          {
            key: 'Card',
            title: 'Credit / Debit Card',
            subtitle: 'Visa, MasterCard',
            icon: 'card-outline',
          },
        ].map(item => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.paymentCard,
              paymentMethod === item.key &&
              styles.selectedPaymentCard,
            ]}
            onPress={() => setPaymentMethod(item.key)}
          >
            <View style={styles.paymentLeft}>
              <Ionicons
                name={item.icon}
                size={26}
                color="#E23744"
              />

              <View style={{ marginLeft: 12 }}>
                <Text style={styles.paymentText}>
                  {item.title}
                </Text>

                <Text style={styles.paymentSubText}>
                  {item.subtitle}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.radioCircle,
                paymentMethod === item.key &&
                styles.radioSelected,
              ]}
            />
          </TouchableOpacity>
        ))}

        {/* Order Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>
            Order Summary
          </Text>

          {cartItems.map(item => (
            <View
              key={item._id}
              style={styles.summaryRow}
            >
              <Text style={styles.itemText}>
                {item.quantity}x {item.name}
              </Text>

              <Text style={styles.itemPrice}>
                ₹{(
                  item.price * item.quantity
                ).toFixed(0)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>
              ₹{subtotal.toFixed(0)}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.priceValue}>
              ₹{DELIVERY_FEE}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Taxes</Text>
            <Text style={styles.priceValue}>
              ₹{TAXES}
            </Text>
          </View>

          {discount > 0 && (
  <View style={styles.priceRow}>
    <Text style={styles.priceLabel}>Discount (30%)</Text>
    <Text style={styles.priceValue}>-₹{(grandTotal * discount).toFixed(0)}</Text>
  </View>
)}
<View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            {discount > 0 ? (
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.totalPrice, { textDecorationLine: 'line-through', color: '#999', fontSize: 20 }]}>₹{grandTotal.toFixed(0)}</Text>
                <Text style={styles.totalPrice}>₹{(grandTotal * (1 - discount)).toFixed(0)}</Text>
              </View>
            ) : (
              <Text style={styles.totalPrice}>₹{grandTotal.toFixed(0)}</Text>
            )}
          </View>
        </View>

        {/* Promo */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>
            Promo Code
          </Text>

          <View style={styles.promoRow}>
            <TextInput
              style={styles.codeInput}
              placeholder="Enter code"
              placeholderTextColor="#999"
              value={promoInput}
              onChangeText={setPromoInput}
            />
            <TouchableOpacity style={styles.applyBtn} onPress={() => {
              if (promoInput.trim().toUpperCase() === 'ZOMATO30') {
                setDiscount(0.3);
                Alert.alert('Promo applied', '30% discount applied');
              } else {
                Alert.alert('Invalid code', 'Please check the promo code');
              }
            }}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
            style={styles.placeOrderBtn}
            onPress={placeOrder}
            disabled={isPlacing}>
            {isPlacing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.placeOrderText}>
                Place Order • ₹{(grandTotal * (1 - discount)).toFixed(0)} ⚡
              </Text>
            )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  backButton: {
  position: 'absolute',
  top: 60,
  left: 20,
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: '#FFF',
  alignItems: 'center',
  justifyContent: 'center',

  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 4,
  zIndex: 10,
},

  mapContainer: {
    marginTop: 15,
    marginBottom: 10,
    width: '100%',
  },

  mapImage: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginTop: 10,
  },

  scrollContent: {
    paddingBottom: 140,
  },

  header: {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 30,
},

  backBtn: {
    fontSize: 30,
    color: '#E23744',
  },

  headerTitle: {
  fontSize: 26,
  fontWeight: '700',
  color: '#E23744',
},

  stepText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#444',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    padding: 20,
    paddingVertical: 30,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sectionHeading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
  },

  changeText: {
    color: '#E23744',
    fontWeight: '700',
    fontSize: 16,
  },

  addressRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },

  locationIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  addressName: {
    fontSize: 20,
    fontWeight: '700',
  },

  addressText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },

  mainSectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 25,
    marginLeft: 20,
  },

  paymentCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  selectedPaymentCard: {
    borderWidth: 2,
    borderColor: '#E23744',
  },

  paymentText: {
    fontSize: 20,
    fontWeight: '700',
  },

  paymentSubText: {
    color: '#777',
    marginTop: 4,
    fontSize: 14,
  },

  radioCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E23744',
  },

  radioSelected: {
    backgroundColor: '#E23744',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  itemText: {
    fontSize: 17,
    color: '#222',
  },

  itemPrice: {
    fontSize: 17,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: 18,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  priceLabel: {
    fontSize: 16,
    color: '#666',
  },

  priceValue: {
    fontSize: 16,
    fontWeight: '600',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 26,
    fontWeight: '700',
  },

  totalPrice: {
    fontSize: 30,
    fontWeight: '800',
    color: '#E23744',
  },

  promoRow: {
    flexDirection: 'row',
    marginTop: 15,
  },

  codeInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },

  applyBtn: {
    marginLeft: 10,
    backgroundColor: '#E23744',
    paddingHorizontal: 25,
    borderRadius: 16,
    justifyContent: 'center',
  },

  applyText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },

  placeOrderBtn: {
    backgroundColor: '#E23744',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
  },

  placeOrderText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },

  addressTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },



  addressOverlay: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    width: '100%',
    marginBottom: 10,
    // optional shadow for elevation
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  overlayTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },

  overlayAddress: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  overlaySubAddress: {
    color: '#ddd',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },


});

