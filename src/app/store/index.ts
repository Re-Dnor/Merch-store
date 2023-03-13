import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "features/product-list/slice/slice";
import groupsReducer from "features/group-list/slice/slice";
import currentProductReducer from "features/buy-product/slice/slice";
import basketReducer from "features/order/slice/slice";
import notificationReducer from "shared/ui/notifications/slice/slice";

export const persistConfig = {
  key: "root",
  storage,
  whitelist: ["basket"],
};

const rootReducer = combineReducers({
  products: productsReducer,
  groups: groupsReducer,
  currentProduct: currentProductReducer,
  basket: basketReducer,
  notifications: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;
