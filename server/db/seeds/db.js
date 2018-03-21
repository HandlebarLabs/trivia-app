exports.seed = (knex, Promise) => {
  return knex("questions")
    .del()
    .then(() => {
      return knex("questions").insert([
        {
          _id: 1,
          question:
            "Which christian missionary is said to have banished all the snakes from Ireland?",
          totalResponses: 0,
          answers: JSON.stringify([
            {
              answer: "Patrick Star",
              answerCount: 0,
              correct: false
            },
            {
              answer: "Saint Patrick",
              answerCount: 0,
              correct: true
            },
            {
              answer: "Neil Patrick Harris",
              answerCount: 0,
              correct: false
            }
          ])
        }
      ]);
    });
};
