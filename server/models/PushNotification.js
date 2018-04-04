const Expo = require("expo-server-sdk");
const moment = require("moment");
const db = require("../db");

const dbKey = "pushNotifications";

const getTimeRange = () => {
  const currentUTC = moment().utc();
  const allOffsets = [];
  for (let i = -12; i <= 14; i++) {
    allOffsets.push(i);
  }

  const validOffsets = allOffsets.filter(o => {
    const timezoneTime = moment()
      .utc()
      .hours(currentUTC.hours() + o);
    const timezoneHours = timezoneTime.hours();

    if (timezoneHours >= 8 && timezoneHours <= 22) {
      return true;
    }
    return false;
  });

  return [
    validOffsets[0] * -60,
    validOffsets[validOffsets.length - 1] * -60
  ].sort();
};

const sendNewNotificationToAll = notification => {
  const { questions, nextQuestionTime } = notification.data;
  const expo = new Expo();

  return db
    .table(dbKey)
    .whereBetween("timezoneOffset", getTimeRange())
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

const addPushToken = ({ token, platform, timezoneOffset }) => {
  // TODO: Check if it's valid
  // TODO: Check that it isn't a duplicate
  return db.table(dbKey).insert({
    token,
    platform,
    timezoneOffset
  });
};

module.exports = {
  dbKey,
  sendNewNotificationToAll,
  addPushToken
};
