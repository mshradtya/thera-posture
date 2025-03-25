import React from "react";
import { Stack } from "expo-router";

const QuestionsLayout = () => {
  return (
    <Stack>
      {/* Exclusion flow screens */}
      <Stack.Screen name="age-check" options={{ headerShown: false }} />
      <Stack.Screen name="exit-age" options={{ headerShown: false }} />
      <Stack.Screen name="height-check" options={{ headerShown: false }} />
      <Stack.Screen name="exit-height" options={{ headerShown: false }} />
      <Stack.Screen name="weight-check" options={{ headerShown: false }} />
      <Stack.Screen name="exit-weight" options={{ headerShown: false }} />
      <Stack.Screen name="waist-check" options={{ headerShown: false }} />
      <Stack.Screen name="exit-size" options={{ headerShown: false }} />

      {/* Existing screens */}
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

      {/* Completion screen */}
      <Stack.Screen
        name="assessment-complete"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default QuestionsLayout;
