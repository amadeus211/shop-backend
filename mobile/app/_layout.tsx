import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "../context/UserContext"; 

const StackLayout = () => {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
};

export default StackLayout;
