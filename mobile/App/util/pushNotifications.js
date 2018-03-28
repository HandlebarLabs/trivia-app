import { Linking } from "react-native";
import { Permissions, Notifications } from "expo";

export const pushNotificationsEnabled = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return false;
  }

  return true;
};

export const registerForPushNotifications = async () => {
  const enabled = await pushNotificationsEnabled();

  // Stop here if the user did not grant permissions
  if (!enabled) {
    return;
  }

  // Get the token that uniquely identifies this device
  return await Notifications.getExpoPushTokenAsync();
};

export const openSettings = () => {
  return Linking.openURL("app-settings:");
};
