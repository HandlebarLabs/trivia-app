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

class Question extends React.Component {
  static defaultProps = {
    questionIndex: 0
  };

  componentDidMount() {
    if (this.props.questions.length === 0) {
      this.props.goTo("Waiting");
    }
  }

  handleAnswer = (question, answer) => {
    this.props.updateUserStats(question, answer);
    this.props.answerQuestion(question, answer);
  };

  handleNext = () => {
    if (this.props.questionIndex < this.props.questions.length - 1) {
      this.props.goTo("Question", {
        questionIndex: this.props.questionIndex + 1
      });
    } else {
      this.props.goTo("Waiting", {
        nextQuestionTime: this.props.nextQuestionTime
      });
    }
  };

  renderResults = ({ answers, totalResponses }, userAnswer) => (
    <View>
      {answers.map(answer => {
        const wasUserAnswer = answer.answer === userAnswer.answer;
        return (
          <AnswerRow
            key={answer.answer}
            answer={answer.answer}
            answerResponses={
              wasUserAnswer ? answer.answerCount + 1 : answer.answerCount
            }
            totalResponses={totalResponses + 1}
            wasUserAnswer={wasUserAnswer}
            wasCorrect={userAnswer.wasCorrect}
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
    const userAnswer = this.props.userAnswers[currentQuestion._id];
    return (
      <Container>
        <Card>
          <QuestionText>{currentQuestion.question}</QuestionText>
          {userAnswer
            ? this.renderResults(currentQuestion, userAnswer)
            : this.renderQuestions(currentQuestion)}
        </Card>
        {userAnswer ? (
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
            nextQuestionTime={question.nextQuestionTime}
            updateUserStats={user.answerQuestion}
            userAnswers={user.answers}
          />
        )}
      </QuestionData.Consumer>
    )}
  </UserData.Consumer>
);
