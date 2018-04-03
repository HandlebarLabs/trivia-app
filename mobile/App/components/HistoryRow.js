import React from "react";
import { StyleSheet, View } from "react-native";

import { AnswerText } from "./Text";

export default (props) => {
  const rowStyle = [styles.row];
  if (props.index === 0) {
    rowStyle.push(styles.borderTop);
  }

  return (
    <View style={rowStyle}>
      <AnswerText>{props.question}</AnswerText>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#F5F4F6",
    marginHorizontal: -10,
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: "#F5F4F6",
  },
});
