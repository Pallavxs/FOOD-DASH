import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeItem, clearCart } from '../../redux/slices/cartSlice';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#E03546';
const DELIVERY_FEE = 30; // static placeholder
const TAXES = 20; // static placeholder

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = subtotal + DELIVERY_FEE + TAXES;

  const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: item.image }}
      style={styles.image}
    />

    <View style={styles.infoContainer}>
      <View style={styles.topRow}>
        <Text
          style={styles.name}
          numberOfLines={2}
        >
          {item.name}
        </Text>

        <TouchableOpacity
          onPress={() => dispatch(removeItem(item._id))}
        >
          <Feather
            name="trash-2"
            size={24}
            color="#6B3F3F"
          />
        </TouchableOpacity>
      </View>

      {item.description ? (
        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      ) : null}

      <Text style={styles.price}>
        ₹ {item.price}
      </Text>

      <View style={styles.quantityRow}>
        <TouchableOpacity
          style={styles.minusBtn}
          onPress={() =>
            dispatch(decreaseQty(item._id))
          }
        >
          <Text style={styles.minusText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.qtyCount}>
          {item.quantity}
        </Text>

        <TouchableOpacity
          style={styles.plusBtn}
          onPress={() =>
            dispatch(increaseQty(item._id))
          }
        >
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.browseBtn}>
        <Text style={styles.browseBtnText}>Browse Restaurants</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons
  name="arrow-back"
  size={28}
  color="#E23744"
/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Order</Text>
        <Text style={styles.headerCount}>{totalItems} items</Text>
      </View>

      {/* Cart List */}
      <View style={{ flex: 1 }}>
  <FlatList
    data={cartItems}
    keyExtractor={(item) => item._id}
    renderItem={renderItem}
    ListEmptyComponent={renderEmpty}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingBottom: 250,
    }}
  />

  {cartItems.length > 0 && (
    <View style={styles.bottomSheet}>
      <View style={styles.pricingRow}>
        <Text style={styles.pricingLabel}>Subtotal</Text>
        <Text style={styles.pricingValue}>
          ₹ {subtotal.toFixed(2)}
        </Text>
      </View>

      <View style={styles.pricingRow}>
        <Text style={styles.pricingLabel}>Delivery Fee</Text>
        <Text style={styles.pricingValue}>
          ₹ {DELIVERY_FEE.toFixed(2)}
        </Text>
      </View>

      <View style={styles.pricingRow}>
        <Text style={styles.pricingLabel}>Taxes</Text>
        <Text style={styles.pricingValue}>
          ₹ {TAXES.toFixed(2)}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>
          Grand Total
        </Text>

        <Text style={styles.totalPrice}>
          ₹ {grandTotal.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => router.push('/checkout')}
        >
          <Text style={styles.checkoutBtnText}>
            Proceed To Checkout →
          </Text>
        </TouchableOpacity>
    </View>
  )}
</View>
      </View>

  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },

  backBtn: {
    padding: 4,
  },

  headerTitle: {
    flex: 1,
    marginLeft: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#E23744',
  },

  headerCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5C4033',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 5,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 18,
    marginRight: 16,
  },

  infoContainer: {
    flex: 1,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  name: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginRight: 10,
  },

  description: {
    fontSize: 15,
    color: '#777',
    marginTop: 8,
  },

  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E23744',
    marginTop: 14,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },

  minusBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  plusBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E23744',
    justifyContent: 'center',
    alignItems: 'center',
  },

  minusText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#555',
  },

  plusText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },

  qtyCount: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    color: '#222',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },

  browseBtn: {
    backgroundColor: '#E23744',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },

  browseBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  bottomSheet: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,

  backgroundColor: '#fff',

  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,

  padding: 20,

  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 10,
},

  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  pricingLabel: {
    fontSize: 16,
    color: '#555',
  },

  pricingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 15,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },

  totalPrice: {
    fontSize: 30,
    fontWeight: '800',
    color: '#E23744',
  },

  checkoutBtn: {
    backgroundColor: '#E23744',
    marginTop: 25,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
  },

  checkoutBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});