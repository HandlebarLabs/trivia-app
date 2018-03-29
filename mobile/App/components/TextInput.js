import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default props => (
  <TextInput style={[styles.input, props.style]} placeholderTextColor="#9B9B9B" {...props} />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F5F4F6",
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 10,
    fontFamily: "quicksand-regular",
    fontSize: 20,
    lineHeight: 25,
    color: "#9B9B9B",
  },
});
