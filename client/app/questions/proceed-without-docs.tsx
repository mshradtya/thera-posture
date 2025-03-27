import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const ProceedWithoutDocs = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Yes", "No"];

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
            <View style={[styles.progressIndicator, { width: "70%" }]} />
          </View>
          <Text style={styles.progressText}>4/5</Text>
        </View>

        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="close" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

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
                  uri: "https://cdn-icons-png.flaticon.com/512/1483/1483136.png",
                }}
                style={styles.headerImage}
                resizeMode="contain"
              />
            </LinearGradient>
          </View>

          {/* Header Section */}
          <View style={styles.headerTextSection}>
            <Text style={styles.title}>Missing Documentation</Text>
            <Text style={styles.subtitle}>
              Without medical documentation, we'll need to gather more
              information about your condition to provide appropriate
              recommendations.
            </Text>
          </View>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <Text style={styles.question}>
              Would you like to proceed without documentation?
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
                        router.push("/questions/back-pain");
                      } else {
                        router.push("/questions/exit-not-suitable");
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
                    {option === "Yes"
                      ? "Yes, proceed anyway"
                      : "No, I'll get documentation"}
                  </Text>

                  {/* Icon indicator */}
                  {option === "Yes" ? (
                    <Ionicons
                      name="warning-outline"
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
                      name="document-text-outline"
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

            {/* Warning Section */}
            <View style={styles.warningContainer}>
              <View style={styles.warningHeader}>
                <Ionicons name="alert-circle" size={24} color="#ffb74d" />
                <Text style={styles.warningTitle}>Important Note</Text>
              </View>
              <Text style={styles.warningText}>
                Proceeding without documentation may limit the personalization
                of our recommendations. We encourage obtaining medical
                documentation when possible.
              </Text>

              <View style={styles.limitationItem}>
                <Ionicons
                  name="remove-circle-outline"
                  size={18}
                  color={Colors.error}
                />
                <Text style={styles.limitationText}>
                  Limited personalization
                </Text>
              </View>

              <View style={styles.limitationItem}>
                <Ionicons
                  name="remove-circle-outline"
                  size={18}
                  color={Colors.error}
                />
                <Text style={styles.limitationText}>
                  Less targeted recommendations
                </Text>
              </View>

              <View style={styles.limitationItem}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color="#81c784"
                />
                <Text style={styles.limitationText}>
                  You can add documents later
                </Text>
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
  warningContainer: {
    backgroundColor: "rgba(255, 183, 77, 0.1)",
    borderRadius: 15,
    padding: 16,
    marginTop: 10,
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffb74d",
    marginLeft: 8,
  },
  warningText: {
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
    marginBottom: 12,
  },
  limitationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  limitationText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 8,
  },
});

export default ProceedWithoutDocs;
