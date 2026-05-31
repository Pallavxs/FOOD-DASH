import { useEffect } from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
  useEffect(() => {
    // Socket test removed for production cleanup
  }, []);

  return (
    <View>
      <Text>Screen removed</Text>
    </View>
  );
}