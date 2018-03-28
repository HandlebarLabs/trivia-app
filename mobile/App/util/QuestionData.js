import React from "react";
import createReactContext from "create-react-context";

import { ENDPOINT } from "./api";

const defaultState = {
  ready: false,
  questions: [],
  nextQuestionTime: null
};

const QuestionContext = createReactContext(defaultState);

export const Consumer = QuestionContext.Consumer;

export class Provider extends React.Component {
  state = defaultState;

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    return fetch(`${ENDPOINT}/questions/next`)
      .then(res => res.json())
      .then(({ data }) => {
        this.setState({
          ready: true,
          questions: data.questions,
          nextQuestionTime: data.nextQuestionTime
        });
      })
      .catch(err => this.setState({ ready: true }));
  };

  answerQuestion = (question, answer) => {
    return fetch(`${ENDPOINT}/questions/answer/${question._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        answer
      })
    });
  };

  render() {
    return (
      <QuestionContext.Provider
        value={{
          ...this.state,
          answerQuestion: this.answerQuestion
        }}
      >
        {this.props.children}
      </QuestionContext.Provider>
    );
  }
}
