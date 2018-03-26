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
import * as QuestionData from "./util/QuestionData";

const App = () => (
  <Container>
    <QuestionData.Consumer>
      {question => (
        <UserData.Consumer>
          {user => {
            if (!user.ready || !question.ready) {
              return <ActivityIndicator size="large" color="#fff" />;
            }

            const initialSceneName = user.onboardingComplete
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
      )}
    </QuestionData.Consumer>
  </Container>
);

export default () => (
  <UserData.Provider>
    <QuestionData.Provider>
      <App />
    </QuestionData.Provider>
  </UserData.Provider>
);
