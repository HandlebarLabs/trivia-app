import React from "react";

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
    questionAvailable: false
  };

  render() {
    return (
      <Container>
        <Navigator
          initialSceneName="Welcome"
          scenes={{
            Welcome: { component: Welcome },
            Account: { component: Account },
            EnablePush: { component: EnablePush },
            Question: { component: Question },
            Waiting: { component: Waiting }
          }}
        />
      </Container>
    );
  }
}
