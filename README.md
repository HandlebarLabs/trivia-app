# React Native Trivia App

This is a simple trivia game that serves as a demonstration app for React Native. I intentionally tried to use minimal third-party packages to demonstrate, in as simple form as possible, how to create your own (and to learn myself).

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
    "message": "success",
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
