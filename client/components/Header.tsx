// client/components/PrimaryHeader.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

interface PrimaryHeaderProps {
  title: string;
  showBack?: boolean;
  showClose?: boolean;
  showProgress?: boolean;
  progressValue?: number;
  progressText?: string;
  onBackPress?: () => void;
  onClosePress?: () => void;
}

const PrimaryHeader: React.FC<PrimaryHeaderProps> = ({
  title,
  showBack = true,
  showClose = true,
  showProgress = false,
  progressValue = 0,
  progressText = "",
  onBackPress,
  onClosePress,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const handleClosePress = () => {
    if (onClosePress) {
      onClosePress();
    } else {
      router.replace("/");
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {showBack ? (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholderButton} />
          )}

          {showProgress ? (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressIndicator,
                    { width: `${progressValue}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{progressText}</Text>
            </View>
          ) : (
            <Text style={styles.headerTitle}>{title}</Text>
          )}

          {showClose ? (
            <TouchableOpacity onPress={handleClosePress}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholderButton} />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 5,
  },
  placeholderButton: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
  },
  progressText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "500",
  },
});

export default PrimaryHeader;
