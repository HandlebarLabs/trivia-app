import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default ({ correct, total }) => (
  <View style={styles.container}>
    <View style={styles.textBlock}>
      <Text style={styles.text}>Correct Answers</Text>
      <Text style={styles.countText}>{correct}</Text>
    </View>
    <View style={styles.border} />
    <View style={styles.textBlock}>
      <Text style={styles.text}>Total Answers</Text>
      <Text style={styles.countText}>{total}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginLeft: -20,
    marginRight: -20,
    justifyContent: "center"
  },
  border: {
    backgroundColor: "#ccc",
    width: 1
  },
  textBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  countText: {
    fontSize: 20
  }
});
