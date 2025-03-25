import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const BackPain = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");
  const [painLevel, setPainLevel] = useState(0);

  const options = ["Yes", "No"];

  const handlePainLevelSelect = (level) => {
    setPainLevel(level);
    setSelectedOption("Yes");
  };

  return (
    <View style={styles.container}>
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
            <View style={[styles.progressIndicator, { width: "90%" }]} />
          </View>
          <Text style={styles.progressText}>5/5</Text>
        </View>

        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Content Container with Shadow */}
      <View style={styles.contentContainer}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2966/2966334.png",
            }}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>BACK ASSESSMENT</Text>
          <Text style={styles.fact}>
            Back pain affects 80% of people at some point in their lives, and
            understanding your pain is crucial for proper care.
          </Text>
          <View style={styles.separator} />
          <Text style={styles.question}>Do you experience back pain?</Text>
        </View>

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
                      option === "Yes" ? styles.radioDotYes : styles.radioDotNo,
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
                  color={selectedOption === option ? "#FFF" : "#a1a1a1"}
                  style={styles.optionIcon}
                />
              ) : (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={selectedOption === option ? "#FFF" : "#a1a1a1"}
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

      {/* Continue Button - Fixed at bottom */}
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
    </View>
  );
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121520",
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
  optionsContainer: {
    marginTop: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#2a2f3b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionSelectedYes: {
    backgroundColor: "#4a6cf7",
    borderColor: "#4a6cf7",
  },
  optionSelectedNo: {
    backgroundColor: "#38b2ac",
    borderColor: "#38b2ac",
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#999",
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
    color: "#e1e1e1",
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
    backgroundColor: "rgba(74, 108, 247, 0.05)",
    padding: 15,
    borderRadius: 15,
  },
  painScaleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e1e1e1",
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
    color: "#a1a1a1",
  },
  painDescription: {
    marginTop: 15,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 12,
    borderRadius: 8,
  },
  painDescriptionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e1e1e1",
    marginBottom: 5,
  },
  painDescriptionText: {
    fontSize: 13,
    color: "#a1a1a1",
    lineHeight: 18,
  },

  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: "#1e222b",
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

export default BackPain;
