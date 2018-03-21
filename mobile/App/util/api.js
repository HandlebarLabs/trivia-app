import { AsyncStorage } from "react-native";

const setUsername = username => {
  if (!username || username.length === 0) {
    return AsyncStorage.removeItem("username");
  }
  return AsyncStorage.setItem("username", username);
};
const getUsername = () => {
  return AsyncStorage.getItem("username");
};

export default {
  setUsername,
  getUsername
};
