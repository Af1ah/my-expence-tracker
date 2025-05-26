import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler globally
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,   // Show notification banner (iOS)
    shouldShowList: true,     // Add to notification center
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for notifications!');
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

export async function scheduleLocalNotification(message: string, delayInSeconds = 5) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🔔 Reminder',
      body: message,
      sound: 'default',
      data: {
        screen: '/(tab)/analytics', // 👈 your route
      },
    },
    trigger: {
      type: 'timeInterval',
      seconds: delayInSeconds,
      repeats: false,
    },
  });
}

