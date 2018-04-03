# React Native Trivia App

This is a simple trivia game that serves as a demonstration app for React Native. I intentionally tried to use minimal third-party packages to demonstrate, in as simple form as possible, how to create your own (and to learn myself).

**This app was developed for the [Master Push Notifications in React Native](https://learn.handlebarlabs.com/p/master-push-notifications-in-react-native) course.**

Download it, hack around with it, and learn React Native!

* [React Native App Docs](#react-native-app)
* [Server Docs](#server)

![App Demo](/assets/app-demo.gif)

Thanks to [Allison Kunz](https://www.linkedin.com/in/tafka-labs/) for the design of the application.

# React Native App

## Getting Started

This app is built on top of Expo so the first requirement is to install [Expo](https://expo.io/learn).

After cloning the repo and moving into the `mobile` directory run the following command:

* `yarn install` - Installs dependencies

You can then open the app from within the Expo XDE (or the command line) and run it from there.

# Server

## Getting Started

After cloning the repo and moving into the `server` directory run the following commands:

* `yarn install` - Installs dependencies
* `yarn run db:migrate-latest` - Creates the database (based on sqlite)
* `yarn run db:seed` - Seeds the database with some data

## Usage

* `yarn start` - Starts the server, making it accessible on `http://localhost:3000`

## API Docs

### POST /push/add-token

```javascript
fetch("/push/add-token", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    pushToken: "asfd",
    platform: "ios" // "android"
  })
});
```

**Successful Response**

```json
{
  "message": "success"
}
```

**Failure Response**

```json
{
  "message": "error",
  "data": "An error message..."
}
```

### GET /push/history

```javascript
fetch("/push/history/:token", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});
```

**Successful Response**

```json
{
  "message": "success",
  "data": [
    {
      "_id": 3,
      "createdAt": "2018-04-03 17:01:38",
      "data": {
        "questions": [
          {
            "_id": 10,
            "question":
              "In 1985, five percent of U.S. households had telephone answering machines. By 1990 what percentage of homes had answering machines?",
            "totalResponses": 17,
            "answers": [
              {
                "answer": "10 percent",
                "answerCount": 10,
                "correct": false
              },
              {
                "answer": "15 percent",
                "answerCount": 3,
                "correct": false
              },
              {
                "answer": "31 percent",
                "answerCount": 0,
                "correct": true
              },
              {
                "answer": "51 percent",
                "answerCount": 4,
                "correct": false
              }
            ],
            "asked": 0,
            "isCurrent": 1
          },
          {
            "_id": 11,
            "question":
              "The first black American pictured on a U.S. postage stamp was who?",
            "totalResponses": 9,
            "answers": [
              {
                "answer": "Fredrick Douglas",
                "answerCount": 0,
                "correct": false
              },
              {
                "answer": "Booked T. Washington",
                "answerCount": 1,
                "correct": false
              },
              {
                "answer": "Louis Armstrong",
                "answerCount": 5,
                "correct": false
              },
              {
                "answer": "Joe Louis",
                "answerCount": 3,
                "correct": true
              }
            ],
            "asked": 0,
            "isCurrent": 1
          },
          {
            "_id": 12,
            "question": "What did the “D” in D-Day stand for?",
            "totalResponses": 18,
            "answers": [
              {
                "answer": "Doom",
                "answerCount": 9,
                "correct": false
              },
              {
                "answer": "Day",
                "answerCount": 2,
                "correct": true
              },
              {
                "answer": "Dwight (Eisenhower)",
                "answerCount": 6,
                "correct": false
              },
              {
                "answer": "Dunkirk",
                "answerCount": 1,
                "correct": false
              }
            ],
            "asked": 0,
            "isCurrent": 1
          }
        ],
        "nextQuestionTime": "2018-04-03T18:00:00.000Z"
      }
    },
    ...
  ]
}
```

**Failure Response**

```json
{
  "message": "error",
  "data": "An error message..."
}
```

### GET /questions/next

```javascript
fetch("/questions/next", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});
```

**Successful Response**

```json
{
  "message": "success",
  "data": {
    "nextQuestionTime": "2018-03-22T23:00:00.000Z",
    "questions": [
      {
        "_id": 18,
        "question":
          "The Daniel Boon museum at the home where he died can best be described how?",
        "totalResponses": 0,
        "answers": [
          {
            "answer": "a log cabin in Kentucky",
            "answerCount": 0,
            "correct": false
          },
          {
            "answer": "a two-story clapboard house in Tennessee",
            "answerCount": 0,
            "correct": false
          },
          {
            "answer": "a four-story Georgian-style home in Missouri",
            "answerCount": 0,
            "correct": true
          },
          {
            "answer": "a three story brick house in Arkansas",
            "answerCount": 0,
            "correct": false
          }
        ],
        "asked": 0,
        "isCurrent": 1
      }
    ]
  }
}
```

**Failure Response**

```json
{
  "message": "error",
  "data": "An error message..."
}
```

### PUT /questions/answer/:questionId

```javascript
fetch(`/questions/answer/${QUESTION_ID}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    answer: { answer: "William and Elizabeth" }
  })
});
```

**Successful Response**

```json
{
  "message": "success"
}
```

**Failure Response**

```json
{
  "message": "error",
  "data": "An error message..."
}
```

### GET /questions/asked

```javascript
fetch("/questions/asked", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});
```

**Successful Response**

```json
{
  "message": "success",
  "data": {
    "questions": [
      {
        "_id": 18,
        "question":
          "The Daniel Boon museum at the home where he died can best be described how?",
        "totalResponses": 0,
        "answers": [
          {
            "answer": "a log cabin in Kentucky",
            "answerCount": 0,
            "correct": false
          },
          {
            "answer": "a two-story clapboard house in Tennessee",
            "answerCount": 0,
            "correct": false
          },
          {
            "answer": "a four-story Georgian-style home in Missouri",
            "answerCount": 0,
            "correct": true
          },
          {
            "answer": "a three story brick house in Arkansas",
            "answerCount": 0,
            "correct": false
          }
        ],
        "asked": 0,
        "isCurrent": 1
      },
      ... // limit of 20
    ]
  }
}
```

**Failure Response**

```json
{
  "message": "error",
  "data": "An error message..."
}
```
