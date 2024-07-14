import { showNotification } from "@/store/notification.store";
import { Problem } from "@/types/http-errors.interface";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { Notification } from "@/types/notification.interface";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      showNotifications(error as Problem);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      debugger;
      showNotifications(error as Problem);
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 60 * 24,
      throwOnError: false,
    },
  },
});

const showNotifications = (problem: Problem) => {
  let notificaitons: Omit<Notification, "id">[] = [];
  if (problem.errors) {
    for (const key in problem.errors) {
      problem.errors[key]?.map((errorMessage) =>
        notificaitons.push({
          message: errorMessage,
          type: "error",
        })
      );
    }
  } else if (problem.detail) {
    notificaitons.push({
      message: problem.detail,
      type: "error",
    });
  }

  showNotification(notificaitons);
};
