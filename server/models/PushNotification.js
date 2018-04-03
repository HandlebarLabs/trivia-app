const Expo = require("expo-server-sdk");
const db = require("../db");

const expo = new Expo();

const sendNewQuestionsToAll = ({ questions, nextQuestionTime }) => {
  return db
    .table("pushNotifications")
    .then(docs => {
      return docs.map(doc => {
        // TODO: Check if valid token

        return {
          to: doc.token,
          sound: "default",
          body: questions[0].question,
          badge: questions.length,
          data: {
            questions,
            nextQuestionTime
          }
        };
      });
    })
    .then(messages => {
      const messageChunks = expo.chunkPushNotifications(messages);

      return messageChunks.map(chunk => {
        return expo.sendPushNotificationsAsync(chunk);
      });
    })
    .then(chunks => Promise.all(chunks));
};

const addPushToken = ({ token, platform, timezone }) => {
  // TODO: Check if it's valid
  // TODO: Check that it isn't a duplicate
  return db.table("pushNotifications").insert({
    token,
    platform
  });
};

module.exports = {
  sendNewQuestionsToAll,
  addPushToken
};
