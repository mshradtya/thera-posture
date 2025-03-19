import React from "react";
import { Stack } from "expo-router";

const QuestionsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="question1" options={{ headerShown: false }} />
      <Stack.Screen name="question2" options={{ headerShown: false }} />
      <Stack.Screen name="back-pain" options={{ headerShown: false }} />
      <Stack.Screen name="exit-not-suitable" options={{ headerShown: false }} />
      <Stack.Screen name="medical-reports" options={{ headerShown: false }} />
      <Stack.Screen
        name="proceed-without-docs"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="upload-documents" options={{ headerShown: false }} />
    </Stack>
  );
};

export default QuestionsLayout;
