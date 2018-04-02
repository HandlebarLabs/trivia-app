const db = require("../db");

const incrementAnswerCount = (q, userAnswer) => {
  const question = {
    ...q,
    answers: JSON.parse(q.answers)
  };

  question.answers.forEach(answer => {
    if (answer.answer === userAnswer.answer) {
      answer.answerCount += 1;
    }
  });

  return (
    db
      .table("questions")
      .where({ _id: question._id })
      .update({
        totalResponses: (question.totalResponses += 1),
        answers: JSON.stringify(question.answers)
      })
      // TODO: Why is this necessary? Doc isn't updating if this isn't here.
      .then(() => null)
  );
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
    .limit(3)
    .then(docs => {
      const ids = docs.map(doc => doc._id);
      return db
        .table("questions")
        .whereIn("_id", ids)
        .update({ isCurrent: true });
    });
};

const setNewQuestion = () => {
  return setCurrentQuestionAsAnswered()
    .then(() => resetQuestionsIfAllAsked())
    .then(() => setNewCurrentQuestion())
    .then(() => getNextQuestions());
};

const getNextQuestions = () => {
  return db
    .table("questions")
    .where({ isCurrent: true })
    .then(questions =>
      questions.map(q => {
        return {
          ...q,
          answers: JSON.parse(q.answers)
        };
      })
    );
};

module.exports = {
  answerQuestion,
  getNextQuestions,
  setNewQuestion
};
