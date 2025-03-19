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

const Question1 = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Yes", "No"];

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
            <View style={styles.progressIndicator} />
          </View>
          <Text style={styles.progressText}>1/5</Text>
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
              uri: "https://cdn-icons-png.flaticon.com/512/2038/2038703.png",
            }}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>SPINE ASSESSMENT</Text>
          <Text style={styles.fact}>
            Understanding your spine health history helps us provide the most
            appropriate recommendations.
          </Text>
          <View style={styles.separator} />
          <Text style={styles.question}>
            Do you have any existing spine issues?
          </Text>
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
                // Route based on answer - added slight delay for animation
                setTimeout(() => {
                  if (option === "Yes") {
                    router.push("/questions/question2");
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
                  name="medical-outline"
                  size={20}
                  color={selectedOption === option ? "#FFF" : "#a1a1a1"}
                  style={styles.optionIcon}
                />
              ) : (
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={selectedOption === option ? "#FFF" : "#a1a1a1"}
                  style={styles.optionIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Information callout */}
        <View style={styles.infoContainer}>
          <Ionicons
            name="information-circle"
            size={24}
            color="#a1a1a1"
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Your answers help us customize the assessment to your specific
            needs.
          </Text>
        </View>
      </View>

      {/* Continue Button - Fixed at bottom */}
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedOption && styles.continueButtonDisabled,
          ]}
          onPress={() => {
            if (selectedOption) {
              if (selectedOption === "Yes") {
                router.push("/questions/question2");
              } else {
                router.push("/questions/back-pain");
              }
            }
          }}
          disabled={!selectedOption}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
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
    width: "20%",
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
  infoContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(74, 108, 247, 0.1)",
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
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

export default Question1;
