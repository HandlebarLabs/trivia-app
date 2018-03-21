import React from "react";

import Account from "./screens/Account";
import EnablePush from "./screens/EnablePush";
import Question from "./screens/Question";
import Waiting from "./screens/Waiting";
import Welcome from "./screens/Welcome";

export default class App extends React.Component {
  state = {
    appReady: false,
    completedOnboarding: false,
    questionAvailable: false
  };

  render() {
    return <Question />;
  }
}
