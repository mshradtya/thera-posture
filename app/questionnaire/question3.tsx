import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

const Question3 = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Poor", "Average", "Good", "Excellent"];

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>SLEEP QUALITY</Text>
        <Text style={styles.fact}>
          People with good sleep quality are 40% more productive during the day.
        </Text>
        {/* Separator */}
        <View style={styles.separator} />
        <Text style={styles.question}>
          How would you rate your current sleep quality?
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedOption === option && styles.optionSelected,
            ]}
            onPress={() => {
              setSelectedOption(option);
              setTimeout(() => router.push("/questionnaire/question4"), 300);
            }}
            activeOpacity={0.8}
          >
            {/* Radio Button */}
            <View style={styles.radioCircle}>
              {selectedOption === option && <View style={styles.radioDot} />}
            </View>
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.tint,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#555",
  },
  fact: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
    lineHeight: 20,
  },
  separator: {
    height: 3,
    backgroundColor: "#DDD",
    marginVertical: 15,
    width: "20%",
  },
  question: {
    fontSize: 18,
    fontWeight: 400,
    color: "#333",
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  optionSelected: {
    backgroundColor: "#DCE4FF",
    borderColor: Colors.tint,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.tint,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  optionTextSelected: {
    color: Colors.tint,
    fontWeight: "bold",
  },
});

export default Question3;
