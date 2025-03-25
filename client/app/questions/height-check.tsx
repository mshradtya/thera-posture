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

const HeightCheck = () => {
  const router = useRouter();
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [metric, setMetric] = useState(true); // true for cm, false for ft/in
  const [error, setError] = useState("");

  const toggleUnit = () => {
    setMetric(!metric);
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setError("");
  };

  const validateHeight = () => {
    if (metric) {
      if (!heightCm.trim()) {
        setError("Please enter your height");
        return false;
      }

      const cm = parseFloat(heightCm);
      if (isNaN(cm)) {
        setError("Please enter a valid number");
        return false;
      }

      // Check if height is within range (140cm - 210cm is common range)
      if (cm < 140 || cm > 210) {
        // Out of recommended range, go to exit screen
        router.push("/questions/exit-height");
        return false;
      }
      return true;
    } else {
      if (!heightFt.trim()) {
        setError("Please enter feet");
        return false;
      }

      const ft = parseFloat(heightFt);
      const inches = parseFloat(heightIn || "0");

      if (isNaN(ft) || isNaN(inches)) {
        setError("Please enter valid numbers");
        return false;
      }

      // Convert to cm for validation
      const totalCm = ft * 30.48 + inches * 2.54;

      // Check if height is within range
      if (totalCm < 140 || totalCm > 210) {
        // Out of recommended range, go to exit screen
        router.push("/questions/exit-height");
        return false;
      }
      return true;
    }
  };

  const handleContinue = () => {
    if (validateHeight()) {
      // Height is within acceptable range, continue to weight check
      router.push("/questions/weight-check");
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
            <View style={[styles.progressIndicator, { width: "20%" }]} />
          </View>
          <Text style={styles.progressText}>2/5</Text>
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
                uri: "https://cdn-icons-png.flaticon.com/512/7161/7161487.png",
              }}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>HEIGHT MEASUREMENT</Text>
            <Text style={styles.fact}>
              Your height helps us determine the best posture support for your
              body proportions. Different heights require different types of
              support.
            </Text>
            <View style={styles.separator} />
            <Text style={styles.question}>What is your height?</Text>
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
                Centimeters
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
                Feet/Inches
              </Text>
            </TouchableOpacity>
          </View>

          {/* Height Input */}
          {metric ? (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Height"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                  value={heightCm}
                  onChangeText={(text) => {
                    setHeightCm(text);
                    setError("");
                  }}
                />
                <Text style={styles.unitText}>cm</Text>
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.dualInputContainer}>
                <View
                  style={[styles.inputWrapper, { flex: 1, marginRight: 10 }]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Feet"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    value={heightFt}
                    onChangeText={(text) => {
                      setHeightFt(text);
                      setError("");
                    }}
                  />
                  <Text style={styles.unitText}>ft</Text>
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Inches"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    value={heightIn}
                    onChangeText={(text) => {
                      setHeightIn(text);
                      setError("");
                    }}
                  />
                  <Text style={styles.unitText}>in</Text>
                </View>
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
              Our products are optimized for heights between 140-210 cm (4'7" -
              6'11"). This is the range where our posture solutions have been
              most effectively tested.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button - Fixed at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!metric && (!heightFt.trim() || isNaN(parseFloat(heightFt)))) ||
            (metric && (!heightCm.trim() || isNaN(parseFloat(heightCm))))
              ? styles.continueButtonDisabled
              : null,
          ]}
          onPress={handleContinue}
          disabled={
            (!metric && (!heightFt.trim() || isNaN(parseFloat(heightFt)))) ||
            (metric && (!heightCm.trim() || isNaN(parseFloat(heightCm))))
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
  dualInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default HeightCheck;
