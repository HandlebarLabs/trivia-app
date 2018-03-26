import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Container from "../components/Container";
import Card from "../components/Card";
import { TitleText, StandardText } from "../components/Text";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import TextInput from "../components/TextInput";

import * as UserData from "../util/UserData";

class EnablePush extends React.Component {
  handleEnable = () => {
    this.props.enablePushNotifications().then(() => {
      this.props.completeOnboarding();
      this.props.goTo("Question");
    });
  };

  handleDismiss = () => {
    this.props.completeOnboarding();
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

export default props => (
  <UserData.Consumer>
    {({ completeOnboarding, enablePushNotifications }) => (
      <EnablePush
        {...props}
        completeOnboarding={completeOnboarding}
        enablePushNotifications={enablePushNotifications}
      />
    )}
  </UserData.Consumer>
);
