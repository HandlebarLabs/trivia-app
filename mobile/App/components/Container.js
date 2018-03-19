import React from "react";
import { StyleSheet, Text, SafeAreaView, StatusBar } from "react-native";

export default props => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#468189" />
    {props.children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#468189",
    alignItems: "center",
    justifyContent: "center"
  }
});
