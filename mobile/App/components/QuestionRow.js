import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { AnswerText } from "./Text";

export default ({ answer, onPress = () => null }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={styles.circle} />
    <AnswerText>{answer}</AnswerText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 5,
    alignSelf: "stretch",
    alignItems: "center",
    paddingVertical: 5,
    height: 40
  },
  circle: {
    width: 30,
    height: 30,
    borderColor: "#468189",
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 10
  }
});
