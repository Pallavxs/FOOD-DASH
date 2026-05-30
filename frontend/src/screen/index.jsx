import { useEffect } from "react";
import { View, Text } from "react-native";
import { socket } from "../socket/socket";

export default function HomeScreen() {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View>
      <Text>Socket Test</Text>
    </View>
  );
}