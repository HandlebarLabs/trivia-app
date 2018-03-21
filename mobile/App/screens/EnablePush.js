import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Container from "../components/Container";
import Card from "../components/Card";
import { TitleText, StandardText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import TextInput from "../components/TextInput";

export default class App extends React.Component {
  handleEnable = () => {
    this.props.goTo("Question");
  };

  handleDismiss = () => {
    this.props.goTo("Question");
  };

  render() {
    return (
      <Container>
        <Card>
          <TitleText>Get Notified</TitleText>
          <StandardText>
            We use push notifications so we can remind you when new trivia
            questions are available!
          </StandardText>
        </Card>
        <PrimaryButton onPress={this.handleEnable}>Enable</PrimaryButton>
        <SecondaryButton onPress={this.handleDismiss}>Dismiss</SecondaryButton>
      </Container>
    );
  }
}
