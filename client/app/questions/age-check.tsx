import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const AgeCheck = () => {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!age.trim()) {
      setError("Please enter your age");
      return;
    }

    const userAge = parseInt(age, 10);
    if (isNaN(userAge)) {
      setError("Please enter a valid number");
      return;
    }

    if (userAge < 12) {
      // Route to exit screen for age
      router.push("/questions/exit-age");
    } else {
      // Continue to height check
      router.push("/questions/height-check");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" />

      {/* Top Bar */}
      <LinearGradient
        colors={["#4a6cf7", "#33409e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topBar}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressIndicator, { width: "10%" }]} />
          </View>
          <Text style={styles.progressText}>1/5</Text>
        </View>

        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Content Container with Shadow */}
        <View style={styles.contentContainer}>
          {/* Header Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3209/3209202.png",
              }}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>AGE VERIFICATION</Text>
            <Text style={styles.fact}>
              We need your age to ensure our recommendations are appropriate for
              you. Different age groups have different spine development and
              postural needs.
            </Text>
            <View style={styles.separator} />
            <Text style={styles.question}>How old are you?</Text>
          </View>

          {/* Age Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={age}
              onChangeText={(text) => {
                setAge(text);
                setError("");
              }}
              maxLength={3}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* Information note */}
          <View style={styles.infoContainer}>
            <Ionicons
              name="information-circle"
              size={24}
              color="#a1a1a1"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>
              Our product is designed for individuals 12 years and older. If you
              are younger than 12, please consult with a healthcare provider
              before using our services.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button - Fixed at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !age.trim() && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!age.trim()}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121520",
  },
  scrollContent: {
    flexGrow: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 50, // Adjust for status bar
  },
  backButton: {
    padding: 5,
  },
  progressContainer: {
    alignItems: "center",
  },
  progressBar: {
    width: 100,
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressIndicator: {
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 3,
  },
  progressText: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
    backgroundColor: "#1e222b",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100, // Space for bottom button
    minHeight: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerImage: {
    width: 100,
    height: 100,
    tintColor: "#4a6cf7",
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e1e1e1",
    textAlign: "center",
  },
  fact: {
    fontSize: 14,
    color: "#a1a1a1",
    marginTop: 10,
    lineHeight: 20,
    textAlign: "center",
  },
  separator: {
    height: 3,
    backgroundColor: "#4a6cf7",
    marginVertical: 15,
    width: 60,
    alignSelf: "center",
    borderRadius: 2,
  },
  question: {
    fontSize: 20,
    fontWeight: "500",
    color: "#e1e1e1",
    marginTop: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#2a2f3b",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    color: "#e1e1e1",
    textAlign: "center",
  },
  errorText: {
    color: "#e57373",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(74, 108, 247, 0.1)",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  infoIcon: {
    marginRight: 10,
    alignSelf: "flex-start",
  },
  infoText: {
    color: "#a1a1a1",
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 15,
    backgroundColor: "#1e222b",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  continueButton: {
    flexDirection: "row",
    backgroundColor: "#4a6cf7",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4a6cf7",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: "#444",
    shadowOpacity: 0,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
});

export default AgeCheck;
