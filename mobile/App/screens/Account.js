import React from "react";

import Container from "../components/Container";
import Card from "../components/Card";
import { TitleText, StandardText } from "../components/Text";
import { PrimaryButton } from "../components/Button";
import TextInput from "../components/TextInput";

import * as UserData from "../util/UserData";

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.username
    };
  }

  handleJoin = () => {
    if (this.state.username && this.state.username.length > 0) {
      this.props.setUsername(this.state.username);
      this.props.goTo("EnablePush");
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
            defaultValue={this.state.username}
          />
        </Card>
        <PrimaryButton onPress={this.handleJoin}>Join</PrimaryButton>
      </Container>
    );
  }
}

export default props => (
  <UserData.Consumer>
    {({ username, setUsername }) => (
      <Account {...props} username={username} setUsername={setUsername} />
    )}
  </UserData.Consumer>
);
