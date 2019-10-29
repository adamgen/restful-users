# Creating a general use authentication package

> This project aims to provide a higher level of implementation on top of express and passport. Making the bootstrap of an app with a user system to take as little configuration as possible.

## Install and setup

Install the package `npm i restful-users` and add as an express middleware

```typescript
app.use(usersSessionsRouter);
app.use(suggestedMiddleware());
```

Add a `.env` file at the root of you project and add the following:

- `FACEBOOK_APP_ID`
- `FACEBOOK_APP_SECRET`

That's it. now you can access the endpoints

## Truly RESTful authentication endpoints

| resource    | method    | business action     |
|-------------|-----------|---------------------|
| `/user`     | `POST`    | register            |
| `/user`     | `PUT`     | approve email       |
| `/user`     | `PUT`     | update              |
| `/user`     | `GET`     | see profile         |
| `/user`     | `DELETE`  | delete account      |
| `/session`  | `POST`    | forgot password     |
| `/session`  | `GET`     | login               |
| `/session`  | `DELETE`  | logout              |
