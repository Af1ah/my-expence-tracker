import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { router } from 'expo-router';



export function useNotificationRedirect() {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const screen = response.notification.request.content.data?.screen;

      if (screen) {
        router.push("/analytics"); // Push to a specific route
      }
    });

    return () => subscription.remove();
  }, []);
}
