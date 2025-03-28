import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import PrimaryHeader from "@/components/Header";

const { width } = Dimensions.get("window");

const UploadDocuments = () => {
  const router = useRouter();
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = () => {
    // Mock function for document upload
    // In a real app, this would trigger document picker
    const newDoc = {
      id: uploadedDocs.length + 1,
      name: `Medical Report ${uploadedDocs.length + 1}.pdf`,
      size: "2.4 MB",
      date: new Date().toLocaleDateString(),
    };

    setUploadedDocs([...uploadedDocs, newDoc]);
    setUploadSuccess(true);

    // Show success message
    Alert.alert(
      "Upload Successful",
      "Your document has been uploaded successfully. A professional practitioner will review your documents and get back shortly.",
      [{ text: "OK" }]
    );
  };

  const handleRemoveDoc = (id) => {
    setUploadedDocs(uploadedDocs.filter((doc) => doc.id !== id));
    if (uploadedDocs.length === 1) {
      setUploadSuccess(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryHeader
        title="Upload Documents"
        showProgress={true}
        progressValue={80}
        progressText="4/5"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerTextSection}>
          <Text style={styles.title}>Upload Documents</Text>
          <Text style={styles.subtitle}>
            Please upload your medical reports, MRIs, X-rays, or any other
            relevant documents to help us personalize your recommendations while
            avoiding injury.
          </Text>
        </View>

        {/* Professional review notice */}
        <View style={styles.reviewNoteContainer}>
          <Ionicons name="medical" size={20} color={Colors.primary} />
          <Text style={styles.reviewNoteText}>
            A professional practitioner will review your documents and get back
            shortly
          </Text>
        </View>

        {/* Upload Area */}
        <TouchableOpacity style={styles.uploadArea} onPress={handleUpload}>
          <View style={styles.uploadIconContainer}>
            <Ionicons
              name="cloud-upload-outline"
              size={32}
              color={Colors.primary}
            />
          </View>
          <Text style={styles.uploadText}>Upload Medical Reports</Text>
          <Text style={styles.uploadSubtext}>PDF, JPEG, or PNG (Max 10MB)</Text>
        </TouchableOpacity>

        {/* File format info */}
        <View style={styles.formatInfoContainer}>
          <View style={styles.formatItem}>
            <Ionicons
              name="document-outline"
              size={16}
              color={Colors.primary}
            />
            <Text style={styles.formatText}>PDF</Text>
          </View>
          <View style={styles.formatItem}>
            <Ionicons name="image-outline" size={16} color={Colors.primary} />
            <Text style={styles.formatText}>JPEG</Text>
          </View>
          <View style={styles.formatItem}>
            <Ionicons name="image-outline" size={16} color={Colors.primary} />
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
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={Colors.error}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Success message after upload - removed duplicate practitioner review message */}
        {uploadSuccess && (
          <View style={styles.successNoteContainer}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={Colors.success}
            />
            <Text style={styles.successNoteText}>
              Upload successful! Your documents have been received.
            </Text>
          </View>
        )}

        {/* Privacy note */}
        <View style={styles.privacyNote}>
          <Ionicons
            name="shield-checkmark-outline"
            size={16}
            color={Colors.text.secondary}
          />
          <Text style={styles.privacyText}>
            Your documents are securely encrypted and only used to provide
            personalized recommendations.
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Continue Button */}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  headerTextSection: {
    marginBottom: 20,
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
  reviewNoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F0FF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  reviewNoteText: {
    color: Colors.text.secondary,
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.primary,
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    marginBottom: 20,
  },
  uploadIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  uploadText: {
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: "bold",
  },
  uploadSubtext: {
    fontSize: 12,
    color: Colors.text.secondary,
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
    backgroundColor: Colors.surface,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  formatText: {
    color: Colors.text.secondary,
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
    color: Colors.text.primary,
  },
  documentsCount: {
    fontSize: 12,
    color: Colors.text.secondary,
    backgroundColor: Colors.inputBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
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
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: "500",
  },
  documentMetaInfo: {
    flexDirection: "row",
    marginTop: 5,
  },
  documentSize: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginRight: 12,
  },
  documentDate: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  documentRemoveBtn: {
    padding: 8,
  },
  successNoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: Colors.success,
  },
  successNoteText: {
    color: Colors.text.secondary,
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
  },
  privacyText: {
    fontSize: 12,
    color: Colors.text.secondary,
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
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  continueButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.text.tertiary,
    shadowOpacity: 0,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
});

export default UploadDocuments;
