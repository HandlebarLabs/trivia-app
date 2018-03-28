import React from "react";
import createReactContext from "create-react-context";
import { AsyncStorage } from "react-native";

import {
  registerForPushNotifications,
  pushNotificationsEnabled
} from "./pushNotifications";
import { ENDPOINT } from "./api";

const defaultState = {
  ready: false,
  onboardingComplete: false,
  username: null,
  userId: null,
  totalAnswered: 0,
  correctAnswered: 0,
  pushEnabled: false
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
    const { userId } = this.state;
    this.setState({ ...defaultState, ready: true });
    return fetch(`${ENDPOINT}/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        userId
      }
    }).catch(err => console.log("err", err));
  };

  completeOnboarding = () => this.setState({ onboardingComplete: true });

  setUsername = (username = null) => {
    this.setState({ username });
    return fetch(`${ENDPOINT}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username
      })
    })
      .then(res => res.json())
      .then(({ data }) => {
        this.setState({ userId: data._id });
      })
      .catch(err => console.log("err", err));
  };

  enablePushNotifications = () => {
    return registerForPushNotifications().then(token => {
      if (token) {
        this.setState({ pushEnabled: true });
        return fetch(`${ENDPOINT}/user/add-push-token`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            userId: this.state.userId
          },
          body: JSON.stringify({
            pushToken: token
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
