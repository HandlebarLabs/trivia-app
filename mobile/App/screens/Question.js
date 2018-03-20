import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Container from "../components/Container";
import Card from "../components/Card";
import { QuestionText } from "../components/Text";
import { PrimaryButton, ButtonPlaceholder } from "../components/Button";
import QuestionRow from "../components/QuestionRow";
import AnswerRow from "../components/AnswerRow";

export default class App extends React.Component {
  // TODO: Only temporary
  static defaultProps = {
    question:
      "Which christian missionary is said to have banished all the snakes from Ireland?",
    totalResponses: 20,
    answers: [
      {
        answer: "Patrick Star",
        answerCount: 10,
        correct: false
      },
      {
        answer: "Saint Patrick",
        answerCount: 7,
        correct: true
      },
      {
        answer: "Neil Patrick Harris",
        answerCount: 3,
        correct: false
      }
    ]
  };

  state = {
    answered: false,
    wasCorrect: null,
    userAnswer: {}
  };

  handleAnswer = answer => {
    this.setState({
      answered: true,
      wasCorrect: answer.correct,
      userAnswer: answer
    });
  };

  handleNext = () => {
    alert("next pressed");
  };

  renderResults = () => (
    <View>
      {this.props.answers.map(answer => {
        const wasUserAnswer = answer.answer === this.state.userAnswer.answer;
        return (
          <AnswerRow
            key={answer.answer}
            answer={answer.answer}
            answerResponses={
              wasUserAnswer ? answer.answerCount + 1 : answer.answerCount
            }
            totalResponses={this.props.totalResponses + 1}
            wasUserAnswer={wasUserAnswer}
            wasCorrect={this.state.wasCorrect}
          />
        );
      })}
    </View>
  );

  renderQuestions = () => (
    <View>
      {this.props.answers.map(answer => (
        <QuestionRow
          key={answer.answer}
          answer={answer.answer}
          onPress={() => this.handleAnswer(answer)}
        />
      ))}
    </View>
  );

  render() {
    return (
      <Container>
        <Card>
          <QuestionText>
            Which christian missionary is said to have banished all the snakes
            from Ireland?
          </QuestionText>
          {this.state.answered ? this.renderResults() : this.renderQuestions()}
        </Card>
        {this.state.answered ? (
          <PrimaryButton onPress={this.handleNext}>Next</PrimaryButton>
        ) : (
          <ButtonPlaceholder />
        )}
      </Container>
    );
  }
}
