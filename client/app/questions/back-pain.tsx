import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryHeader from "@/components/Header";

const BackPain = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");
  const [painLevel, setPainLevel] = useState(0);

  const options = ["Yes", "No"];

  const handlePainLevelSelect = (level) => {
    setPainLevel(level);
    setSelectedOption("Yes");
  };

  // Helper function to get color based on pain level
  const getPainLevelColor = (level) => {
    if (level <= 3) return "rgba(102, 187, 106, 0.8)"; // Green for mild
    if (level <= 7) return "rgba(255, 167, 38, 0.8)"; // Orange for moderate
    return "rgba(239, 83, 80, 0.8)"; // Red for severe
  };

  // Helper function to get description based on pain level
  const getPainDescription = (level) => {
    if (level <= 3) {
      return {
        title: "Mild Pain",
        text: "Noticeable but does not significantly interfere with daily activities.",
      };
    } else if (level <= 7) {
      return {
        title: "Moderate Pain",
        text: "Interferes with some daily activities and may require occasional medication.",
      };
    } else {
      return {
        title: "Severe Pain",
        text: "Significantly interferes with daily activities and may require regular medication.",
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryHeader
        title="Back Assessment"
        showProgress={true}
        progressValue={100}
        progressText="5/5"
      />
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
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/2966/2966334.png",
                }}
                style={styles.headerImage}
                resizeMode="contain"
              />
            </LinearGradient>
          </View>

          {/* Header Section */}
          <View style={styles.headerTextSection}>
            <Text style={styles.title}>Posture Assessment</Text>
            <Text style={styles.subtitle}>
              Your current posture will serve as a baseline (starting point)
              from which you will track your progress.
            </Text>
          </View>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <Text style={styles.question}>Do you have back pain?</Text>

            {/* Options */}
            <View style={styles.optionsContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    selectedOption === option &&
                      (option === "Yes"
                        ? styles.optionSelectedYes
                        : styles.optionSelectedNo),
                  ]}
                  onPress={() => {
                    setSelectedOption(option);
                    if (option === "No") {
                      setPainLevel(0);
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      selectedOption === option &&
                        (option === "Yes"
                          ? styles.radioCircleSelectedYes
                          : styles.radioCircleSelectedNo),
                    ]}
                  >
                    {selectedOption === option && (
                      <View
                        style={[
                          styles.radioDot,
                          option === "Yes"
                            ? styles.radioDotYes
                            : styles.radioDotNo,
                        ]}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      selectedOption === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>

                  {/* Icon indicator */}
                  {option === "Yes" ? (
                    <Ionicons
                      name="medical"
                      size={20}
                      color={
                        selectedOption === option
                          ? "#FFF"
                          : Colors.text.tertiary
                      }
                      style={styles.optionIcon}
                    />
                  ) : (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={
                        selectedOption === option
                          ? "#FFF"
                          : Colors.text.tertiary
                      }
                      style={styles.optionIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Pain Scale - Only show if Yes is selected */}
            {selectedOption === "Yes" && (
              <View style={styles.painScaleSection}>
                <Text style={styles.painScaleTitle}>
                  How would you rate your pain?
                </Text>

                <View style={styles.painScaleContainer}>
                  <View style={styles.painLevelRow}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                      <TouchableOpacity
                        key={level}
                        style={[
                          styles.painLevel,
                          painLevel === level && styles.painLevelSelected,
                          { backgroundColor: getPainLevelColor(level) },
                        ]}
                        onPress={() => handlePainLevelSelect(level)}
                      >
                        <Text
                          style={[
                            styles.painLevelText,
                            painLevel === level && styles.painLevelTextSelected,
                          ]}
                        >
                          {level}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.painLegend}>
                    <Text style={styles.painLegendText}>Mild</Text>
                    <Text style={styles.painLegendText}>Moderate</Text>
                    <Text style={styles.painLegendText}>Severe</Text>
                  </View>
                </View>

                {/* Description of selected pain level */}
                {painLevel > 0 && (
                  <View style={styles.painDescription}>
                    <Text style={styles.painDescriptionTitle}>
                      {getPainDescription(painLevel).title}
                    </Text>
                    <Text style={styles.painDescriptionText}>
                      {getPainDescription(painLevel).text}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedOption ||
              (selectedOption === "Yes" && painLevel === 0)) &&
              styles.continueButtonDisabled,
          ]}
          onPress={() => {
            if (selectedOption && (selectedOption === "No" || painLevel > 0)) {
              // In a real app, you would save the responses here
              router.push("/questions/assessment-complete");
            }
          }}
          disabled={
            !selectedOption || (selectedOption === "Yes" && painLevel === 0)
          }
        >
          <Text style={styles.continueButtonText}>Complete Assessment</Text>
          <Ionicons name="checkmark-circle" size={20} color="#FFF" />
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 100, // Space for bottom button
  },
  imageContainer: {
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
    textAlign: "center",
  },
  optionsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: Colors.inputBg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionSelectedYes: {
    backgroundColor: Colors.primary,
  },
  optionSelectedNo: {
    backgroundColor: "#38b2ac",
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.text.tertiary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  radioCircleSelectedYes: {
    borderColor: "#FFF",
  },
  radioCircleSelectedNo: {
    borderColor: "#FFF",
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  radioDotYes: {
    backgroundColor: "#FFF",
  },
  radioDotNo: {
    backgroundColor: "#FFF",
  },
  optionText: {
    fontSize: 18,
    color: Colors.text.primary,
    flex: 1,
  },
  optionTextSelected: {
    color: "#FFF",
    fontWeight: "500",
  },
  optionIcon: {
    marginLeft: 10,
  },
  painScaleSection: {
    marginTop: 15,
    backgroundColor: Colors.surface,
    padding: 15,
    borderRadius: 15,
  },
  painScaleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 15,
  },
  painScaleContainer: {
    marginBottom: 10,
  },
  painLevelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  painLevel: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },
  painLevelSelected: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  painLevelText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  painLevelTextSelected: {
    fontSize: 14,
  },
  painLegend: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  painLegendText: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  painDescription: {
    marginTop: 15,
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 8,
  },
  painDescriptionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 5,
  },
  painDescriptionText: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
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

export default BackPain;
