import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";

import Container from "../components/Container";
import Card from "../components/Card";
import { TitleText, StandardText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import Stats from "../components/Stats";

import * as UserData from "../util/UserData";

class Waiting extends React.Component {
  handleLogout = () => {
    this.props.logout();
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
          <StandardText center>{this.props.username}</StandardText>
          <Stats
            correct={this.props.correctAnswered}
            total={this.props.totalAnswered}
          />
        </Card>
        {!this.props.pushEnabled && (
          <PrimaryButton onPress={this.handleNext}>
            Enable Notifications
          </PrimaryButton>
        )}
        <SecondaryButton onPress={this.handleLogout}>Logout</SecondaryButton>
      </Container>
    );
  }
}

export default props => (
  <UserData.Consumer>
    {({ logout, totalAnswered, correctAnswered, username, pushEnabled }) => (
      <Waiting
        {...props}
        logout={logout}
        totalAnswered={totalAnswered}
        correctAnswered={correctAnswered}
        username={username}
        pushEnabled={pushEnabled}
      />
    )}
  </UserData.Consumer>
);
