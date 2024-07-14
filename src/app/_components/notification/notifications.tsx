"use client";
import React from "react";
import { useNotificationState } from "@/store/notification.store";
import { NotificationToast } from "./notification-toast";

const Notifications = () => {
  const notifications = useNotificationState((state) => state.notifications);
  if (notifications.length < 1) return null;
  return (
    <div className="fixed flex flex-col-reverse bottom-3 right-3 gap-3">
      {notifications.map((notification) => (
        <NotificationToast
          key={`notificaion-${notification.id}`}
          notification={notification}
        />
      ))}
    </div>
  );
};

export default Notifications;
