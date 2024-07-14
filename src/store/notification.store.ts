import { Notification } from "@/types/notification.interface";
import { generateID } from "@/utils/string";
import { create } from "zustand";

type NotificationState = {
  notifications: Notification[];
  showNotification: (notification: Omit<Notification, "id">) => void;
  dissmissNotification: (id: string) => void;
};

export const useNotificationState = create<NotificationState>((set, get) => ({
  notifications: [],
  showNotification: (notification) => {
    const id = generateID();
    set((state) => ({
      notifications: [...state.notifications, { id, ...notification }],
    }));
    setTimeout(() => {
      get().dissmissNotification(id);
    }, notification.duration || 5000);
  },
  dissmissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },
}));

export const showNotification = (notificaitons: Omit<Notification, "id">[]) => {
  notificaitons.forEach((notificaiton) =>
    useNotificationState.getState().showNotification(notificaiton)
  );
};
