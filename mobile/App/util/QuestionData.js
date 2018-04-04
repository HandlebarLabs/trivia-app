import React from "react";

import { ENDPOINT } from "./api";

const defaultState = {
  ready: false,
  questions: [],
  nextQuestionTime: null,
  askedQuestions: [],
};

const QuestionContext = React.createContext(defaultState);

export const Consumer = QuestionContext.Consumer;

export class Provider extends React.Component {
  state = defaultState;

  componentDidMount() {
    this.getQuestions();
  }

  setQuestions = ({ data }, priority = false) =>
    new Promise((resolve) => {
      if (priority || this.state.questions.length === 0) {
        this.setState(
          {
            ready: true,
            questions: data.questions,
            nextQuestionTime: data.nextQuestionTime,
          },
          () => resolve(),
        );
      } else {
        resolve();
      }
    });

  getQuestions = () =>
    fetch(`${ENDPOINT}/questions/next`)
      .then(res => res.json())
      .then(this.setQuestions)
      .catch(() => this.setState({ ready: true }));

  getAskedQuestions = () =>
    fetch(`${ENDPOINT}/questions/asked`)
      .then(res => res.json())
      .then(({ data }) => {
        this.setState({
          askedQuestions: data.questions,
        });
      })
      .catch(() => this.setState({ ready: true }));

  answerQuestion = (question, answer) =>
    fetch(`${ENDPOINT}/questions/answer/${question._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer,
      }),
    });

  render() {
    return (
      <QuestionContext.Provider
        value={{
          ...this.state,
          answerQuestion: this.answerQuestion,
          setQuestions: this.setQuestions,
          getAskedQuestions: this.getAskedQuestions,
        }}
      >
        {this.props.children}
      </QuestionContext.Provider>
    );
  }
}
