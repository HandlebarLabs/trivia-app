import React from "react";
import { StyleSheet, Text } from "react-native";

export const QuestionText = props => (
  <Text style={styles.question}>{props.children}</Text>
);

export const AnswerText = props => (
  <Text style={styles.answer}>{props.children}</Text>
);

export const TitleText = props => (
  <Text style={styles.title}>{props.children}</Text>
);

export const StandardText = ({ children, center }) => {
  const s = [styles.standard];
  if (center) s.push({ textAlign: "center" });
  return <Text style={s}>{children}</Text>;
};

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    marginBottom: 20
  },
  answer: {},
  title: {
    fontSize: 40,
    marginBottom: 20
  },
  standard: {
    marginBottom: 10
  }
});
