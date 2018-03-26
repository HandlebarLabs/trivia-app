import React from "react";
import { ActivityIndicator } from "react-native";

import Account from "./screens/Account";
import EnablePush from "./screens/EnablePush";
import Question from "./screens/Question";
import Waiting from "./screens/Waiting";
import Welcome from "./screens/Welcome";

import Navigator from "./components/Navigator";
import Container from "./components/Container";

export default class App extends React.Component {
  state = {
    appReady: false,
    completedOnboarding: false,
    nextQuestionTime: null,
    questions: []
  };

  componentDidMount() {
    this.setState({ appReady: true });
  }

  render() {
    const initialSceneName = this.state.completedOnboarding
      ? "Question"
      : "Welcome";

    return (
      <Container>
        {this.state.appReady ? (
          <Navigator
            initialSceneName={initialSceneName}
            scenes={{
              Welcome: { component: Welcome },
              Account: { component: Account },
              EnablePush: { component: EnablePush },
              Question: {
                component: Question
              },
              Waiting: {
                component: Waiting
              }
            }}
          />
        ) : (
          <ActivityIndicator size="large" color="#fff" />
        )}
      </Container>
    );
  }
}
