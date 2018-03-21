const express = require("express");
const bodyParser = require("body-parser");
// const db = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello Express app");
});

app.get("/next-questions", (req, res) => {
  res.status(200).json({
    nextQuestionTime: "Wed Mar 21 2018 18:16:18 GMT-0500 (CDT)",
    questions: [
      {
        _id: 1,
        question:
          "Which christian missionary is said to have banished all the snakes from Ireland?",
        totalResponses: 20,
        answers: [
          {
            answer: "Patrick Star",
            answerCount: 10,
            correct: false
          },
          {
            answer: "Saint Patrick",
            answerCount: 7,
            correct: true
          },
          {
            answer: "Neil Patrick Harris",
            answerCount: 3,
            correct: false
          }
        ]
      }
    ]
  });
});

app.put("/answer-question/:questionId", (req, res) => {
  console.log("hello", req.params.questionId, req.body.answer);
  res.status(200).json({ message: "success" });
});

app.listen(3000, () => console.log("server started"));
