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
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

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
            <View style={[styles.progressIndicator, { width: "40%" }]} />
          </View>
          <Text style={styles.progressText}>3/5</Text>
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
                uri: "https://cdn-icons-png.flaticon.com/512/4294/4294038.png",
              }}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>WEIGHT MEASUREMENT</Text>
            <Text style={styles.fact}>
              Your weight helps us determine the best level of support and
              material durability needed for your posture solution.
            </Text>
            <View style={styles.separator} />
            <Text style={styles.question}>What is your weight?</Text>
          </View>

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
              style={[styles.unitButton, !metric && styles.unitButtonActive]}
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
                  placeholderTextColor="#999"
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
                  placeholderTextColor="#999"
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
              color="#a1a1a1"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>
              Our products are optimized for weights between 45-120 kg (100-265
              lbs). This is the range where our posture solutions provide
              optimal support and durability.
            </Text>
          </View>

          {/* Privacy note */}
          <View style={styles.privacyNote}>
            <Ionicons
              name="shield-checkmark-outline"
              size={16}
              color="#a1a1a1"
            />
            <Text style={styles.privacyText}>
              Your information is kept private and is only used to provide you
              with the most appropriate recommendations.
            </Text>
          </View>
        </View>
      </ScrollView>

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
  unitToggleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#2a2f3b",
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
    backgroundColor: "#4a6cf7",
  },
  unitButtonText: {
    color: "#a1a1a1",
    fontSize: 14,
    fontWeight: "500",
  },
  unitButtonTextActive: {
    color: "#FFF",
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2f3b",
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#e1e1e1",
    paddingVertical: 15,
  },
  unitText: {
    color: "#a1a1a1",
    fontSize: 16,
    marginLeft: 5,
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
    marginBottom: 15,
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
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(74, 108, 247, 0.05)",
    borderRadius: 10,
    padding: 12,
  },
  privacyText: {
    fontSize: 12,
    color: "#a1a1a1",
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

export default WeightCheck;
