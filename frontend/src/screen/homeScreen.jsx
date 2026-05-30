import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { fetchRestaurants } from '../redux/actions/restaurantActions';
import RestaurantCard from '../components/RestaurantCard';
import { AntDesign, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, shadows } from '../styles/authStyles';
import FastCard from '../components/FastCard';


// Static UI data
const BANNER_IMAGE = 'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=800&q=80'; // placeholder hero image

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const restaurants = useSelector(state => {
    const r = state.restaurant?.restaurants;
    return Array.isArray(r) ? r : [];
  });
  const loading = useSelector(state => state.restaurant?.loading ?? false);
  const error = useSelector(state => state.restaurant?.error ?? null);

  // Load restaurants once on mount
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handlePress = (id) => {
    if (router && typeof router.push === 'function') {
      router.push(`/restaurant/${id}`);
    }
  };

  // Render a standard restaurant card for the Popular section
  const renderRestaurant = ({ item }) => (
    <RestaurantCard restaurant={item} onPress={() => handlePress(item._id)} />
  );

  // Render a compact horizontal card for the Fastest Delivery carousel
  const renderFastest = ({ item }) => {
    if (!item) return null;
    return <FastCard restaurant={item} onPress={() => handlePress(item._id)} />;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationBox}>
          <AntDesign name="environment" size={20} color={colors.primaryRed} />
          <View style={styles.locationInfo}>
            <Text style={styles.deliverLabel}>Deliver to:</Text>
            <Text style={styles.locationText}>Bhopal</Text>
          </View>
        </View>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
          style={styles.avatar}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for burgers, sushi, or pizza"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={24} color="#fff" />
        </TouchableOpacity>
      </View>




      {/* Main Content */}
      <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>

        <ImageBackground source={{ uri: BANNER_IMAGE }} style={styles.banner} imageStyle={styles.bannerImage}>
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>LIMITED TIME OFFER</Text>
            </View>
            <Text style={styles.bannerTitle}>Delicious meals delivered fast</Text>
            <Text style={styles.bannerSubtitle}>30% OFF • Use code ZOMATO30</Text>
            <TouchableOpacity style={styles.bannerBtn} onPress={() => { /* TODO: handle order */ }}>
              <Text style={styles.bannerBtnText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Popular Restaurants */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
        </View>
        {loading && <ActivityIndicator size="large" color={colors.primaryRed} style={styles.loader} />}
        {error && <Text style={styles.errorText}>Failed to load restaurants.</Text>}
        {!loading && !error && restaurants.length === 0 && (
          <Text style={styles.emptyText}>No restaurants found.</Text>
        )}
        {!loading && !error && restaurants.length > 0 && (
          <FlatList
            data={restaurants}
            renderItem={renderRestaurant}
            keyExtractor={(item) => item._id?.toString()}
            scrollEnabled={false}
          />
        )}

        {/* Fastest Delivery */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fastest Delivery</Text>
        </View>
        <FlatList
          data={restaurants.slice().sort((a, b) => a.deliveryTime - b.deliveryTime).slice(0, 10)}
          renderItem={renderFastest}
          keyExtractor={(item) => item._id?.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.fastList}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/")}
        >
          <MaterialIcons
            name="delivery-dining"
            size={24}
            color={colors.primaryRed}
          />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/orders")}
        >
          <MaterialIcons
            name="receipt-long"
            size={24}
            color={colors.textSecondary}
          />
          <Text style={styles.navLabel}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/cart")}
        >
          <MaterialIcons
            name="shopping-cart"
            size={24}
            color={colors.textSecondary}
          />
          <Text style={styles.navLabel}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/account")}
        >
          <FontAwesome
            name="user"
            size={24}
            color={colors.textSecondary}
          />
          <Text style={styles.navLabel}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ccc',
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: colors.textPrimary,
  },
  filterBtn: {
    width: 44,
    height: 44,
    marginLeft: 8,
    backgroundColor: colors.primaryRed,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 180,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bannerImage: {
    resizeMode: 'cover',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bannerContent: {
    position: 'absolute',
    left: 20,
    top: 30,
    // Align all text to the left and center vertically within the banner
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  // New badge and subtitle styles for the banner
  bannerBadge: {
    backgroundColor: '#777', // medium gray
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 4,
  },
  bannerBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    // fontFamily: 'Poppins-SemiBold',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    // fontFamily: 'Poppins-Medium',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
    // Use a clean font if available
    // fontFamily: 'Poppins-SemiBold',
  },
  bannerBtn: {
    backgroundColor: colors.primaryRed,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  bannerBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryScroll: {
    height: 21,
    marginBottom: 4,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 0,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    color: colors.textSecondary,
  },
  contentScroll: {
    flex: 1,
    paddingBottom: 80,
  },
  fastCard: {
    width: 140,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    ...shadows.card,
  },
  fastImage: {
    width: '100%',
    height: 100,
  },
  fastBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.primaryRed,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  fastBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  fastName: {
    marginTop: 4,
    paddingHorizontal: 4,
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  fastList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bottomNav: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    ...shadows.card,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
