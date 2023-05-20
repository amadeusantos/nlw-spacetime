import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import blurBg from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";
import { SplashScreen, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import { useEffect, useState } from "react";

const StyledStripes = styled(Stripes);

export default function Layaout() {

    const [isUserAuthenticated, setIsUserAuthenticate] = useState<null | boolean>(null);
    
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
        setIsUserAuthenticate(!!token);
    })
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{ position: "absolute", left: "-100%" }}
      className="relative bg-gray-900 flex-1"
    >
      <StatusBar style="light" translucent />
      <StyledStripes className="absolute left-2" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          animation: "fade"
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  );
}
