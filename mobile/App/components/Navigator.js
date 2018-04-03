import React from "react";
import { View, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const DIRECTIONS = {
  horizontal: "horizontal",
  vertical: "vertical",
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScene: props.initialSceneName || Object.keys(props.scenes)[0],
      nextSceneProps: null,
      direction: DIRECTIONS.horizontal,
    };
  }

  componentDidMount() {
    this.animateScreenForward(false);
  }

  animatedValue = new Animated.Value(0);

  animateScreenForward = dismiss =>
    new Promise((resolve) => {
      Animated.spring(this.animatedValue, {
        toValue: dismiss ? 2 : 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        if (dismiss) {
          this.animatedValue.setValue(0);
        }
        resolve();
      });
    });

  animateScreenBackward = dismiss =>
    new Promise((resolve) => {
      Animated.spring(this.animatedValue, {
        toValue: dismiss ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        if (dismiss) {
          this.animatedValue.setValue(2);
        }
        resolve();
      });
    });

  goTo = (sceneName, props = {}, direction = DIRECTIONS.horizontal) => {
    this.setState({ direction }, () => {
      this.animateScreenForward(true).then(() => {
        this.setState({ currentScene: sceneName, nextSceneProps: props }, () =>
          this.animateScreenForward(false));
      });
    });
  };

  goBackTo = (sceneName, props = {}, direction = DIRECTIONS.horizontal) => {
    this.setState({ direction }, () => {
      this.animateScreenBackward(true).then(() => {
        this.setState({ currentScene: sceneName, nextSceneProps: props }, () =>
          this.animateScreenBackward(false));
      });
    });
  };

  render() {
    const scene = this.props.scenes[this.state.currentScene];
    const CurrentScene = scene ? scene.component : View;

    const s = {
      alignSelf: "stretch",
      flex: 1,
    };

    if (this.state.direction === DIRECTIONS.horizontal) {
      s.transform = [
        {
          translateX: this.animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [width, 0, -width],
          }),
        },
      ];
    } else if (this.state.direction === DIRECTIONS.vertical) {
      s.transform = [
        {
          translateY: this.animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [height, 0, -height],
          }),
        },
      ];
    }

    return (
      <Animated.View style={s}>
        <CurrentScene goTo={this.goTo} goBackTo={this.goBackTo} {...this.state.nextSceneProps} />
      </Animated.View>
    );
  }
}
