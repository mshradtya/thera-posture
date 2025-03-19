import React, { useState } from "react";
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

const UploadDocuments = () => {
  const router = useRouter();
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const handleUpload = () => {
    // Mock function for document upload
    // In a real app, this would trigger document picker
    setUploadedDocs([
      ...uploadedDocs,
      {
        id: uploadedDocs.length + 1,
        name: `Medical Report ${uploadedDocs.length + 1}.pdf`,
        size: "2.4 MB",
        date: new Date().toLocaleDateString(),
      },
    ]);
  };

  const handleRemoveDoc = (id) => {
    setUploadedDocs(uploadedDocs.filter((doc) => doc.id !== id));
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
            <View style={[styles.progressIndicator, { width: "70%" }]} />
          </View>
          <Text style={styles.progressText}>4/5</Text>
        </View>

        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Content Container with Shadow */}
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>UPLOAD DOCUMENTS</Text>
            <Text style={styles.fact}>
              Please upload your medical reports, MRIs, X-rays, or any other
              relevant documents to help us personalize your recommendations.
            </Text>
            <View style={styles.separator} />
          </View>

          {/* Upload Area */}
          <View style={styles.uploadArea}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUpload}
            >
              <View style={styles.uploadIconContainer}>
                <Ionicons name="cloud-upload-outline" size={32} color="#FFF" />
              </View>
              <Text style={styles.uploadText}>Upload Medical Reports</Text>
              <Text style={styles.uploadSubtext}>
                PDF, JPEG, or PNG (Max 10MB)
              </Text>
            </TouchableOpacity>
          </View>

          {/* File format info */}
          <View style={styles.formatInfoContainer}>
            <View style={styles.formatItem}>
              <Ionicons name="document-outline" size={16} color="#4a6cf7" />
              <Text style={styles.formatText}>PDF</Text>
            </View>
            <View style={styles.formatItem}>
              <Ionicons name="image-outline" size={16} color="#4a6cf7" />
              <Text style={styles.formatText}>JPEG</Text>
            </View>
            <View style={styles.formatItem}>
              <Ionicons name="image-outline" size={16} color="#4a6cf7" />
              <Text style={styles.formatText}>PNG</Text>
            </View>
          </View>

          {/* Uploaded Documents List */}
          {uploadedDocs.length > 0 && (
            <View style={styles.documentsContainer}>
              <View style={styles.documentsTitleRow}>
                <Text style={styles.documentsTitle}>Uploaded Documents</Text>
                <Text style={styles.documentsCount}>
                  {uploadedDocs.length} file
                  {uploadedDocs.length !== 1 ? "s" : ""}
                </Text>
              </View>

              {uploadedDocs.map((doc) => (
                <View key={doc.id} style={styles.documentItem}>
                  <View style={styles.documentIconContainer}>
                    <Ionicons name="document-text" size={20} color="#FFF" />
                  </View>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentName}>{doc.name}</Text>
                    <View style={styles.documentMetaInfo}>
                      <Text style={styles.documentSize}>{doc.size}</Text>
                      <Text style={styles.documentDate}>{doc.date}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.documentRemoveBtn}
                    onPress={() => handleRemoveDoc(doc.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#e57373" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Privacy note */}
          <View style={styles.privacyNote}>
            <Ionicons
              name="shield-checkmark-outline"
              size={16}
              color="#a1a1a1"
            />
            <Text style={styles.privacyText}>
              Your documents are securely encrypted and only used to provide
              personalized recommendations.
            </Text>
          </View>

          {/* Spacer for scroll */}
          <View style={{ height: 80 }} />
        </ScrollView>
      </View>

      {/* Continue Button - Fixed at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            uploadedDocs.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={() => router.push("/questions/back-pain")}
          disabled={uploadedDocs.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
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
  uploadArea: {
    marginVertical: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(74, 108, 247, 0.3)",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(74, 108, 247, 0.05)",
  },
  uploadButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4a6cf7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#4a6cf7",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  uploadText: {
    fontSize: 16,
    color: "#e1e1e1",
    fontWeight: "bold",
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#a1a1a1",
    marginTop: 5,
  },
  formatInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  formatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282d3a",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  formatText: {
    color: "#a1a1a1",
    fontSize: 12,
    marginLeft: 5,
  },
  documentsContainer: {
    marginBottom: 20,
  },
  documentsTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  documentsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e1e1e1",
  },
  documentsCount: {
    fontSize: 12,
    color: "#a1a1a1",
    backgroundColor: "#282d3a",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2f3b",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  documentIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#4a6cf7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    color: "#e1e1e1",
    fontWeight: "500",
  },
  documentMetaInfo: {
    flexDirection: "row",
    marginTop: 5,
  },
  documentSize: {
    fontSize: 12,
    color: "#a1a1a1",
    marginRight: 12,
  },
  documentDate: {
    fontSize: 12,
    color: "#a1a1a1",
  },
  documentRemoveBtn: {
    padding: 8,
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(74, 108, 247, 0.05)",
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
  },
  privacyText: {
    fontSize: 12,
    color: "#a1a1a1",
    marginLeft: 8,
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 15,
    backgroundColor: "#1e222b",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
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

export default UploadDocuments;
