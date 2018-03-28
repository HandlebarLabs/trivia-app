import React from "react";
import { View } from "react-native";

import Container from "../components/Container";
import Card from "../components/Card";
import { H2 } from "../components/Text";
import { PrimaryButton } from "../components/Button";
import QuestionRow from "../components/QuestionRow";

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

  renderQuestions = (question, userAnswer = {}) => (
    <View>
      {question.answers.map((answer, index) => {
        let wasUserAnswer = false;
        let answered = false;
        if (Object.keys(userAnswer).length > 0) {
          answered = true;
          wasUserAnswer = answer.answer === userAnswer.answer;
        }

        return (
          <QuestionRow
            key={answer.answer}
            index={index}
            answer={answer.answer}
            answered={answered}
            onPress={() => this.handleAnswer(question, answer)}
            wasUserAnswer={wasUserAnswer}
            isCorrectAnswer={answer.correct}
            answerResponses={
              wasUserAnswer ? answer.answerCount + 1 : answer.answerCount
            }
            totalResponses={question.totalResponses + 1}
          />
        );
      })}
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
          <H2>{currentQuestion.question}</H2>
          {this.renderQuestions(currentQuestion, userAnswer)}
        </Card>
        {userAnswer && (
          <PrimaryButton onPress={this.handleNext} align="right">
            Continue
          </PrimaryButton>
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
