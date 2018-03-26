import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";

import Container from "../components/Container";
import Card from "../components/Card";
import { TitleText, StandardText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import Stats from "../components/Stats";

export default class App extends React.Component {
  state = {
    pushEnabled: true, // TODO: Fix
    correctAnswers: "...",
    questionsAnswered: "...",
    username: "..."
  };

  handleLogout = () => {
    alert("TODO: Set username");
    this.props.goTo("Welcome");
  };

  render() {
    return (
      <Container>
        <Card>
          <TitleText>
            Next question in{" "}
            {moment(new Date(this.props.nextQuestionTime)).toNow(true)}
          </TitleText>
          <StandardText center>{this.state.username}</StandardText>
          <Stats
            correct={this.state.correctAnswers}
            total={this.state.questionsAnswered}
          />
        </Card>
        {!this.state.pushEnabled && (
          <PrimaryButton onPress={this.handleNext}>
            Enable Notifications
          </PrimaryButton>
        )}
        <SecondaryButton onPress={this.handleLogout}>Logout</SecondaryButton>
      </Container>
    );
  }
}
