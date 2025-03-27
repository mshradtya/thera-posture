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

const ExitWeight = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Top Bar */}
      <View style={styles.header}>
        <View style={styles.topBarPlaceholder} />
        <Text style={styles.headerTitle}>Weight Requirement</Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="close" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Illustration */}
          <View style={styles.imageContainer}>
            <LinearGradient
              colors={[Colors.error, "#FF8A80"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.iconCircle}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/4294/4294038.png",
                }}
                style={styles.illustration}
                resizeMode="contain"
              />
            </LinearGradient>
          </View>

          {/* Main Content */}
          <View style={styles.contentCard}>
            <Text style={styles.title}>Weight Outside Range</Text>

            <Text style={styles.message}>
              Our current products are designed for weights between 45kg-120kg
              (100-265lbs). Your weight falls outside this range, which means
              our standard solutions may not provide optimal support and
              durability for you.
            </Text>

            <View style={styles.infoContainer}>
              <View style={styles.infoHeader}>
                <Ionicons
                  name="fitness-outline"
                  size={24}
                  color={Colors.error}
                />
                <Text style={styles.infoTitle}>Why Weight Matters</Text>
              </View>
              <Text style={styles.infoText}>
                Posture support products must be designed with appropriate
                materials and support levels for your weight range. Using a
                product not designed for your weight could result in reduced
                effectiveness or product failure over time.
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              <Text style={styles.optionsTitle}>What You Can Do:</Text>

              <View style={styles.optionItem}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="call" size={16} color="#FFF" />
                </View>
                <Text style={styles.optionText}>
                  Contact our customer support for specialized recommendations
                </Text>
              </View>

              <View style={styles.optionItem}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="body-outline" size={16} color="#FFF" />
                </View>
                <Text style={styles.optionText}>
                  Consider a custom-made solution for your specific needs
                </Text>
              </View>

              <View style={styles.optionItem}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="medkit" size={16} color="#FFF" />
                </View>
                <Text style={styles.optionText}>
                  Consult with a healthcare professional for personalized advice
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
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
  topBarPlaceholder: {
    width: 24, // Same as close icon width
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 120, // Space for bottom buttons
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.error,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  illustration: {
    width: 50,
    height: 50,
    tintColor: "#FFFFFF",
  },
  contentCard: {
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  infoContainer: {
    backgroundColor: "#FFF5F5", // Light red background
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 12,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  optionIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionText: {
    fontSize: 15,
    color: Colors.text.secondary,
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    color: Colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ExitWeight;
