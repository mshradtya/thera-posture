import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const AssessmentComplete = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Bar */}
      <LinearGradient
        colors={["#4CAF50", "#2E7D32"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topBar}
      >
        <View style={styles.topBarPlaceholder} />
        <Text style={styles.topBarTitle}>Assessment Complete</Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        {/* Content Container with Shadow */}
        <View style={styles.contentContainer}>
          {/* Success Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={80} color="#FFF" />
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.messageContainer}>
            <Text style={styles.title}>Assessment Successful!</Text>

            <Text style={styles.message}>
              Based on your responses, we've analyzed your posture needs and
              identified the most suitable solutions for you.
            </Text>

            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Your Results</Text>

              <View style={styles.resultCard}>
                <View style={styles.resultIconContainer}>
                  <Ionicons name="body-outline" size={24} color="#FFF" />
                </View>
                <View style={styles.resultContent}>
                  <Text style={styles.resultCardTitle}>Posture Profile</Text>
                  <Text style={styles.resultCardText}>
                    Your responses indicate you may benefit from moderate back
                    support with attention to lower back alignment.
                  </Text>
                </View>
              </View>

              <View style={styles.resultCard}>
                <View
                  style={[
                    styles.resultIconContainer,
                    { backgroundColor: "#5C6BC0" },
                  ]}
                >
                  <Ionicons name="fitness-outline" size={24} color="#FFF" />
                </View>
                <View style={styles.resultContent}>
                  <Text style={styles.resultCardTitle}>Support Level</Text>
                  <Text style={styles.resultCardText}>
                    Medium support recommended based on your activity levels and
                    reported discomfort.
                  </Text>
                </View>
              </View>

              <View style={styles.resultCard}>
                <View
                  style={[
                    styles.resultIconContainer,
                    { backgroundColor: "#26A69A" },
                  ]}
                >
                  <Ionicons name="timer-outline" size={24} color="#FFF" />
                </View>
                <View style={styles.resultContent}>
                  <Text style={styles.resultCardTitle}>Usage Pattern</Text>
                  <Text style={styles.resultCardText}>
                    Optimal for daily use during seated activities with periodic
                    adjustment.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.nextStepsContainer}>
              <Text style={styles.nextStepsTitle}>Next Steps</Text>
              <Text style={styles.nextStepsText}>
                View our product recommendations based on your assessment
                results. We've selected options that will best address your
                posture needs.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/products")}
        >
          <Text style={styles.primaryButtonText}>View Recommendations</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.secondaryButtonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121520",
  },
  scrollView: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 50, // Adjust for status bar
  },
  topBarPlaceholder: {
    width: 24, // Same as close icon width
  },
  topBarTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
    backgroundColor: "#1e222b",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 120, // Space for bottom buttons
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  messageContainer: {
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#e1e1e1",
    textAlign: "center",
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: "#a1a1a1",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  resultContainer: {
    marginBottom: 30,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e1e1e1",
    marginBottom: 20,
  },
  resultCard: {
    flexDirection: "row",
    backgroundColor: "#282d3a",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  resultIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#4a6cf7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  resultContent: {
    flex: 1,
  },
  resultCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e1e1e1",
    marginBottom: 5,
  },
  resultCardText: {
    fontSize: 14,
    color: "#a1a1a1",
    lineHeight: 20,
  },
  nextStepsContainer: {
    backgroundColor: "rgba(74, 108, 247, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginTop: 5,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e1e1e1",
    marginBottom: 10,
  },
  nextStepsText: {
    fontSize: 14,
    color: "#a1a1a1",
    lineHeight: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1e222b",
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  primaryButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  secondaryButtonText: {
    color: "#a1a1a1",
    fontSize: 16,
  },
});

export default AssessmentComplete;
