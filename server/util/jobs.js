const schedule = require("node-schedule");
const Question = require("../models/Question");
const PushNotification = require("../models/PushNotification");

const createNewQuestionJob = () => {
  // Run at the top of every hour
  const scheduleRule = "0 * * * *";
  return schedule.scheduleJob(scheduleRule, () =>
    Question.setNewQuestion().then(questions =>
      PushNotification.sendNewQuestionsToAll(questions)
    )
  );
};

Question.setNewQuestion();
module.exports = {
  createNewQuestionJob
};
