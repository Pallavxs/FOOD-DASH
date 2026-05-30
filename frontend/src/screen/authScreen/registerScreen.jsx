import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Dimensions, Alert, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";
import AuthFormCard from "../../components/AuthFormCard";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { colors, dimensions } from "../../styles/authStyles";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    try {
      await dispatch(register({ name, email, password })).unwrap();
    } catch (e) {
      console.log("Registration error", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[colors.primaryRed, "#ff7f7f"]} style={[styles.heroWrapper, { height: heroHeight }]}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.title}>Create Account</Text>
        </View>
      </LinearGradient>
      <View style={styles.cardWrapper}>
        <AuthFormCard>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <CustomInput placeholder="Name" value={name} onChangeText={setName} icon="user" secure={false} />
          <CustomInput placeholder="Email" value={email} onChangeText={setEmail} icon="mail" secure={false} />
          <CustomInput placeholder="Password" value={password} onChangeText={setPassword} icon="lock" secure={true} />
          <PrimaryButton title="Register" onPress={handleRegister} loading={loading} disabled={loading} />
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
    position: "relative",
    width: "100%",
  },
  heroTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  cardWrapper: {
    position: "relative",
    top: -40,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 8,
  },
});
