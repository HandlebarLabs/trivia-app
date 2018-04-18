const express = require("express");
const bodyParser = require("body-parser");

const Question = require("./models/Question");
const PushNotification = require("./models/PushNotification");
const NotificationReceiver = require("./models/NotificationReceiver");
const User = require("./models/User");

/*
 * Express Bootstrap
 */
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*
 * New Question Job
 */
const jobs = require("./util/jobs");
const nextQuestionJob = jobs.createNewQuestionJob();

/*
 * Routes
 */
const formatResponse = require("./helpers/formatResponse");

app.get("/", (req, res) => {
  res.send("Hello to the Trivia API!");
});

app.put("/push/add-token", (req, res) => {
  return PushNotification.addPushToken({
    token: req.body.pushToken,
    platform: req.body.platform,
    timezoneOffset: req.body.timezoneOffset
  })
    .then(() => formatResponse(res, "success"))
    .catch(error => formatResponse(res, "error", error));
});

app.get("/push/history/:token", (req, res) => {
  return NotificationReceiver.getHistory(req.params.token)
    .then(history => {
      formatResponse(res, "success", history);
    })
    .catch(error => formatResponse(res, "error", error));
});

app.get("/questions/next", (req, res) => {
  return Question.getNextQuestions()
    .then(questions => {
      const data = {
        nextQuestionTime: nextQuestionJob.nextInvocation(),
        questions
      };

      formatResponse(res, "success", data);
    })
    .catch(error => formatResponse(res, "error", error));
});

app.put("/questions/answer/:questionId", (req, res) => {
  return Question.answerQuestion(req.params.questionId, req.body.answer)
    .then(() => formatResponse(res, "success"))
    .catch(error => formatResponse(res, "error", error));
});

app.get("/questions/asked", (req, res) => {
  return Question.getAskedQuestions()
    .then(questions => {
      const data = {
        questions
      };

      formatResponse(res, "success", data);
    })
    .catch(error => formatResponse(res, "error", error));
});

app.post("/user/sign-up", (req, res) => {
  return User.createUser({ email: req.body.email, password: req.body.password })
    .then(user => {
      formatResponse(res, "success", user);
    })
    .catch(error => formatResponse(res, "error", error));
});

app.post("/user/login", (req, res) => {
  return User.logUserIn({ email: req.body.email, password: req.body.password })
    .then(user => {
      formatResponse(res, "success", user);
    })
    .catch(error => formatResponse(res, "error", error));
});

/*
 * Start Server
 */
app.listen(PORT, () => console.log("server started"));
