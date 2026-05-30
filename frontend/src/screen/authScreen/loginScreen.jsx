import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, Alert, SafeAreaView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AuthFormCard from '../../components/AuthFormCard';
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, dimensions } from '../../styles/authStyles';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';

/**
 * Login screen following the premium Zomato aesthetic.
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState(null);
  const { loading, error: apiError, user } = useSelector(state => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/home');
    }
  }, [user]);

  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      setValidationError('Please fill in both fields.');
      return;
    }
    // Clear previous errors
    setValidationError(null);
    // Dispatch login thunk
    dispatch(login({ email, password }));
  };

  // Google login is omitted per design specifications

  const { height: screenHeight } = Dimensions.get('window');
  const heroHeight = screenHeight * dimensions.heroHeightRatio;

  return (
    <View style={styles.container}>
      {/* Hero Banner */}
        <LinearGradient
          colors={[colors.primaryRed, '#ff7f7f']}
          style={[styles.heroWrapper, { height: heroHeight }]}
        >
          <Image
            source={require('../../../assets/auth/login-banner.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <View style={styles.heroTextContainer}>
          <Text style={styles.welcome}>Welcome Back</Text>
          <Text style={styles.subtitle}>Order food from your favorite restaurants.</Text>
          </View>
        </LinearGradient>

      {/* Form Card */}
      <View style={styles.cardWrapper}>
        <AuthFormCard>
            {(validationError || apiError) && (
              <Text style={styles.errorText}>{validationError || apiError}</Text>
            )}
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              icon="mail"
              secure={false}
            />
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              icon="lock"
              secure={true}
            />
          <Pressable onPress={() => { /* navigate to ForgotPassword later */ }}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </Pressable>
          <PrimaryButton title="Login" onPress={handleLogin} loading={loading} disabled={loading} />
          <View style={styles.bottomLinkContainer}>
            <Text style={styles.bottomLinkText}>Don't have an account? </Text>
            <Link href="/auth/register" style={styles.bottomLink}>Sign Up</Link>
          </View>
        </AuthFormCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  heroWrapper: {
    position: 'relative',
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  cardWrapper: {
    position: 'relative',
    top: -40,
    // pulls the card up to overlap hero
  },
  welcome: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
  forgot: {
    color: colors.primaryRed,
    textAlign: 'right',
    marginVertical: 8,
  },
  bottomLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  bottomLinkText: {
    color: colors.textSecondary,
  },
  bottomLink: {
    color: colors.primaryRed,
    fontWeight: '600',
  },
});
