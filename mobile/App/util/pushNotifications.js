import React from "react";
import { View, Linking, Alert } from "react-native";
import { Permissions, Notifications } from "expo";

export const pushNotificationsEnabled = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
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
    return Promise.resolve();
  }

  // Get the token that uniquely identifies this device
  return Notifications.getExpoPushTokenAsync();
};

export const openSettings = () => Linking.openURL("app-settings:");

export const setBadgeNumber = (number = 0) => Notifications.setBadgeNumberAsync(number);

export const addPushNotificationListener = Notifications.addListener;

export class PushNotificationManager extends React.Component {
  static defaultProps = {
    onPushNotificationSelected: () => null,
    onPushNotificationReceived: () => null,
  };
  componentDidMount() {
    setBadgeNumber(0);

    this.notificationSubscription = addPushNotificationListener(this.handlePushNotification);
  }

  componentWillUnmount() {
    this.notificationSubscription.remove();
  }

  handlePushNotification = ({ data, origin }) => {
    if (origin === "selected") {
      // User opened app via push
      this.props.onPushNotificationSelected(data);
    } else if (origin === "received") {
      // App was open when notification was received
      Alert.alert("New questions available!", "Do you have what it takes?", [
        { text: "Ignore", style: "cancel" },
        { text: "Show Me", onPress: () => this.props.onPushNotificationReceived(data) },
      ]);
    }
  };

  render() {
    return <View style={{ flex: 1 }}>{this.props.children}</View>;
  }
}
