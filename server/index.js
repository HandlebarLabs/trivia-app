const express = require("express");
const bodyParser = require("body-parser");

const User = require("./models/User");
const Question = require("./models/Question");

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

app.post("/user", (req, res) => {
  return User.createUser(req.body.username)
    .then(user => {
      formatResponse(res, "success", user);
    })
    .catch(error => formatResponse(res, "error", error));
});

app.delete("/user", (req, res) => {
  return User.deleteUser(req.headers.userid)
    .then(() => {
      formatResponse(res, "success");
    })
    .catch(error => formatResponse(res, "error", error));
});

app.put("/user/add-push-token", (req, res) => {
  return User.addPushToken({ _id: req.headers.userid }, req.body.pushToken)
    .then(() => formatResponse(res, "success"))
    .catch(error => formatResponse(res, "error", error));
});

app.get("/questions/next", (req, res) => {
  return Question.getNextQuestions()
    .then(questions => {
      const data = {
        message: "success",
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

/*
 * Start Server
 */
app.listen(PORT, () => console.log("server started"));
