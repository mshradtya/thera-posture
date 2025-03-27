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
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const WeightCheck = () => {
  const router = useRouter();
  const [weightKg, setWeightKg] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [metric, setMetric] = useState(true); // true for kg, false for lb
  const [error, setError] = useState("");

  const toggleUnit = () => {
    setMetric(!metric);
    setWeightKg("");
    setWeightLb("");
    setError("");
  };

  const validateWeight = () => {
    if (metric) {
      if (!weightKg.trim()) {
        setError("Please enter your weight");
        return false;
      }

      const kg = parseFloat(weightKg);
      if (isNaN(kg)) {
        setError("Please enter a valid number");
        return false;
      }

      // Check if weight is within range (45kg - 120kg is common range)
      if (kg < 45 || kg > 120) {
        // Out of recommended range, go to exit screen
        router.push("/questions/exit-weight");
        return false;
      }
      return true;
    } else {
      if (!weightLb.trim()) {
        setError("Please enter your weight");
        return false;
      }

      const lb = parseFloat(weightLb);

      if (isNaN(lb)) {
        setError("Please enter a valid number");
        return false;
      }

      // Convert to kg for validation
      const totalKg = lb * 0.453592;

      // Check if weight is within range
      if (totalKg < 45 || totalKg > 120) {
        // Out of recommended range, go to exit screen
        router.push("/questions/exit-weight");
        return false;
      }
      return true;
    }
  };

  const handleContinue = () => {
    if (validateWeight()) {
      // Weight is within acceptable range, continue to waist check
      router.push("/questions/waist-check");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressIndicator, { width: "40%" }]} />
          </View>
          <Text style={styles.progressText}>3/5</Text>
        </View>

        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="close" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

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
            {/* Header Image */}
            <View style={styles.imageContainer}>
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.logoCircle}
              >
                <Image
                  source={require("@/assets/images/weight-scale.png")}
                  style={styles.headerImage}
                  resizeMode="contain"
                />
              </LinearGradient>
            </View>

            {/* Header Section */}
            <View style={styles.headerTextSection}>
              <Text style={styles.title}>Weight Measurement</Text>
              <Text style={styles.subtitle}>
                Your weight helps us determine the best level of support and
                material durability needed for your posture solution.
              </Text>
            </View>

            {/* Question Card */}
            <View style={styles.questionCard}>
              <Text style={styles.question}>What is your weight?</Text>

              {/* Unit Toggle */}
              <View style={styles.unitToggleContainer}>
                <TouchableOpacity
                  style={[styles.unitButton, metric && styles.unitButtonActive]}
                  onPress={() => metric || toggleUnit()}
                >
                  <Text
                    style={[
                      styles.unitButtonText,
                      metric && styles.unitButtonTextActive,
                    ]}
                  >
                    Kilograms
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.unitButton,
                    !metric && styles.unitButtonActive,
                  ]}
                  onPress={() => !metric || toggleUnit()}
                >
                  <Text
                    style={[
                      styles.unitButtonText,
                      !metric && styles.unitButtonTextActive,
                    ]}
                  >
                    Pounds
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Weight Input */}
              {metric ? (
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Weight"
                      placeholderTextColor={Colors.text.tertiary}
                      keyboardType="decimal-pad"
                      value={weightKg}
                      onChangeText={(text) => {
                        setWeightKg(text);
                        setError("");
                      }}
                    />
                    <Text style={styles.unitText}>kg</Text>
                  </View>
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
              ) : (
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Weight"
                      placeholderTextColor={Colors.text.tertiary}
                      keyboardType="decimal-pad"
                      value={weightLb}
                      onChangeText={(text) => {
                        setWeightLb(text);
                        setError("");
                      }}
                    />
                    <Text style={styles.unitText}>lb</Text>
                  </View>
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
              )}

              {/* Information note */}
              <View style={styles.infoContainer}>
                <Ionicons
                  name="information-circle"
                  size={24}
                  color={Colors.primary}
                />
                <Text style={styles.infoText}>
                  Our products are optimized for weights between 45-120 kg
                  (100-265 lbs). This is the range where our posture solutions
                  provide optimal support and durability.
                </Text>
              </View>

              {/* Privacy note */}
              <View style={styles.privacyNote}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={16}
                  color={Colors.text.secondary}
                />
                <Text style={styles.privacyText}>
                  Your information is kept private and is only used to provide
                  you with the most appropriate recommendations.
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
            (!metric && (!weightLb.trim() || isNaN(parseFloat(weightLb)))) ||
            (metric && (!weightKg.trim() || isNaN(parseFloat(weightKg))))
              ? styles.continueButtonDisabled
              : null,
          ]}
          onPress={handleContinue}
          disabled={
            (!metric && (!weightLb.trim() || isNaN(parseFloat(weightLb)))) ||
            (metric && (!weightKg.trim() || isNaN(parseFloat(weightKg))))
          }
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    backgroundColor: Colors.inputBg,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressIndicator: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    color: Colors.text.secondary,
    fontSize: 12,
    marginTop: 5,
    fontWeight: "500",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 100,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerImage: {
    width: 50,
    height: 50,
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
  unitToggleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    padding: 4,
  },
  unitButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  unitButtonActive: {
    backgroundColor: Colors.primary,
  },
  unitButtonText: {
    color: Colors.text.secondary,
    fontSize: 14,
    fontWeight: "500",
  },
  unitButtonTextActive: {
    color: "#FFFFFF",
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: Colors.text.primary,
    paddingVertical: 15,
  },
  unitText: {
    color: Colors.text.secondary,
    fontSize: 16,
    marginLeft: 5,
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
    marginBottom: 15,
  },
  infoText: {
    color: Colors.text.secondary,
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
    marginLeft: 10,
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    borderRadius: 10,
    padding: 12,
  },
  privacyText: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 8,
    flex: 1,
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
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
});

export default WeightCheck;
