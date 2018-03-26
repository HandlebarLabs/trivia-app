import React from "react";
import { ActivityIndicator } from "react-native";

import Account from "./screens/Account";
import EnablePush from "./screens/EnablePush";
import Question from "./screens/Question";
import Waiting from "./screens/Waiting";
import Welcome from "./screens/Welcome";

import Navigator from "./components/Navigator";
import Container from "./components/Container";

import * as UserData from "./util/UserData";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <UserData.Provider>
          <UserData.Consumer>
            {({ onboardingComplete, ready }) => {
              if (!ready) {
                return <ActivityIndicator size="large" color="#fff" />;
              }

              const initialSceneName = onboardingComplete
                ? "Question"
                : "Welcome";
              return (
                <Navigator
                  initialSceneName={initialSceneName}
                  scenes={{
                    Welcome: { component: Welcome },
                    Account: { component: Account },
                    EnablePush: { component: EnablePush },
                    Question: { component: Question },
                    Waiting: { component: Waiting }
                  }}
                />
              );
            }}
          </UserData.Consumer>
        </UserData.Provider>
      </Container>
    );
  }
}
