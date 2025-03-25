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

const WaistCheck = () => {
  const router = useRouter();
  const [waistCm, setWaistCm] = useState("");
  const [waistIn, setWaistIn] = useState("");
  const [metric, setMetric] = useState(true); // true for cm, false for in
  const [error, setError] = useState("");

  const toggleUnit = () => {
    setMetric(!metric);
    setWaistCm("");
    setWaistIn("");
    setError("");
  };

  const validateWaist = () => {
    if (metric) {
      if (!waistCm.trim()) {
        setError("Please enter your waist size");
        return false;
      }

      const cm = parseFloat(waistCm);
      if (isNaN(cm)) {
        setError("Please enter a valid number");
        return false;
      }

      // Check if waist is within range (60cm - 120cm is common range)
      if (cm < 60 || cm > 120) {
        // Out of recommended range, go to exit screen
        router.push("/questions/exit-size");
        return false;
      }
      return true;
    } else {
      if (!waistIn.trim()) {
        setError("Please enter your waist size");
        return false;
      }

      const inches = parseFloat(waistIn);

      if (isNaN(inches)) {
        setError("Please enter a valid number");
        return false;
      }

      // Convert to cm for validation
      const totalCm = inches * 2.54;

      // Check if waist is within range
      if (totalCm < 60 || totalCm > 120) {
        // Out of recommended range, go to exit screen
        router.push("/questions/exit-size");
        return false;
      }
      return true;
    }
  };

  const handleContinue = () => {
    if (validateWaist()) {
      // Waist is within acceptable range, continue to question1
      router.push("/questions/question1");
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
            <View style={[styles.progressIndicator, { width: "60%" }]} />
          </View>
          <Text style={styles.progressText}>4/5</Text>
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
                uri: "https://cdn-icons-png.flaticon.com/512/3209/3209114.png",
              }}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>WAIST MEASUREMENT</Text>
            <Text style={styles.fact}>
              Your waist size helps us determine the appropriate fit of our
              posture support products. Different body types require different
              sizing.
            </Text>
            <View style={styles.separator} />
            <Text style={styles.question}>What is your waist size?</Text>
          </View>

          {/* Measurement Guide */}
          <View style={styles.guideContainer}>
            <View style={styles.guideHeader}>
              <Ionicons name="help-circle" size={20} color="#4a6cf7" />
              <Text style={styles.guideTitle}>How to Measure:</Text>
            </View>
            <Text style={styles.guideText}>
              Measure around your natural waistline, at the narrowest part of
              your waist, usually just above your belly button. Keep the tape
              comfortable but not too tight.
            </Text>
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
                Inches
              </Text>
            </TouchableOpacity>
          </View>

          {/* Waist Input */}
          {metric ? (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Waist"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                  value={waistCm}
                  onChangeText={(text) => {
                    setWaistCm(text);
                    setError("");
                  }}
                />
                <Text style={styles.unitText}>cm</Text>
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Waist"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                  value={waistIn}
                  onChangeText={(text) => {
                    setWaistIn(text);
                    setError("");
                  }}
                />
                <Text style={styles.unitText}>in</Text>
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
              Our products are optimized for waist sizes between 60-120 cm
              (24-47 inches). This is the range where our posture solutions
              provide the most effective support and comfort.
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
            (!metric && (!waistIn.trim() || isNaN(parseFloat(waistIn)))) ||
            (metric && (!waistCm.trim() || isNaN(parseFloat(waistCm))))
              ? styles.continueButtonDisabled
              : null,
          ]}
          onPress={handleContinue}
          disabled={
            (!metric && (!waistIn.trim() || isNaN(parseFloat(waistIn)))) ||
            (metric && (!waistCm.trim() || isNaN(parseFloat(waistCm))))
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
    marginBottom: 20,
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
  guideContainer: {
    backgroundColor: "rgba(74, 108, 247, 0.08)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  guideHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  guideTitle: {
    color: "#e1e1e1",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  guideText: {
    color: "#a1a1a1",
    fontSize: 14,
    lineHeight: 20,
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

export default WaistCheck;
