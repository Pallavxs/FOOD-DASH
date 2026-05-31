import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams , router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { getMenuByRestaurantId } from '../../api/services/menuService';
import { getRestaurantById } from '../../api/services/restaurantService';
import { Ionicons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const COVER_HEIGHT = SCREEN_HEIGHT * 0.38; // 38 % of screen

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();

  // ----- State -----
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart?.items ?? []);

  // ----- Data fetching (restaurant + menu) -----
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [restRes, menuRes] = await Promise.all([
          getRestaurantById(id),
          getMenuByRestaurantId(id),
        ]);

        if (isMounted) {
          setRestaurant(restRes);
          setMenuItems(menuRes);
        }
      } catch (e) {
        console.error('Failed to load restaurant data', e);
        if (isMounted) setError('Unable to load data');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // ----- Helper for cart totals -----
  const totalAmount = cartItems.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0,
  );
  const totalCount = cartItems.reduce((c, it) => c + it.quantity, 0);

  // ----- Render helpers -----
  const renderMenuItem = ({ item }) => (
    <View style={styles.menuCard}>
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuDesc} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.menuPrice}>₹{item.price}</Text>
      </View>

      <View style={styles.menuRight}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.menuImage} />
        )}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => dispatch(addItem(item))}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ----- UI -----
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorMsg}>{error}</Text>
      </View>
    );
  }

  // Guard against missing restaurant data (should not happen)
  if (!restaurant) return null;

  return (
  <View style={styles.container}>

    {/* Top Floating Buttons */}
    <View style={styles.topButtons}>
      <TouchableOpacity
        style={styles.circleBtn}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={22} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.circleBtn}>
        <Ionicons name="heart-outline" size={22} color="#000" />
      </TouchableOpacity>
    </View>

    <Image
      source={{ uri: restaurant.image }}
      style={styles.coverImage}
    />

  

    {/* Cover Image */}

    <View>
    
    <LinearGradient
    colors={['transparent', 'rgba(0,0,0,0.4)']}
    style={styles.gradient}
  />
    </View>

    {/* Restaurant Info Card */}
    <View style={styles.infoCard}>
      <Text style={styles.restaurantName}>
        {restaurant.name}
      </Text>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>
          {restaurant.cuisine}
        </Text>

        <View style={styles.ratingBadge}>
  <Text style={styles.ratingText}>
    ★ {restaurant.rating}
  </Text>
</View>
        

        <Text style={styles.metaText}>
          {restaurant.deliveryTime ?? "25"} min
        </Text>
      </View>
    </View>

    {/* Menu Title */}
    <Text style={styles.sectionTitle}>
      Menu
    </Text>

    {/* Menu List */}
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item._id}
      renderItem={renderMenuItem}
      contentContainerStyle={styles.menuList}
      showsVerticalScrollIndicator={false}
    />

    {/* Cart Bar */}
    {totalCount > 0 && (
      <TouchableOpacity
        style={styles.cartBar}
        onPress={() => router.push("/cart")}
      >
        <View>
          <Text style={styles.cartItems}>
            {totalCount} Items in Cart
          </Text>

          <Text style={styles.cartTotal}>
            ₹{totalAmount}
          </Text>
        </View>

        <Text style={styles.viewCartText}>
          View Cart →
        </Text>
      </TouchableOpacity>
    )}
  </View>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  /* Cover image */
  coverImage: {
  width: "100%",
  height: 280,
},

infoCard: {
  backgroundColor: "#fff",
  marginHorizontal: 16,
  marginTop: -50, // MAGIC
  borderRadius: 24,
  padding: 20,
  elevation: 8,
  zIndex: 10,
},
  restName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cuisine: { color: '#555', fontSize: 14 },
  rating: { color: '#ff6347', fontSize: 14 },
  delivery: { color: '#555', fontSize: 14 },
  distance: { color: '#555', fontSize: 14 },

  /* Menu list */
  flatList: { marginTop: 8 },
  menuList: { paddingBottom: 120, paddingHorizontal: 12 },

  menuCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  menuInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  menuName: { fontSize: 16, fontWeight: '600', color: '#222' },
  menuDesc: { fontSize: 13, color: '#666', marginVertical: 4 },
  menuPrice: { fontSize: 15, fontWeight: 'bold', color: '#ff6347' },

  menuRight: {
  width: 130,
  alignItems: "center",
  justifyContent: "center",
},
  menuImage: {
  width: 110,
  height: 110,
  borderRadius: 12,
},
  addBtn: {
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "#ff6347",
  width: 42,
  height: 42,
  borderRadius: 21,
  alignItems: "center",
  justifyContent: "center",
  elevation: 4,
},
  addBtnText: { color: '#fff', fontSize: 22, lineHeight: 22 },

  /* Bottom cart bar */
  cartBar: {
  position: "absolute",
  left: 16,
  right: 16,
  bottom: 16,
  borderRadius: 16,
  backgroundColor: "#e23744",
  paddingHorizontal: 20,
  paddingVertical: 14,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
  cartInfo: { fontSize: 15, color: '#333' },
  cartBtn: {
    backgroundColor: '#ff6347',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  cartBtnText: { color: '#fff', fontWeight: '600' },

ratingBadge: {
  backgroundColor: "#0F8A65",
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 8,
},

ratingText: {
  color: "#fff",
  fontWeight: "700",
},

  /* Misc */
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorMsg: { color: 'red', fontSize: 16 },

restaurantName: {
  fontSize: 24,
  fontWeight: "700",
  color: "#222",
},

metaRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 10,
  gap: 12,
},

metaText: {
  color: "#666",
  fontSize: 14,
},

sectionTitle: {
  fontSize: 24,
  fontWeight: "700",
  marginHorizontal: 16,
  marginTop: 20,
  marginBottom: 12,
},

cartBar: {
  position: "absolute",
  bottom: 16,
  left: 16,
  right: 16,
  backgroundColor: "#e23744",
  borderRadius: 16,
  padding: 16,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

cartItems: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 15,
},

cartTotal: {
  color: "#fff",
  marginTop: 2,
},

viewCartText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 16,
},
gradient: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 120,
},
topButtons: {
  position: "absolute",
  top: 50,
  left: 16,
  right: 16,
  flexDirection: "row",
  justifyContent: "space-between",
  zIndex: 999,
},

circleBtn: {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: "#fff",
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
},
});
