import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";

import Container from "../components/Container";
import Card from "../components/Card";
import { TitleText, StandardText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import Stats from "../components/Stats";

export default class App extends React.Component {
  // TODO: Temporary
  static defaultProps = {
    nextQuestionTime: moment().add(20, "minutes"),
    username: "spencercarli",
    correctAnswers: 7,
    questionsAnswered: 10
  };

  state = {
    pushEnabled: true
  };

  render() {
    return (
      <Container>
        <Card>
          <TitleText>
            Next question in {moment(this.props.nextQuestionTime).toNow(true)}
          </TitleText>
          <StandardText center>{this.props.username}</StandardText>
          <Stats
            correct={this.props.correctAnswers}
            total={this.props.questionsAnswered}
          />
        </Card>
        {!this.state.pushEnabled && (
          <PrimaryButton onPress={this.handleNext}>
            Enable Notifications
          </PrimaryButton>
        )}
      </Container>
    );
  }
}
