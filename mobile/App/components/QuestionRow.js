import React from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";

import { AnswerText, AnswerRowText } from "./Text";

export default class QuestionRow extends React.Component {
  static defaultProps = {
    totalResponses: 0,
    answerResponses: 0,
    wasCorrect: false,
    wasUserAnswer: false,
    onPress: () => null,
  };

  state = {
    width: 0,
  };

  componentDidUpdate() {
    if (this.props.answered === true) {
      this.animateAnswerValue();
    }
  }

  _animatedWidth = new Animated.Value(0);

  handleOnLayout = ({ nativeEvent }) => {
    this.setState({ width: nativeEvent.layout.width });
  };

  animateAnswerValue = () => {
    const percentage = this.props.answerResponses / this.props.totalResponses;
    const width = Math.floor(this.state.width * percentage);

    Animated.timing(this._animatedWidth, {
      toValue: width,
    }).start();
  };

  render() {
    const rowStyle = [styles.row];
    if (this.props.index === 0) {
      rowStyle.push(styles.borderTop);
    }

    const answerRowStyles = [styles.answerRow];
    if (this.props.answered) {
      answerRowStyles.push(styles.answerRowFilled);
    }

    const answerBarStyles = [styles.answerBar, { width: this._animatedWidth }];
    if (this.props.isCorrectAnswer) {
      answerBarStyles.push(styles.answerBarCorrect);
    } else if (this.props.wasUserAnswer) {
      answerBarStyles.push(styles.answerBarWrong);
    } else {
      answerBarStyles.push(styles.answerBarNeutral);
    }

    return (
      <TouchableOpacity
        style={rowStyle}
        disabled={this.props.answered}
        onPress={this.props.onPress}
      >
        <View style={styles.innerRow}>
          <AnswerText bold={this.props.wasUserAnswer}>{this.props.answer}</AnswerText>
          <View style={answerRowStyles} onLayout={this.handleOnLayout}>
            <Animated.View style={answerBarStyles} />
            {this.props.answered && (
              <AnswerRowText>
                {this.props.answerResponses}/{this.props.totalResponses}
              </AnswerRowText>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#F5F4F6",
    marginHorizontal: -10,
  },
  innerRow: {
    marginHorizontal: 10,
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: "#F5F4F6",
  },
  answerRow: {
    height: 30,
    borderRadius: 15,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  answerRowFilled: {
    backgroundColor: "#F5F4F6",
  },
  answerBar: {
    borderRadius: 15,
    marginVertical: 0,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
  answerBarCorrect: {
    backgroundColor: "#BAE4CF",
  },
  answerBarWrong: {
    backgroundColor: "#F0C6D5",
  },
  answerBarNeutral: {
    backgroundColor: "#D8D8D8",
  },
});
