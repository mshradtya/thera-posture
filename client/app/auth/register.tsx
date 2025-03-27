import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
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

const Register = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Add your registration logic here
    if (password !== confirmPassword) {
      // Add your password validation logic
      return;
    }
    router.replace("/questions/age-check"); // Updated route
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/prd12.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              Create Your Account
            </Animated.Text>

            <Animated.View
              style={styles.inputContainer}
              entering={FadeInDown.delay(900).duration(500)}
            >
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
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
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
              <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                <Text style={styles.btnText}>Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => router.push("/auth/login")}
              >
                <Text style={styles.loginText}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
    marginTop: 60, // Added to give space at the top
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "400",
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: "center",
  },
  description: {
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    fontSize: 16,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  loginBtn: {
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
