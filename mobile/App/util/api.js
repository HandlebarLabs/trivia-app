import { AsyncStorage } from "react-native";

const USERNAME = "username";
const TOTAL_ANSWERED = "totalAnswered";
const CORRECT_ANSWERED = "correctAnswered";

const setUsername = username => {
  if (!username || username.length === 0) {
    return AsyncStorage.removeItem(USERNAME, TOTAL_ANSWERED, CORRECT_ANSWERED);
  }

  return AsyncStorage.multiSet([
    [USERNAME, username],
    [TOTAL_ANSWERED, 0],
    [CORRECT_ANSWERED, 0]
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

export default {
  setUsername,
  getUsername,
  incrementAnswered,
  getUserStats
};
