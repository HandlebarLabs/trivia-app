const Expo = require("expo-server-sdk");
const db = require("../db");

const expo = new Expo();

const sendNewQuestionsToAll = questions => {
  return db
    .table("pushNotifications")
    .then(docs => {
      return docs.map(doc => {
        // TODO: Check if valid token

        return {
          to: doc.token,
          sound: "default",
          body: questions[0].question
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
  return db.table("pushNotifications").insert({
    token,
    platform
  });
};

module.exports = {
  sendNewQuestionsToAll,
  addPushToken
};
