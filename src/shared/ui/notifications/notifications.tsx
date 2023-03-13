import React, { memo, useCallback, useMemo } from "react";
import {
  Notification,
  NotificationProps,
} from "@alfalab/core-components/notification";
import { NotificationManager } from "@alfalab/core-components/notification-manager";
import { Spinner } from "@alfalab/core-components/spinner";
import { useAppDispatch, useAppSelector } from "app/store";

import { mainSelector } from "./slice/selectors";
import { remove } from "./slice/slice";

export const Notifications = memo(() => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector(mainSelector);

  const handleRemoveNotification = useCallback(
    (id: string) => {
      dispatch(remove(id));
    },
    [dispatch]
  );

  const notificationsList = useMemo(
    () =>
      notifications.map((notification: NotificationProps) => {
        const { id, title, badge, autoCloseDelay, children } =
          notification || {};

        return (
          <Notification
            key={id}
            id={id}
            title={title}
            badge={badge}
            autoCloseDelay={autoCloseDelay}
            leftAddons={
              badge ? null : (
                <Spinner visible={true} size="s" colors="inverted" />
              )
            }
          >
            {children}
          </Notification>
        );
      }),
    [notifications]
  );

  return (
    <NotificationManager
      notifications={notificationsList}
      onRemoveNotification={handleRemoveNotification}
    />
  );
});
