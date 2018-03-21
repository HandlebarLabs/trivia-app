import React from "react";
import { ActivityIndicator } from "react-native";

import Account from "./screens/Account";
import EnablePush from "./screens/EnablePush";
import Question from "./screens/Question";
import Waiting from "./screens/Waiting";
import Welcome from "./screens/Welcome";

import Navigator from "./components/Navigator";
import Container from "./components/Container";

import API from "./util/api";

export default class App extends React.Component {
  state = {
    appReady: false,
    completedOnboarding: false,
    nextQuestionTime: null,
    questions: []
  };

  componentDidMount() {
    API.getUsername().then(username => {
      const updatedState = { appReady: true };
      if (username && username.length) {
        updatedState.completedOnboarding = true;
      }

      this.setState(updatedState);
    });

    API.getQuestions().then(data => {
      this.setState({
        questions: data.questions,
        nextQuestionTime: data.nextQuestionTime
      });
    });
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
                component: Question,
                props: {
                  questions: this.state.questions,
                  activeQuestionIndex: 0
                }
              },
              Waiting: {
                component: Waiting,
                props: { nextQuestionTime: this.state.nextQuestionTime }
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
