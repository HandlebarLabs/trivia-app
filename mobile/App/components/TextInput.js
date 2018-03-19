import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default props => (
  <TextInput style={[styles.input, props.style]} {...props} />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f5f5f5",
    height: 40,
    marginBottom: 10,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10
  }
});
