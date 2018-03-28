const csv = require("csvtojson");
const { randomNumber } = require("../../util/math");

exports.seed = (knex, Promise) => {
  const data = [];
  return new Promise(resolve => {
    csv()
      .fromFile(`${__dirname}/../data/questions.csv`)
      .on("json", jsonObj => {
        const newRow = {
          question: jsonObj["Question"],
          asked: false,
          isCurrent: false,
          answers: [
            {
              answer: jsonObj["Answer 1"],
              answerCount: randomNumber(0, 10),
              correct: jsonObj["Answer 1"] === jsonObj["Correct Answer"]
            },
            {
              answer: jsonObj["Answer 2"],
              answerCount: randomNumber(0, 10),
              correct: jsonObj["Answer 2"] === jsonObj["Correct Answer"]
            },
            {
              answer: jsonObj["Answer 3"],
              answerCount: randomNumber(0, 10),
              correct: jsonObj["Answer 3"] === jsonObj["Correct Answer"]
            }
          ]
        };

        if (jsonObj["Answer 4"] && jsonObj["Answer 4"].length > 0) {
          newRow.answers.push({
            answer: jsonObj["Answer 4"],
            answerCount: randomNumber(0, 10),
            correct: jsonObj["Answer 4"] === jsonObj["Correct Answer"]
          });
        }

        let hasACorrectAnswer = false;
        newRow.answers.forEach(answer => {
          if (answer.correct === true) {
            hasACorrectAnswer = true;
          }
        });

        if (hasACorrectAnswer) {
          newRow.totalResponses = newRow.answers.reduce(
            (total, answer) => total + answer.answerCount,
            0
          );

          data.push({
            ...newRow,
            answers: JSON.stringify(newRow.answers)
          });
        }
      })
      .on("done", error => {
        data[0].isCurrent = true;
        data[1].isCurrent = true;
        data[2].isCurrent = true;
        return knex("questions")
          .del()
          .then(() => {
            return knex("questions").insert(data);
          })
          .then(() => resolve());
      });
  });
};
