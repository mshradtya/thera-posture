import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import PrimaryHeader from "@/components/Header";

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
    <SafeAreaView style={styles.container}>
      <PrimaryHeader
        title="Age Verification"
        showProgress={true}
        progressValue={10}
        progressText="1/5"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* Logo and Header Image */}
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.logoCircle}
              >
                <Image
                  source={require("@/assets/images/age-group-2.png")}
                  style={styles.headerImage}
                  resizeMode="contain"
                />
              </LinearGradient>
            </View>

            {/* Header Section */}
            <View style={styles.headerTextSection}>
              <Text style={styles.title}>Age Verification</Text>
              <Text style={styles.subtitle}>
                We need your age to ensure our recommendations are appropriate
                for you. Different age groups have different spine development
                and postural needs.
              </Text>
            </View>

            {/* Question Card */}
            <View style={styles.questionCard}>
              <Text style={styles.question}>How old are you?</Text>

              {/* Age Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your age"
                  placeholderTextColor={Colors.text.tertiary}
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
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.infoText}>
                  Our product is designed for individuals 12 years and older. If
                  you are younger than 12, please consult with a healthcare
                  provider before using our services.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 100, // Space for bottom button
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerImage: {
    width: 60,
    height: 60,
    tintColor: "#FFFFFF",
  },
  headerTextSection: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
    textAlign: "center",
  },
  questionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    color: Colors.text.primary,
    fontWeight: "500",
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },
  infoContainer: {
    flexDirection: "row",
    backgroundColor: "#EEF1FF",
    borderRadius: 12,
    padding: 15,
  },
  infoIcon: {
    marginRight: 10,
    alignSelf: "flex-start",
  },
  infoText: {
    color: Colors.text.secondary,
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 15,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  continueButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.text.tertiary,
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
