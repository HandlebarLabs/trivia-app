import React from "react";
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";

export default ({ onPress = () => null, children }) => (
  <TouchableHighlight
    onPress={onPress}
    style={styles.button}
    underlayColor="#409773"
  >
    <Text style={styles.text}>{children}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4DB389",
    padding: 20,
    borderRadius: 30,
    paddingHorizontal: 60
  },
  text: {
    color: "#fff"
  }
});
