import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";


import AuthFormCard from "../../components/AuthFormCard";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { login } from "../../redux/actions/authActions";
import { initSocket } from "../../services/socketService";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      // Initialize socket connection with authenticated user ID
      initSocket(user._id);
      router.replace("/tabs/home");
    }
  }, [user]);

  const handleLogin = () => {
    if (!email || !password) {
      setValidationError("Please fill all fields");
      return;
    }

    setValidationError("");

    dispatch(
      login({
        email,
        password,
      })
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.cardContainer}>
          <AuthFormCard>

            <Text style={styles.logo}>
              FoodDash
            </Text>

            <Text style={styles.title}>
              Welcome back!
            </Text>

            <Text style={styles.subtitle}>
              Sign in to continue your food journey
            </Text>

            {(validationError || error) && (
              <Text style={styles.error}>
                {validationError || error}
              </Text>
            )}

            <CustomInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              icon="mail"
            />

            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              icon="lock"
              secure={true}
            />

            {/* <Pressable>
              <Text style={styles.forgot}>
                Forgot Password?
              </Text>
            </Pressable> */}

            <PrimaryButton
              title="Log In"
              loading={loading}
              disabled={loading}
              onPress={handleLogin}
            />

            <View style={styles.bottom}>
              <Text style={styles.bottomText}>
                Don't have an account?
              </Text>

              <Link
                href="auth/register"
                style={styles.signup}
              >
                Register
              </Link>
            </View>

          </AuthFormCard>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#6F866E",
  },

  cardContainer: {
    justifyContent: "center",
  },

  logo: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#C8102E",
    marginBottom: 30,
  },

  title: {
    textAlign: "center",
    fontSize: 42,
    fontWeight: "800",
    color: "#111",
    marginBottom: 12,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#6B4F4F",
    marginBottom: 35,
  },

  error: {
    color: "#E23744",
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "600",
  },

  forgot: {
    color: "#C8102E",
    textAlign: "right",
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 20,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  bottomText: {
    color: "#555",
    fontSize: 15,
  },

  signup: {
    marginLeft: 6,
    color: "#C8102E",
    fontWeight: "700",
    fontSize: 15,
  },
});