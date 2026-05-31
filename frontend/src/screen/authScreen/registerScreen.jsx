import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Alert, StyleSheet, ImageBackground , Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";
import AuthFormCard from "../../components/AuthFormCard";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { colors, dimensions } from "../../styles/authStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, user } = useSelector(state => state.auth);
  const { height: screenHeight } = Dimensions.get("window");
  const heroHeight = screenHeight * dimensions.heroHeightRatio;

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      await dispatch(register({ name, email, password, role })).unwrap();
    } catch (e) {

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/auth/login-banner.png")}
        style={styles.heroWrapper}
      >
        <LinearGradient
          colors={["transparent", "white"]}
          style={styles.gradient}
        />
        <Text style={styles.logo}>FoodDash</Text>
      </ImageBackground>
      <View style={styles.cardWrapper}>
        <AuthFormCard>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Experience flavors like never before.</Text>
          <View style={styles.roleContainer}>
            <Pressable
              style={[styles.roleButton, role === "customer" && styles.activeRole]}
              onPress={() => setRole("customer")}
            >
              <Text style={[styles.roleText, role === "customer" && styles.activeRoleText]}>
                Customer
              </Text>
            </Pressable>
            <Pressable
              style={[styles.roleButton, role === "vendor" && styles.activeRole]}
              onPress={() => setRole("vendor")}
            >
              <Text
                style={[
                  styles.roleText,
                  role === "vendor" && styles.activeRoleText,
                ]}
              >
                Vendor
              </Text>
            </Pressable>
          </View>

          {error && (
            <Text style={styles.errorText}>
              {error}
            </Text>
          )}

          <CustomInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            icon="user"
          />

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

          <CustomInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            icon="shield"
            secure={true}
          />

          <PrimaryButton
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
          />

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>
              Already have an account?
            </Text>

            <Text
              style={styles.loginLink}
              onPress={() => router.push("auth/login")}
            >
              Login
            </Text>
          </View>
        </AuthFormCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  heroWrapper: {
  height: 280,
  position: "relative",
},

heroImage: {
  width: "100%",
  height: "100%",
},

logo: {
  position: "absolute",
  top: 40,
  left: 25,
  fontSize: 28,
  fontWeight: "800",
  color: "#C8102E",
},

cardWrapper: {
  marginTop: -45,
  paddingHorizontal: 20,
},

title: {
  fontSize: 38,
  fontWeight: "800",
  textAlign: "center",
  color: "#111",
},

subtitle: {
  textAlign: "center",
  color: "#6B4F4F",
  fontSize: 16,
  marginTop: 8,
  marginBottom: 30,
},

roleContainer: {
  flexDirection: "row",
  backgroundColor: "#E8E8E8",
  borderRadius: 18,
  padding: 4,
  marginBottom: 25,
},

roleButton: {
  flex: 1,
  paddingVertical: 14,
  borderRadius: 15,
  alignItems: "center",
},

activeRole: {
  backgroundColor: "#E23744",
},

roleText: {
  fontSize: 18,
  fontWeight: "600",
  color: "#5D4037",
},

activeRoleText: {
  color: "#FFF",
},

bottomRow: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 20,
},

bottomText: {
  color: "#444",
  fontSize: 16,
},

loginLink: {
  marginLeft: 5,
  color: "#E23744",
  fontWeight: "700",
  fontSize: 16,
},

errorText: {
  color: "red",
  textAlign: "center",
  marginBottom: 10,
},

heroOverlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 120,
  backgroundColor: "rgba(255,255,255,0.75)",
},

card: {
  backgroundColor: "#FFF",
  borderRadius: 35,
  padding: 28,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.08,
  shadowRadius: 20,

  elevation: 12,
},

gradient: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 150,
},

});
