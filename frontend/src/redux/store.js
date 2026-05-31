import { configureStore , combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./slices/authSlice";
import restaurantReducer from "./slices/restaurantSlice";
import cartReducer from "./slices/cartSlice";
let storage;
if (Platform.OS === "web") {
  storage = require("redux-persist/lib/storage").default;
} else {
  storage = AsyncStorage;
}

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "cart"],
};

const rootReducer = {
  auth: authReducer,
  restaurant: restaurantReducer,
  cart: cartReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
