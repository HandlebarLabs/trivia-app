const db = require("../db");

const createUser = username => {
  return db.table("users").insert({
    username: username
  });
};

module.exports = {
  createUser
};
