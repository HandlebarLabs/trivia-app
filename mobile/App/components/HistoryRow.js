import React from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment";

import { P } from "./Text";

export default (props) => {
  const rowStyle = [styles.row];
  if (props.index === 0) {
    rowStyle.push(styles.borderTop);
  }

  return (
    <View style={rowStyle}>
      {props.data.questions.map(question => <P key={question._id}>- {question.question}</P>)}
      <P subtle>{moment(props.createdAt).format("h:mm A M/D/YYYY")}</P>
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
