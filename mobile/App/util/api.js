import { AsyncStorage } from "react-native";
import moment from "moment";

const USERNAME = "username";
const TOTAL_ANSWERED = "totalAnswered";
const CORRECT_ANSWERED = "correctAnswered";

const setUsername = username => {
  if (!username || username.length === 0) {
    return AsyncStorage.multiRemove([
      USERNAME,
      TOTAL_ANSWERED,
      CORRECT_ANSWERED
    ]);
  }

  return AsyncStorage.multiSet([
    [USERNAME, username],
    [TOTAL_ANSWERED, "0"],
    [CORRECT_ANSWERED, "0"]
  ]);
};

const getUsername = () => {
  return AsyncStorage.getItem(USERNAME);
};

const incrementAnswered = wasCorrect => {
  return getUserStats().then(stats => {
    const updates = [[TOTAL_ANSWERED, (stats.total + 1).toString()]];
    if (wasCorrect) {
      updates.push([CORRECT_ANSWERED, (stats.correct + 1).toString()]);
    }
    return AsyncStorage.multiSet(updates);
  });
};

const getUserStats = () => {
  return AsyncStorage.multiGet([TOTAL_ANSWERED, CORRECT_ANSWERED]).then(
    ([total, correct]) => {
      return {
        total: parseInt(total[1]) || 0,
        correct: parseInt(correct[1]) || 0
      };
    }
  );
};

export const getQuestions = () => {
  return Promise.resolve({
    nextQuestionTime: moment().add(20, "minutes"),
    questions: [
      {
        _id: 1,
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
      }
    ]
  });
};

export default {
  setUsername,
  getUsername,
  incrementAnswered,
  getUserStats,
  getQuestions
};
