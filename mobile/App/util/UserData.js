import React from "react";
import createReactContext from "create-react-context";
import { AsyncStorage, Platform } from "react-native";

import {
  registerForPushNotifications,
  pushNotificationsEnabled
} from "./pushNotifications";
import { ENDPOINT } from "./api";

const defaultState = {
  ready: false,
  onboardingComplete: false,
  username: null,
  totalAnswered: 0,
  correctAnswered: 0,
  pushEnabled: false,
  answers: {}
};

const UserContext = createReactContext(defaultState);

export const Consumer = UserContext.Consumer;

export class Provider extends React.Component {
  state = defaultState;

  componentDidMount() {
    Promise.all([AsyncStorage.getItem("userData"), pushNotificationsEnabled()])
      .then(([state, pushEnabled]) => {
        this.setState({
          ...JSON.parse(state),
          pushEnabled,
          ready: true
        });
      })
      .catch(err => {
        alert("An error occurred loading your user data.");
        console.log("user data loading error", err);
      });
  }

  componentDidUpdate() {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...this.state, ready: false })
    );
  }

  logout = () => {
    this.setState({ ...defaultState, ready: true });
  };

  completeOnboarding = () => this.setState({ onboardingComplete: true });

  setUsername = (username = null) => {
    this.setState({ username });
  };

  enablePushNotifications = () => {
    return registerForPushNotifications().then(token => {
      if (token) {
        this.setState({ pushEnabled: true });
        return fetch(`${ENDPOINT}/push/add-token`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            pushToken: token,
            platform: Platform.OS
          })
        });
      }

      this.setState({ pushEnabled: false });
      return;
    });
  };

  answerQuestion = (question, answer) => {
    this.setState(state => {
      return {
        answers: {
          ...state.answers,
          [question._id]: { wasCorrect: answer.correct, answer: answer.answer }
        },
        totalAnswered: state.totalAnswered + 1,
        correctAnswered: answer.correct
          ? state.correctAnswered + 1
          : state.correctAnswered
      };
    });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logout: this.logout,
          completeOnboarding: this.completeOnboarding,
          setUsername: this.setUsername,
          enablePushNotifications: this.enablePushNotifications,
          answerQuestion: this.answerQuestion
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
