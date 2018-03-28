import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Container from "../components/Container";
import Card from "../components/Card";
import { QuestionText } from "../components/Text";
import { PrimaryButton, ButtonPlaceholder } from "../components/Button";
import QuestionRow from "../components/QuestionRow";
import AnswerRow from "../components/AnswerRow";

import * as UserData from "../util/UserData";
import * as QuestionData from "../util/QuestionData";

const defaultState = {
  answered: false,
  wasCorrect: null,
  userAnswer: {}
};

class Question extends React.Component {
  static defaultProps = {
    questionIndex: 0
  };

  state = defaultState;

  componentDidMount() {
    if (this.props.questions.length === 0) {
      this.props.goTo("Waiting");
    }
  }

  handleAnswer = (question, answer) => {
    this.setState({
      answered: true,
      wasCorrect: answer.correct,
      userAnswer: answer
    });

    this.props.updateUserStats(question, answer);
    this.props.answerQuestion(question, answer);
  };

  handleNext = () => {
    this.setState(defaultState, () => {
      if (this.props.questionIndex < this.props.questions.length - 1) {
        this.props.goTo("Question", {
          questionIndex: this.props.questionIndex + 1
        });
      } else {
        this.props.goTo("Waiting", {
          nextQuestionTime: this.state.nextQuestionTime
        });
      }
    });
  };

  renderResults = ({ answers, totalResponses }) => (
    <View>
      {answers.map(answer => {
        const wasUserAnswer = answer.answer === this.state.userAnswer.answer;
        return (
          <AnswerRow
            key={answer.answer}
            answer={answer.answer}
            answerResponses={
              wasUserAnswer ? answer.answerCount + 1 : answer.answerCount
            }
            totalResponses={totalResponses + 1}
            wasUserAnswer={wasUserAnswer}
            wasCorrect={this.state.wasCorrect}
          />
        );
      })}
    </View>
  );

  renderQuestions = question => (
    <View>
      {question.answers.map(answer => (
        <QuestionRow
          key={answer.answer}
          answer={answer.answer}
          onPress={() => this.handleAnswer(question, answer)}
        />
      ))}
    </View>
  );

  render() {
    if (this.props.questions.length === 0) {
      return null;
    }

    const currentQuestion = this.props.questions[this.props.questionIndex];
    return (
      <Container>
        <Card>
          <QuestionText>{currentQuestion.question}</QuestionText>
          {this.state.answered
            ? this.renderResults(currentQuestion)
            : this.renderQuestions(currentQuestion)}
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

export default props => (
  <UserData.Consumer>
    {user => (
      <QuestionData.Consumer>
        {question => (
          <Question
            {...props}
            questions={question.questions}
            answerQuestion={question.answerQuestion}
            updateUserStats={user.answerQuestion}
          />
        )}
      </QuestionData.Consumer>
    )}
  </UserData.Consumer>
);
