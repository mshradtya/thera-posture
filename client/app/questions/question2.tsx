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

const Question2 = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Yes", "No"];

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryHeader
        title="Clinical Diagnosis"
        showProgress={true}
        progressValue={40}
        progressText="2/5"
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
                source={require("@/assets/images/doctor.png")}
                style={styles.headerImage}
                resizeMode="contain"
              />
            </LinearGradient>
          </View>

          {/* Header Section */}
          <View style={styles.headerTextSection}>
            <Text style={styles.title}>Clinical Diagnosis</Text>
            <Text style={styles.subtitle}>
              A clinical diagnosis will help us make appropriate recommendations
            </Text>
          </View>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <Text style={styles.question}>
              Do you have a clinical diagnosis for your spine issue?
            </Text>

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
                    // Route based on answer - added slight delay for animation
                    setTimeout(() => {
                      if (option === "Yes") {
                        router.push("/questions/medical-reports");
                      } else {
                        router.push("/questions/back-pain");
                      }
                    }, 400);
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
                      name="document-text-outline"
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
                      name="help-circle-outline"
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

            {/* Examples of clinical diagnoses */}
            <View style={styles.infoContainer}>
              <Ionicons
                name="information-circle"
                size={24}
                color={Colors.primary}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>
                  Examples of clinical diagnoses:
                </Text>
                <Text style={styles.infoText}>• Herniated disc</Text>
                <Text style={styles.infoText}>
                  • Hunchback condition (Slouching)
                </Text>
                <Text style={styles.infoText}>• Degenerative disc disease</Text>
                <Text style={styles.infoText}>• Scoliosis</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  infoContainer: {
    flexDirection: "row",
    backgroundColor: "#EEF1FF",
    borderRadius: 12,
    padding: 15,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },
  infoText: {
    color: Colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Question2;
