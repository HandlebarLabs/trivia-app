import React from "react";
import { ActivityIndicator } from "react-native";

import EnablePush from "./screens/EnablePush";
import Question from "./screens/Question";
import Waiting from "./screens/Waiting";
import Welcome from "./screens/Welcome";

import Navigator from "./components/Navigator";
import Container from "./components/Container";

import * as UserData from "./util/UserData";
import * as QuestionData from "./util/QuestionData";
import { loadFonts } from "./util/fonts";

class App extends React.Component {
  state = {
    fontsReady: false
  };

  componentDidMount() {
    loadFonts().then(() => this.setState({ fontsReady: true }));
  }
  render() {
    return (
      <Container>
        <QuestionData.Consumer>
          {question => (
            <UserData.Consumer>
              {user => {
                if (!user.ready || !question.ready || !this.state.fontsReady) {
                  return <ActivityIndicator size="large" color="#fff" />;
                }

                // const initialSceneName = user.onboardingComplete
                // ? "Question"
                // : "Welcome";
                const initialSceneName = "Question";
                return (
                  <Navigator
                    initialSceneName={initialSceneName}
                    scenes={{
                      Welcome: { component: Welcome },
                      EnablePush: { component: EnablePush },
                      Question: { component: Question },
                      Waiting: { component: Waiting }
                    }}
                  />
                );
              }}
            </UserData.Consumer>
          )}
        </QuestionData.Consumer>
      </Container>
    );
  }
}

export default () => (
  <UserData.Provider>
    <QuestionData.Provider>
      <App />
    </QuestionData.Provider>
  </UserData.Provider>
);
