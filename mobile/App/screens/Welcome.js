import React from "react";
import { View } from "react-native";

import Container from "../components/Container";
import Card from "../components/Card";
import { H1, P } from "../components/Text";
import { PrimaryButton } from "../components/Button";
import TextInput from "../components/TextInput";

import * as UserData from "../util/UserData";

class Welcome extends React.Component {
  state = {
    username: ""
  };

  handleNext = () => {
    if (this.state.username.length > 0) {
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
          <H1>Trivia!</H1>
          <P>Free, twice-daily challenges of random knowledge</P>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TextInput
              placeholder="Choose a username..."
              autoCapitalize="none"
              onChangeText={username => this.setState({ username })}
              returnKeyType="next"
              onSubmitEditing={this.handleJoin}
            />
          </View>
        </Card>
        <PrimaryButton onPress={this.handleNext}>Join!</PrimaryButton>
      </Container>
    );
  }
}

export default props => (
  <UserData.Consumer>
    {({ setUsername }) => <Welcome {...props} setUsername={setUsername} />}
  </UserData.Consumer>
);
