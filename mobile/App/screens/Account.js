import React from "react";

import Container from "../components/Container";
import Card from "../components/Card";
import { TitleText, StandardText } from "../components/Text";
import { PrimaryButton } from "../components/Button";
import TextInput from "../components/TextInput";

import API from "../util/api";

export default class App extends React.Component {
  state = {
    username: ""
  };

  handleJoin = () => {
    if (this.state.username.length > 0) {
      API.setUsername(this.state.username).then(() =>
        this.props.goTo("EnablePush")
      );
    } else {
      alert("Username is required.");
    }
  };

  render() {
    return (
      <Container>
        <Card>
          <TitleText>Join Trivia</TitleText>
          <StandardText>Choose a username to start playing!</StandardText>
          <TextInput
            placeholder="username"
            autoCapitalize="none"
            onChangeText={username => this.setState({ username })}
            returnKeyType="next"
            onSubmitEditing={this.handleJoin}
          />
        </Card>
        <PrimaryButton onPress={this.handleJoin}>Join</PrimaryButton>
      </Container>
    );
  }
}
