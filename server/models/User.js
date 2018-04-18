const bcrypt = require("bcryptjs");
const db = require("../db");

const dbKey = "users";

const getUser = _id => {
  return db
    .table(dbKey)
    .where({ _id })
    .first()
    .then(doc => {
      return {
        ...doc,
        password: undefined
      };
    });
};

const createPasswordHash = password => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const isValidPassword = (suppliedPassword, actualPassword) =>
  bcrypt.compareSync(suppliedPassword, actualPassword);

const createUser = ({ email, password }) => {
  const data = {
    email,
    password: createPasswordHash(password)
  };

  return db
    .table(dbKey)
    .insert(data)
    .then(res => getUser(res[0]));
};

const logUserIn = ({ email, password }) => {
  return db
    .table(dbKey)
    .where({ email })
    .first()
    .then(user => {
      if (!user) {
        return Promise.reject(
          new Error("No user found with that email address.")
        );
      }

      if (isValidPassword(password, user.password)) {
        return {
          _id: user._id,
          jwt: "TODO",
          email: user.email
        };
      }

      return Promise.reject(new Error("Invalid password."));
    });
};

const deleteUser = () => {};

module.exports = {
  createUser,
  logUserIn,
  deleteUser
};
