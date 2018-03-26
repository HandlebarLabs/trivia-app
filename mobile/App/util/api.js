import { AsyncStorage } from "react-native";
import moment from "moment";

const TOTAL_ANSWERED = "totalAnswered";
const CORRECT_ANSWERED = "correctAnswered";
const LAST_ANSWERED_QUESTION = "lastAnsweredQuestion";

// TODO: Make this the public url
const ENDPOINT = "http://localhost:3000";

const incrementAnswered = wasCorrect => {
  // return getUserStats().then(stats => {
  //   const updates = [[TOTAL_ANSWERED, (stats.total + 1).toString()]];
  //   if (wasCorrect) {
  //     updates.push([CORRECT_ANSWERED, (stats.correct + 1).toString()]);
  //   }
  //   return AsyncStorage.multiSet(updates);
  // });
  return Promise.resolve();
};

const setLastAnsweredQuestion = questionId => {
  // return AsyncStorage.setItem(LAST_ANSWERED_QUESTION, questionId.toString());
  return Promise.resolve();
};

const answerQuestion = (question, answer) => {
  // incrementAnswered(answer.correct);
  // setLastAnsweredQuestion(question._id);

  // return fetch(`${ENDPOINT}/questions/answer/${question._id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     answer
  //   })
  // });
  return Promise.resolve();
};

export const getQuestions = () => {
  // return fetch(`${ENDPOINT}/questions/next`)
  //   .then(res => res.json())
  //   .then(data => {
  //     return Promise.all([AsyncStorage.getItem(LAST_ANSWERED_QUESTION), data]);
  //   })
  //   .then(([lastQuestionAnsweredId, data]) => {
  //     if (data.questions && data.questions[0]._id == lastQuestionAnsweredId) {
  //       return {
  //         ...data,
  //         questions: []
  //       };
  //     } else {
  //       return data;
  //     }
  //   });
  return Promise.resolve({
    questions: [],
    nextQuestionTime: "2018-03-22T23:00:00.000Z"
  });
};

export default {
  getQuestions,
  answerQuestion
};
