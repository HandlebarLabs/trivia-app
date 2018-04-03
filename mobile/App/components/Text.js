import React from "react";
import { StyleSheet, Text } from "react-native";

export const H1 = props => <Text style={styles.title}>{props.children}</Text>;

export const H2 = (props) => {
  const s = [styles.question];
  if (props.center) s.push({ textAlign: "center" });
  return <Text style={s}>{props.children}</Text>;
};

export const AnswerText = props => (
  <Text style={[styles.answer, props.bold && styles.answerBold]}>{props.children}</Text>
);

export const AnswerRowText = props => <Text style={styles.answerRow}>{props.children}</Text>;

export const P = ({
  children, center, bold, subtle,
}) => {
  const s = [styles.standard];
  if (center) s.push({ textAlign: "center" });
  if (bold) s.push({ fontFamily: "quicksand-bold" });
  if (subtle) s.push({ fontSize: 15 });

  return <Text style={s}>{children}</Text>;
};

const styles = StyleSheet.create({
  question: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: "quicksand-light",
    color: "#4A4A4A",
  },
  answer: {
    marginBottom: 6,
    fontSize: 20,
    lineHeight: 25,
    color: "#4A4A4A",
    fontFamily: "quicksand-regular",
  },
  answerBold: {
    fontFamily: "quicksand-bold",
  },
  answerRow: {
    fontSize: 20,
    lineHeight: 25,
    color: "#4A4A4A",
    fontFamily: "quicksand-light",
  },
  title: {
    fontSize: 40,
    lineHeight: 50,
    marginBottom: 11,
    color: "#4A4A4A",
    fontFamily: "bangers-regular",
    textAlign: "center",
  },
  standard: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: "quicksand-regular",
    color: "#4A4A4A",
  },
});
