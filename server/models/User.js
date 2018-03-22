const db = require("../db");

const getUser = ({ _id }) => {
  return db
    .table("users")
    .where({ _id })
    .first();
};

const createUser = username => {
  return db
    .table("users")
    .insert({
      username: username
    })
    .then(users => users[0])
    .then(userId => {
      return getUser({ _id: userId });
    });
};

const addPushToken = ({ _id }, pushToken) => {
  return getUser({ _id }).then(user => {
    const tokens = user.pushTokens ? JSON.parse(user.pushTokens) : [];

    if (!tokens.includes(pushToken)) {
      tokens.push(pushToken);
    }

    return db
      .table("users")
      .where({ _id })
      .update({ pushTokens: JSON.stringify(tokens) });
  });
};

const getAllWithNotifications = () => {
  return db
    .table("users")
    .whereNotNull("pushTokens")
    .select("*");
};

module.exports = {
  createUser,
  getAllWithNotifications,
  addPushToken
};
