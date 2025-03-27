import React from "react";
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

const AssessmentComplete = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Top Bar */}
      <View style={styles.header}>
        <View style={styles.topBarPlaceholder} />
        <Text style={styles.headerTitle}>Assessment Complete</Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="close" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Content Container */}
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
                    { backgroundColor: Colors.secondary },
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
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
  topBarPlaceholder: {
    width: 24, // Same as close icon width
  },
  headerTitle: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 120, // Space for bottom buttons
  },
  contentContainer: {
    flex: 1,
    paddingTop: 30,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
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
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: Colors.text.secondary,
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
    color: Colors.text.primary,
    marginBottom: 20,
  },
  resultCard: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
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
    backgroundColor: Colors.primary,
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
    color: Colors.text.primary,
    marginBottom: 5,
  },
  resultCardText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  nextStepsContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 20,
    marginTop: 5,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 10,
  },
  nextStepsText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  primaryButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: Colors.primary,
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
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    color: Colors.text.secondary,
    fontSize: 16,
  },
});

export default AssessmentComplete;
