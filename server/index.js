const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const schedule = require("node-schedule");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const setNewQuestion = () => {
  // FIX: this is incredibly messy and hard to understand

  // Reset the current question to no longer be the current one
  return db
    .table("questions")
    .where({ isCurrent: true })
    .update({ isCurrent: false, asked: true })
    .then(() => {
      // Check if there are any questions that haven't been asked, if not then reset the whole db
      return db
        .table("questions")
        .where({ asked: false })
        .then(data => {
          if (data.length === 0) {
            return db
              .table("questions")
              .where({ asked: true })
              .update({ asked: false });
          } else {
            return Promise.resolve();
          }
        });
    })
    .then(() => {
      // Set a new question as the current one
      return db
        .table("questions")
        .where({ asked: false })
        .first()
        .then(doc => {
          return db
            .table("questions")
            .where({ _id: doc._id })
            .update({ isCurrent: true })
            .then(d => console.log(d));
        });
    });
};

// 5 hour offset
// Run job at 2pm and 8pm CST
const scheduleRule = new schedule.RecurrenceRule();
// scheduleRule.hour = [1, 19];
scheduleRule.hour = [14, 20]; // will this end up being the right timezone? probably not
scheduleRule.minute = 0;

const nextQuestionJob = schedule.scheduleJob(scheduleRule, () =>
  setNewQuestion()
);

app.get("/", (req, res) => {
  res.send("Hello to the Trivia API!");
});

app.post("/user", (req, res) => {
  const pushTokens = [];
  if (req.body.pushToken) {
    pushTokens.push(req.body.pushToken);
  }

  return db
    .table("users")
    .insert({
      username: req.body.username,
      pushTokens: JSON.stringify(pushTokens)
    })
    .then(() => {
      res.status(200).json({ message: "success" });
    });
});

app.get("/questions/next", (req, res) => {
  db
    .table("questions")
    .where({ isCurrent: true })
    .first()
    .then(question => {
      res.status(200).json({
        nextQuestionTime: nextQuestionJob.nextInvocation(),
        questions: [{ ...question, answers: JSON.parse(question.answers) }]
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.put("/questions/answer/:questionId", (req, res) => {
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
    .then(() => res.status(200).json({ message: "success" }))
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.listen(3000, () => console.log("server started"));
