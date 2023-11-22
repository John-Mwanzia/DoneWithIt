

import * as Notifications from "expo-notifications";

import Constants from "expo-constants";



import expoPushTokensApi from "../api/expoPushTokens";
// import navigation from "./rootNavigation";
import { useEffect } from "react";



export default useNotification = (notificationListener) => {
  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener)
      Notifications.addNotificationReceivedListener(notificationListener);

  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Notifications.getPermissionsAsync();
      if (!permission.granted) return;

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      expoPushTokensApi.register(token.data);
    } catch (error) {
      console.log("Error getting a push token ", error);
    }
  };
};
