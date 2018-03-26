# React Native Trivia App

Work in progress.

# Server

TODO: How to run the server

## API Docs

### /user

**Request**

```javascript
fetch("/user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: "spencer"
  })
});
```

**Successful Response**

```json
{
  "message": "success",
  "data": {
    "_id": 19,
    "username": "spencer",
    "pushTokens": null
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

### /user/add-push-token

```javascript
fetch("/user/add-push-token", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    userId: 1
  },
  body: JSON.stringify({
    pushToken: "asfd"
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

### /questions/next

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

### /questions/answer/:questionId

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
