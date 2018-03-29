import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, View } from "react-native";

// TODO: Scroll if content area larger than screen
export default props => (
  <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#468189" />
      {props.children}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85D4E7",
    justifyContent: "space-between",
    padding: 10,
  },
});
