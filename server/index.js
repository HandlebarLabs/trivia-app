const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello to the Trivia API!");
});

app.get("/next-questions", (req, res) => {
  db
    .table("questions")
    .first()
    .then(question => {
      res.status(200).json({
        nextQuestionTime: "Wed Mar 21 2018 18:16:18 GMT-0500 (CDT)",
        questions: [{ ...question, answers: JSON.parse(question.answers) }]
      });
    });
});

app.put("/answer-question/:questionId", (req, res) => {
  db
    .table("questions")
    .where({ _id: req.params.questionId })
    .first()
    .then(question => {
      return {
        ...question,
        answers: JSON.parse(question.answers)
      };
    })
    .then(question => {
      question.answers.forEach(answer => {
        if (answer.answer === req.body.answer.answer) {
          answer.answerCount += 1;
        }
      });

      return db
        .table("questions")
        .where({ _id: question._id })
        .update({
          totalResponses: (question.totalResponses += 1),
          answers: JSON.stringify(question.answers)
        });
    })
    .then(() => res.status(200).json({ message: "success" }));
});

app.listen(3000, () => console.log("server started"));
