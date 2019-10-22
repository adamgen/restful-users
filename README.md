# Creating a general use authentication package

> This project aims to provide a higher level of implementation on top of express and passport. Making the bootstrap of an app with a user system to take as little configuration as possible.

When starting a new project the most common and trivial concern is user authentication and management. Implementing practically the same software throughout the different projects is a waste of time. Our goal is to provide a single service that allows to manage users in a higher level.

## How lean is the management service?

That's the base user object:

```javascript
{
  id
}
```

## What is the plugin api?

A plugin receives an express app and a user model as it's properties. With it the plugin can make any modification to the user on any desired endpoint. The only limitation is that the plugin endpoint must be 100% restful, that is so we can maintain a readable api for the service consumers. Here's an example of an email auth plugin:

```typescript
// in business logic folder
const emailAuth = async function emailAuth(app: Express.Application, userModel, config) {
  app.post('/user', async function postUser(req, res, next) {
    const user = {};
    // ...
    await userModel.create(user);
    res.json('created user');
  });
  app.get('/session', async function postUser(req, res, next) {
    await userModel.loginByEmailPassword(req.email, req.password);
    if(config.getSessionRedirectUrl) {
      return app.redirect(config.getSessionRedirectUrl);
    }
    next();
  });
}
```

Different plugins can access the same endpoint, this way the client will have a single endpoint to perform an operation but the server can attempt several ways to perform the operation until it succeeds. Here's an example of a facebook login:

```typescript
const facebookAuth = async function facebookAuth(app: Express, userModel, config) {
  passport.use(new passportFacebook.Strategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://example.com/session/facebook",
   },
  async function (accessToken, refreshToken, profile, next) {
    const user = await userModel.findById(profile.id)
    if (user) {
      return next(null, user.id);
    }
    next(new Error('no user found with given facebook id'));
  }));

  app.get('/session/facebook',
    passport.authenticate('facebook'),
    function (req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect('/me');
      }
      next();
    }
  );
}
```

Another example is modifying the user can be done by different plugins at the exact same endpoint. The email auth plugin will have a access the modify endpoint to edit the user email. And another profile plugin will modify the user age and address.

The email auth plugin updating the user email address:

```typescript
// in business logic folder
const emailAuth = async function emailAuth(app: Express, userModel, config) {
  app.put('/user', async function postUser(req, res, next) {
    const { search } = req.query;
    const { email } = search;
    await userModel.update(req.user, { email });
    req.messages.push('Email updated');
    next();
  });
}
```

The custom profile plugin updating the user age and geographic address:

```typescript
// in business logic folder
const customProfile = async function emailAuth(app: Express, userModel, config) {
  app.put('/user', async function postUser(req, res, next) {
    const { search } = req.query;
    const { age, address } = search;
    await userModel.update(req.user, { age, address });
    req.messages.push('Profile updated');
    next();
  });
}
```

## Authentication best practices

- https://cloud.google.com/blog/products/gcp/12-best-practices-for-user-account
- https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Authentication_Cheat_Sheet.md
- https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Forgot_Password_Cheat_Sheet.md

## A truly RESTful structure for authentication endpoints

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

---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------

Adding the typings to the user:

```typescript
// in index.d.ts file
declare namespace Express {
    interface User {
        email: string;
    }
}
```

- The plugin api can extend the user to meet any needs by creating modifications to the base user.
- Plugins should be completely separated from one another
- Plugin has the following properties/attributes:
  - A stated extension of the user
  - A new endpoint to a restful or graphql server

## Other concepts

- Endpoint
  - RESTFUL
  - GraphQL
- User business flow
  - Register
  - Login
  - Logout
  - Delete
  - Forgot password
  - Update
    - email
    - username
    - password
- Databases
  - SQL
  - Mongo

The minimal user

- ID

Optional extensions of a user

- Authentication methods
- Email address
- App data
- Sessions
