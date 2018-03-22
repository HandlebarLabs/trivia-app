const schedule = require("node-schedule");
const Question = require("../models/Question");
const pushNotification = require("./pushNotification");

const createNewQuestionJob = () => {
  // Run at the top of every hour
  const scheduleRule = "0 * * * *";
  return schedule.scheduleJob(scheduleRule, () =>
    Question.setNewQuestion().then(() =>
      pushNotification.sendNewQuestionToAllUsers()
    )
  );
};

module.exports = {
  createNewQuestionJob
};
