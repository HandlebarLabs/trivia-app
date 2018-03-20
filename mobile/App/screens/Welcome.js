import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Container from "../components/Container";
import Card from "../components/Card";
import { TitleText, StandardText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import TextInput from "../components/TextInput";

export default class App extends React.Component {
  handleNext = () => {
    alert("enable pressed");
  };

  render() {
    return (
      <Container>
        <Card>
          <TitleText>Trivia!</TitleText>
          <StandardText>Get a new trivia question twice a day</StandardText>
        </Card>
        <PrimaryButton onPress={this.handleNext}>Get Started</PrimaryButton>
      </Container>
    );
  }
}
