import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationProps } from "@alfalab/core-components/notification";
import { v1 } from "uuid";

export type NotificationsStateType = {
  notifications: NotificationProps[];
};

const initialState: NotificationsStateType = {
  notifications: [],
};

type AddNotificationProps = NotificationProps & { id?: string };

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    success: (state, action: PayloadAction<AddNotificationProps>) => {
      const {
        title,
        children = "",
        id,
        autoCloseDelay = 2000,
      } = action.payload;
      state.notifications.push({
        badge: "positive",
        title,
        children,
        autoCloseDelay,
        id: id || v1(),
      });
    },
    error: (state, action: PayloadAction<AddNotificationProps>) => {
      const {
        title,
        children = "",
        id,
        autoCloseDelay = 4000,
      } = action.payload;
      state.notifications.push({
        badge: "negative",
        title,
        children,
        autoCloseDelay,
        id: id || v1(),
      });
    },
    remove: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { success, error, remove } = notificationSlice.actions;

export default notificationSlice.reducer;
