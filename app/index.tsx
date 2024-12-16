import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const Page = () => {
  const router = useRouter();

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
            Where Innovation Meets Comfort.
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
            <TouchableOpacity
              style={styles.btn}
              // onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.btnText}>Get Started</Text>
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
    gap: 10,
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
    fontWeight: 600,
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: "center",
  },
  description: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: "center",
  },
  btn: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 700,
  },
});
