import React from "react";
import { StyleSheet, View } from "react-native";

export default props => <View style={styles.card}>{props.children}</View>;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10
  }
});
