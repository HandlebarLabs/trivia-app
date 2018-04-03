const schedule = require("node-schedule");
const Question = require("../models/Question");
const PushNotification = require("../models/PushNotification");
const Notification = require("../models/Notification");

const createNewQuestionJob = () => {
  // Run at the top of every hour
  const scheduleRule = "0 * * * *";
  const job = schedule.scheduleJob(scheduleRule, () =>
    Question.setNewQuestion().then(questions => {
      return Notification.createNotification({
        questions,
        nextQuestionTime: job.nextInvocation()
      }).then(notification => {
        PushNotification.sendNewNotificationToAll(notification);
      });
    })
  );

  return job;
};

// const njob = schedule.scheduleJob("0 * * * *", () => null);
// Question.setNewQuestion().then(questions => {
//   return Notification.createNotification({
//     questions,
//     nextQuestionTime: njob.nextInvocation()
//   }).then(notification => {
//     PushNotification.sendNewNotificationToAll(notification);
//   });
// });

module.exports = {
  createNewQuestionJob
};
