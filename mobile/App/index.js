import React from "react";
import { ActivityIndicator, View } from "react-native";

import EnablePush from "./screens/EnablePush";
import Question from "./screens/Question";
import Waiting from "./screens/Waiting";
import Welcome from "./screens/Welcome";

import Navigator from "./components/Navigator";
import Container from "./components/Container";

import * as UserData from "./util/UserData";
import * as QuestionData from "./util/QuestionData";
import { loadFonts } from "./util/fonts";
import { setBadgeNumber, addPushNotificationListener } from "./util/pushNotifications";

class App extends React.Component {
  state = {
    fontsReady: false,
  };

  componentDidMount() {
    loadFonts().then(() => this.setState({ fontsReady: true }));
    setBadgeNumber(0);

    this.notificationSubscription = addPushNotificationListener(this.handlePushNotification);
  }

  componentWillUnmount() {
    this.notificationSubscription.remove();
  }

  handlePushNotification = ({ data, origin }) => {
    if (origin === "selected") {
      // User opened app via push
      this.props.question.setQuestions(
        {
          data: {
            questions: data.questions,
            nextQuestionTime: data.nextQuestionTime,
          },
        },
        true,
      );
    } else if (origin === "received") {
      // App was open when notification was received
    }
  };

  render() {
    if (!this.props.user.ready || !this.props.question.ready || !this.state.fontsReady) {
      return (
        <Container padding>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </Container>
      );
    }

    const initialSceneName = this.props.user.onboardingComplete ? "Question" : "Welcome";
    return (
      <Container padding>
        <Navigator
          initialSceneName={initialSceneName}
          scenes={{
            Welcome: { component: Welcome },
            EnablePush: { component: EnablePush },
            Question: { component: Question },
            Waiting: { component: Waiting },
          }}
        />
      </Container>
    );
  }
}

export default () => (
  <UserData.Provider>
    <QuestionData.Provider>
      <QuestionData.Consumer>
        {question => (
          <UserData.Consumer>{user => <App question={question} user={user} />}</UserData.Consumer>
        )}
      </QuestionData.Consumer>
    </QuestionData.Provider>
  </UserData.Provider>
);
