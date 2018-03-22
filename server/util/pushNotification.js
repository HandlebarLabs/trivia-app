const User = require("../models/User");

const sendNewQuestionToAllUsers = question => {
  return User.getAllWithNotifications().forEach(user => {
    // Send the notifications https://github.com/expo/exponent-server-sdk-node
  });
};

module.exports = {
  sendNewQuestionToAllUsers
};
