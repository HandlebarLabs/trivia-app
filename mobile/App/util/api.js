import { AsyncStorage } from "react-native";
import moment from "moment";

const USERNAME = "username";
const TOTAL_ANSWERED = "totalAnswered";
const CORRECT_ANSWERED = "correctAnswered";

// TODO: Make this the public url
const ENDPOINT = "http://localhost:3000";

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

const answerQuestion = (question, answer) => {
  incrementAnswered(answer.correct);

  return fetch(`${ENDPOINT}/answer-question/${question._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      answer
    })
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
  return fetch(`${ENDPOINT}/next-questions`).then(res => res.json());
};

export default {
  setUsername,
  getUsername,
  incrementAnswered,
  getUserStats,
  getQuestions,
  answerQuestion
};
