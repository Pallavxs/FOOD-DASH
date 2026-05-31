import { Stack } from "expo-router";
import { Provider , useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { initSocket } from "../services/socketService";
import { store, persistor } from "../redux/store";
import Toast from "react-native-toast-message";

const SocketInitializer = () => {
  const user = useSelector(state => state.auth?.user);
  useEffect(() => {
    if (user && user._id) {
      initSocket(user._id);
    }
  }, [user]);
  return null;
};

export default function RootLayout() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketInitializer />
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </PersistGate>
    </Provider>
  );
}