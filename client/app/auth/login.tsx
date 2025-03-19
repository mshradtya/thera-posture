import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/AuthContext";

const Page = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    router.replace("/questions/question1"); // Replace with your home route
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/prd12.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.wrapper}>
          <Animated.View
            style={styles.logoWrapper}
            entering={FadeInUp.delay(200).duration(500)}
          >
            <Image
              source={require("@/assets/images/logo1.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.Text
            style={styles.title}
            entering={FadeInRight.delay(300).duration(500)}
          >
            Thera-Posture
          </Animated.Text>
          <Animated.Text
            style={styles.description}
            entering={FadeInRight.delay(700).duration(500)}
          >
            Welcome Back
          </Animated.Text>

          <Animated.View
            style={styles.inputContainer}
            entering={FadeInDown.delay(900).duration(500)}
          >
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupBtn}
              onPress={() => router.push("/auth/register")}
            >
              <Text style={styles.signupText}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  logoWrapper: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "400",
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: "center",
  },
  description: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    gap: 15,
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    padding: 15,
    color: Colors.white,
    fontSize: 16,
  },
  btn: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  signupBtn: {
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
});
