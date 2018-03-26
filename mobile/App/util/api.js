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

export default {
  getQuestions,
  answerQuestion
};
