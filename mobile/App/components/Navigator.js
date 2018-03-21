import React from "react";
import { View, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScene: props.initialSceneName || Object.keys(props.scenes)[0],
      nextSceneProps: null
    };
  }

  animatedValue = new Animated.Value(0);

  componentDidMount() {
    this.display();
  }

  display = () => {
    return new Promise(resolve => {
      Animated.spring(this.animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start(() => resolve());
    });
  };

  dismiss = () => {
    return new Promise(resolve => {
      Animated.spring(this.animatedValue, {
        toValue: 2,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        this.animatedValue.setValue(0);
        resolve();
      });
    });
  };

  goTo = (sceneName, props = {}) => {
    this.dismiss().then(() => {
      this.setState({ currentScene: sceneName, nextSceneProps: props }, () =>
        this.display()
      );
    });
  };

  render() {
    const scene = this.props.scenes[this.state.currentScene];
    const CurrentScene = scene ? scene.component : View;
    const sceneProps = scene ? scene.props : {};

    const translateX = this.animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [width, 0, -width]
    });

    const s = [
      {
        alignSelf: "stretch",
        flex: 1,
        transform: [{ translateX }]
      }
    ];

    return (
      <Animated.View style={s}>
        <CurrentScene
          goTo={this.goTo}
          {...sceneProps}
          {...this.state.nextSceneProps}
        />
      </Animated.View>
    );
  }
}
