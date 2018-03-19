import React from "react";
import { StyleSheet, Text } from "react-native";

export const QuestionText = props => (
  <Text style={styles.question}>{props.children}</Text>
);

export const AnswerText = props => (
  <Text style={styles.answer}>{props.children}</Text>
);

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    marginBottom: 20
  },
  answer: {}
});
