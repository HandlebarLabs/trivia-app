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
app.get("/", (req, res) => {
  res.send("Hello to the Trivia API!");
});

app.post("/user", (req, res) => {
  return User.createUser(req.body.username)
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch(error => res.status(500).json({ message: "error", error }));
});

app.get("/questions/next", (req, res) => {
  return Question.getNextQuestion()
    .then(question => {
      res.status(200).json({
        message: "success",
        nextQuestionTime: nextQuestionJob.nextInvocation(),
        questions: [{ ...question, answers: JSON.parse(question.answers) }]
      });
    })
    .catch(error => {
      res.status(500).json({ message: "error", error });
    });
});

app.put("/questions/answer/:questionId", (req, res) => {
  return Question.answerQuestion(req.params.questionId, req.body.answer)
    .then(() => res.status(200).json({ message: "success" }))
    .catch(error => {
      res.status(500).json({ message: "error", error });
    });
});

/*
 * Start Server
 */
app.listen(PORT, () => console.log("server started"));
