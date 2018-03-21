import React from "react";
import { View } from "react-native";

import Animator from "./Animator";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScene: props.initialSceneName || Object.keys(props.scenes)[0],
      sceneVisible: true
    };
  }

  goTo = sceneName => {
    // TODO: Improve this
    this.setState({ sceneVisible: false }, () => {
      setTimeout(() => {
        this.setState({ currentScene: sceneName, sceneVisible: true });
      }, Animator.ANIMATION_DURATION / 2);
    });
  };

  render() {
    const scene = this.props.scenes[this.state.currentScene];
    console.log(this.state.currentScene);
    const CurrentScene = scene ? scene.component : View;

    return (
      <Animator visible={this.state.sceneVisible}>
        <CurrentScene goTo={this.goTo} />
      </Animator>
    );
  }
}
