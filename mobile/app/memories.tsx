import { Link, useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import NLWLogo from "../src/assets/nlw-spacetime-logo.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { Image } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../src/lib/api";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

type Memory = {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
};
    
dayjs.locale(ptBr);

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets();
  const router = useRouter();
  const [memories, setMemories] = useState<Memory[]>([]);

  async function signOut() {
    await SecureStore.deleteItemAsync("token");

    router.push("/");
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync("token");
    const response = await api.get("/memories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemories(response.data);
  }

  useEffect(() => {
    loadMemories();
  }, []);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex-row items-center justify-between mt-4 px-8">
        <NLWLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-red-500">
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => {
          return (
            <View key={memory.id} className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
                </Text>
              </View>

              <View className="space-y-4 px-8">
                <Image
                  alt=""
                  source={{
                    uri: memory.coverUrl,
                  }}
                  className="aspect-video w-full rounded-lg"
                />
                <Text className="font-body text-base text-gray-100 leading-relaxed">
                  {memory.excerpt}
                </Text>
                <Link href="/memories/id" asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
