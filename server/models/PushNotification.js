const Expo = require("expo-server-sdk");
const db = require("../db");

const dbKey = "pushNotifications";

const sendNewNotificationToAll = notification => {
  const { questions, nextQuestionTime } = notification.data;
  const expo = new Expo();

  return db
    .table(dbKey)
    .then(docs => {
      const messages = [];
      const notificationReceivers = [];
      docs.forEach(doc => {
        notificationReceivers.push({
          pushNotificationId: doc._id,
          notificationId: notification._id
        });

        messages.push({
          to: doc.token,
          sound: "default",
          body: questions[0].question,
          badge: questions.length,
          data: {
            questions,
            nextQuestionTime
          }
        });
      });

      return {
        messages,
        notificationReceivers
      };
    })
    .then(({ messages, notificationReceivers }) => {
      const messageChunks = expo.chunkPushNotifications(messages);

      const expoRequests = messageChunks.map(chunk => {
        return expo.sendPushNotificationsAsync(chunk);
      });

      return { expoRequests, notificationReceivers };
    })
    .then(({ expoRequests, notificationReceivers }) => {
      const NotificationReceivers = require("./NotificationReceiver");

      return Promise.all([
        NotificationReceivers.createMany(notificationReceivers),
        ...expoRequests
      ]);
    });
};

const addPushToken = ({ token, platform, timezone }) => {
  // TODO: Check if it's valid
  // TODO: Check that it isn't a duplicate
  return db.table(dbKey).insert({
    token,
    platform
  });
};

module.exports = {
  dbKey,
  sendNewNotificationToAll,
  addPushToken
};
