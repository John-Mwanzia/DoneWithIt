import { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";

import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import AuthStorage from "./app/auth/storage";
import * as SplashScreen from "expo-splash-screen";
import { navigationRef } from "./app/navigation/rootNavigation";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [user, setUser] = useState();
  const [appIsReady, setAppIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await AuthStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await restoreUser();
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) return null;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
