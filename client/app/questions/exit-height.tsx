import React from "react";
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

const ExitHeight = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Bar */}
      <LinearGradient
        colors={["#e57373", "#c62828"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topBar}
      >
        <View style={styles.topBarPlaceholder} />
        <Text style={styles.topBarTitle}>Height Requirement</Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Content Container with Shadow */}
      <View style={styles.contentContainer}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/7161/7161487.png",
            }}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Main Content */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Height Outside Range</Text>

          <Text style={styles.message}>
            Our current products are designed for heights between 140cm-210cm
            (4'7"-6'11"). Your height falls outside this range, which means our
            standard solutions may not provide optimal support for you.
          </Text>

          <View style={styles.cardContainer}>
            <LinearGradient
              colors={["rgba(229, 115, 115, 0.1)", "rgba(198, 40, 40, 0.05)"]}
              style={styles.card}
            >
              <Ionicons
                name="resize-outline"
                size={24}
                color="#e57373"
                style={styles.cardIcon}
              />
              <Text style={styles.cardTitle}>Why Height Matters</Text>
              <Text style={styles.cardText}>
                Posture support products must be properly proportioned to your
                body height to be effective. Using a product not designed for
                your height could result in discomfort or potential posture
                issues.
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>What You Can Do:</Text>

            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="call" size={16} color="#FFF" />
              </View>
              <Text style={styles.benefitText}>
                Contact our customer support for specialized recommendations
              </Text>
            </View>

            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="medkit" size={16} color="#FFF" />
              </View>
              <Text style={styles.benefitText}>
                Consult with a healthcare professional
              </Text>
            </View>

            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="mail" size={16} color="#FFF" />
              </View>
              <Text style={styles.benefitText}>
                Join our waitlist for future specialized products
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.primaryButtonText}>Return to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  illustrationContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  illustration: {
    width: 150,
    height: 150,
    tintColor: "#e57373",
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
    marginBottom: 25,
  },
  cardContainer: {
    marginBottom: 25,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 5,
    borderLeftWidth: 3,
    borderLeftColor: "#e57373",
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e1e1e1",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#a1a1a1",
    lineHeight: 22,
  },
  benefitsContainer: {
    marginBottom: 30,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e1e1e1",
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  benefitIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4a6cf7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  benefitText: {
    fontSize: 14,
    color: "#a1a1a1",
  },
  actionContainer: {
    marginTop: "auto",
    paddingVertical: 30,
  },
  primaryButton: {
    backgroundColor: "#4a6cf7",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#4a6cf7",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
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

export default ExitHeight;
