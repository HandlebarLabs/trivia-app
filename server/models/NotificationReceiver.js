const db = require("../db");

const dbKey = "notificationReceivers";

const createMany = (docs = []) => {
  if (docs.length > 0) {
    return db.table(dbKey).insert(docs);
  }

  return Promise.resolve();
};

const getHistory = token => {
  const PushNotification = require("./PushNotification");
  const Notification = require("./Notification");

  return db
    .table(PushNotification.dbKey)
    .where({ token })
    .join(dbKey, `${PushNotification.dbKey}._id`, `${dbKey}.pushNotificationId`)
    .join(
      Notification.dbKey,
      `${dbKey}.notificationId`,
      `${Notification.dbKey}._id`
    )
    .select(`${Notification.dbKey}.*`)
    .then(docs => {
      return docs.map(doc => {
        return {
          ...doc,
          data: JSON.parse(doc.data)
        };
      });
    });
};

module.exports = {
  createMany,
  getHistory,
  dbKey
};
