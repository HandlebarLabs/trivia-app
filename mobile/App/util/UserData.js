import React from "react";
import createReactContext from "create-react-context";
import { AsyncStorage } from "react-native";

const defaultState = {
  ready: false,
  onboardingComplete: false,
  username: null,
  totalAnswered: 0,
  correctAnswered: 0,
  pushEnabled: false
};

const UserContext = createReactContext(defaultState);

export const Consumer = UserContext.Consumer;

export class Provider extends React.Component {
  state = defaultState;

  componentDidMount() {
    AsyncStorage.getItem("userData")
      .then(state => {
        this.setState({
          ...JSON.parse(state),
          ready: true
        });
      })
      .catch(err => {
        alert("An error occurred loading your user data.");
        console.log("user data loading error", err);
      });
  }

  componentDidUpdate() {
    AsyncStorage.setItem("userData", JSON.stringify(this.state));
  }

  logout = () => {
    this.setState({ ...defaultState, ready: true });
  };

  completeOnboarding = () => this.setState({ onboardingComplete: true });

  setUsername = (username = null) => this.setState({ username });

  enablePushNotifications = () => {
    // TODO: Actually do this
    this.setState({ pushEnabled: true });
    return Promise.resolve();
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logout: this.logout,
          completeOnboarding: this.completeOnboarding,
          setUsername: this.setUsername,
          enablePushNotifications: this.enablePushNotifications
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
