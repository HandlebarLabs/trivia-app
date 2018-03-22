const db = require("../db");

const incrementAnswerCount = (q, answer) => {
  const question = {
    ...q,
    answers: JSON.parse(question.answers)
  };

  question.answers.forEach(answer => {
    if (answer.answer === answer.answer) {
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
};

const answerQuestion = (questionId, answer) => {
  return db
    .table("questions")
    .where({ _id: questionId })
    .first()
    .then(question => {
      incrementAnswerCount(question, answer);
    });
};

const setCurrentQuestionAsAnswered = () => {
  return db
    .table("questions")
    .where({ isCurrent: true })
    .update({ isCurrent: false, asked: true });
};

const resetQuestionsIfAllAsked = () => {
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
};

const setNewCurrentQuestion = () => {
  return db
    .table("questions")
    .where({ asked: false })
    .first()
    .then(doc => {
      return db
        .table("questions")
        .where({ _id: doc._id })
        .update({ isCurrent: true });
    });
};

const setNewQuestion = () => {
  return setCurrentQuestionAsAnswered()
    .then(() => resetQuestionsIfAllAsked())
    .then(() => setNewCurrentQuestion());
};

const getNextQuestion = () => {
  return db
    .table("questions")
    .where({ isCurrent: true })
    .first();
};

module.exports = {
  answerQuestion,
  getNextQuestion,
  setNewQuestion
};
