# Neura Webhook Sample

One of the best ways to be notified about Neura's user events is through a webhook. But when you just want to play with some code and creating a new app, you don't want the hassle of creating a server just to test its behavior. There is a [sample iOS app][https://github.com/NeuraLabs/NeuraMedsReminderIOS] that uses this repo.

This sample does the job for you. An out of the box tiny server app built on node.js, with just the needed components to get you started. It can also be used as a test server using [Heroku](### Heroku)

## Requirements

- NodeJS >= 7.6.0
- Mongodb

## Develop

The webhook is implemented in the '/neuraevent' endpoint which in turn call handleEventForUser function in [the events handler][./controllers/neuraEventsHandler]

### Push Notifications
[Push providers][./providers]
The server supports [apns][./providers/apn.js] (Apple push notification server). Adding gcm is planned in the near futureor through pull requests ;)

### Users
The [user model][./models/user.js] contains some simple properties:
* platform - android, ios etc. (all lowercase)
* neura_token - A token needed to get some info about the user using Neura's API. Not implemented in this sample
* push_token - The token used by the push service

It's updated through the '/user' endpoint which calls the createOrUpdate function in [the user's controller][./controllers/user.js]

### Database
[Using][./db/index.js] the [mongoose][http://mongoosejs.com/] MongoDB driver

## Using the server

### Install dependencies

To install dependencies enter project folder and run then following command:

```
npm install
```

### Configuring

* Configure mongo uri:

    ```
    MONGO_URL='mongodb://....' npn run dev
    ```

### Run server

The following commands will run the server in development mode with auto-reloading when there are changes in the server files

* `npm run dev`
* `npm run dev:debug` *this will break on first line of user script*

## Deploy

### Private server

```
npm run start
```
*this will run the server in production mode*

### Heroku

* step 1
* step 2

## License
[MIT](LICENSE)
