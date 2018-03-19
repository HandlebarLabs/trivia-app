import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated
} from "react-native";

import { AnswerText } from "./Text";

export default class App extends React.Component {
  static defaultProps = {
    totalResponses: 0,
    answerResponses: 0,
    wasCorrect: false
  };

  state = {
    width: new Animated.Value(0)
  };

  handleOnLayout = ({ nativeEvent }) => {
    const { answer, totalResponses, answerResponses, wasCorrect } = this.props;
    const percentage = answerResponses / totalResponses;
    const width = Math.floor(nativeEvent.layout.width * percentage);

    Animated.spring(this.state.width, {
      toValue: width
    }).start();
  };

  render() {
    const { answer, totalResponses, answerResponses, wasCorrect } = this.props;

    const answerBarStyles = [
      styles.row,
      styles.answerBarStyle,
      { width: this.state.width }
    ];
    if (wasCorrect) {
      answerBarStyles.push(styles.successBackground);
    } else {
      answerBarStyles.push(styles.failBackground);
    }

    return (
      <View style={styles.row} onLayout={this.handleOnLayout}>
        <Animated.View style={answerBarStyles} />
        <AnswerText>{answer}</AnswerText>
        <AnswerText>
          {answerResponses}/{totalResponses}
        </AnswerText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 5,
    alignSelf: "stretch",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    justifyContent: "space-between",
    height: 30
  },
  answerBarStyle: {
    marginVertical: 0,

    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0
  },
  successBackground: {
    backgroundColor: "green"
  },
  failBackground: {
    backgroundColor: "red"
  },
  circle: {
    width: 30,
    height: 30,
    borderColor: "#468189",
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 10
  }
});
