import React from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity
} from "react-native";

export const ButtonPlaceholder = () => (
  <View style={[styles.button, styles.buttonTransparent]}>
    <Text style={[styles.text, styles.textTransparent]}>Placeholder</Text>
  </View>
);

export const PrimaryButton = ({ onPress = () => null, children }) => (
  <TouchableHighlight
    onPress={onPress}
    style={styles.button}
    underlayColor="#409773"
  >
    <Text style={styles.text}>{children}</Text>
  </TouchableHighlight>
);

export const SecondaryButton = ({ onPress = () => null, children }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, styles.secondary]}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4DB389",
    padding: 20,
    borderRadius: 30,
    paddingHorizontal: 60,
    marginTop: 20
  },
  secondary: {
    backgroundColor: "transparent",
    paddingVertical: 10
  },
  buttonTransparent: {
    backgroundColor: "transparent"
  },
  text: {
    color: "#fff"
  },
  textTransparent: {
    color: "transparent"
  }
});
