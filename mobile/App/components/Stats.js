import React from "react";
import { StyleSheet, View, Animated } from "react-native";

import { H2, P } from "./Text";

export default class Stats extends React.Component {
  _animatedWidth = new Animated.Value(0);

  handleOnLayout = ({ nativeEvent }) => {
    const percentage = this.props.correct / this.props.total;
    const width = Math.floor(nativeEvent.layout.width * percentage);

    Animated.spring(this._animatedWidth, {
      toValue: width,
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <H2>
          {this.props.username}
          {"'s"} stats:
        </H2>
        <View style={styles.row} onLayout={this.handleOnLayout}>
          <Animated.View style={[styles.fill, { width: this._animatedWidth }]} />
        </View>
        <P>
          <P bold>{this.props.correct}</P> correct out of <P bold>{this.props.total}</P> answered
        </P>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  row: {
    borderRadius: 30,
    backgroundColor: "#F5F4F6",
    alignSelf: "stretch",
    height: 35,
    marginBottom: 20,
  },
  fill: {
    borderRadius: 30,
    backgroundColor: "#5AADC1",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
});
