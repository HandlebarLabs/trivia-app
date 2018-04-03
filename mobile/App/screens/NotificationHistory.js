import React from "react";
import { View, TouchableOpacity } from "react-native";

import Container from "../components/Container";
import Card from "../components/Card";
import { H2, P } from "../components/Text";
import HistoryRow from "../components/HistoryRow";

import * as QuestionData from "../util/QuestionData";

class NotificationHistory extends React.Component {
  componentDidMount() {
    // TODO: This should be the history of notifications, not asked questions
    this.props.question.getAskedQuestions();
  }

  render() {
    return (
      <Container>
        <Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <H2>Notification History</H2>
            <TouchableOpacity onPress={() => this.props.goBackTo("Waiting", {}, "vertical")}>
              <P>❌</P>
            </TouchableOpacity>
          </View>
          {this.props.question.askedQuestions.length === 0 && <P>No history at this time...</P>}
          {this.props.question.askedQuestions.map((question, index) => (
            <HistoryRow key={question._id} index={index} {...question} />
          ))}
        </Card>
      </Container>
    );
  }
}

export default props => (
  <QuestionData.Consumer>
    {question => <NotificationHistory question={question} {...props} />}
  </QuestionData.Consumer>
);
