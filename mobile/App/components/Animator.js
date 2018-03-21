import React from "react";
import { Animated } from "react-native";

export default class App extends React.Component {
  static defaultProps = {
    visible: true
  };

  animatedValue = new Animated.Value(0);

  componentDidMount() {
    if (this.props.visible) {
      this.display();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible) {
      this.display();
    } else {
      this.dismiss();
    }
  }

  display = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  dismiss = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  render() {
    const rotateY = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["90deg", "0deg"]
    });

    const scale = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1]
    });

    const s = [
      {
        alignSelf: "stretch",
        opacity: this.animatedValue,
        transform: [{ rotateY }, { scale }]
      }
    ];

    return <Animated.View style={s}>{this.props.children}</Animated.View>;
  }
}
