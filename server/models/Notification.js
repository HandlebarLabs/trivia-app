const db = require("../db");

const dbKey = "notifications";

const getDocumentById = _id =>
  db
    .table(dbKey)
    .where({ _id })
    .first()
    .then(doc => {
      return {
        ...doc,
        data: JSON.parse(doc.data)
      };
    });

const createNotification = data => {
  return db
    .table(dbKey)
    .insert({ data: JSON.stringify(data) })
    .then(docs => getDocumentById(docs[0]));
};

module.exports = {
  createNotification,
  dbKey
};
