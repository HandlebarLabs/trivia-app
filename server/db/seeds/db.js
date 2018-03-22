exports.seed = (knex, Promise) => {
  return knex("questions")
    .del()
    .then(() => {
      return knex("questions").insert([
        {
          question:
            "Which christian missionary is said to have banished all the snakes from Ireland?",
          totalResponses: 0,
          asked: false,
          isCurrent: true,
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
        },
        {
          question:
            "Fonts that contain small decorative lines at the end of a stroke are known as what?",
          totalResponses: 0,
          asked: false,
          isCurrent: false,
          answers: JSON.stringify([
            {
              answer: "Sans Serif Fonts",
              answerCount: 0,
              correct: false
            },
            {
              answer: "Script Fonts",
              answerCount: 0,
              correct: false
            },
            {
              answer: "Serif Fonts",
              answerCount: 0,
              correct: true
            }
          ])
        }
      ]);
    });
};
