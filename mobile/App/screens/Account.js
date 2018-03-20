import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Container from "../components/Container";
import Card from "../components/Card";
import { TitleText, StandardText } from "../components/Text";
import { PrimaryButton } from "../components/Button";
import TextInput from "../components/TextInput";

export default class App extends React.Component {
  handleJoin = () => {
    alert("join pressed");
  };

  render() {
    return (
      <Container>
        <Card>
          <TitleText>Join Trivia</TitleText>
          <StandardText>Choose a username to start playing!</StandardText>
          <TextInput placeholder="username" />
        </Card>
        <PrimaryButton onPress={this.handleJoin}>Join</PrimaryButton>
      </Container>
    );
  }
}
