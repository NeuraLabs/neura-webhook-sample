# Neura Webhook Sample

One of the best ways to be notified about Neura's user events is through a webhook. But when you just want to play with some code and creating a new app, you don't want the hassle of creating a server just to test its behavior. There is a [sample iOS app](https://github.com/NeuraLabs/NeuraMedsReminderIOS) that uses this repo.

This sample does the job for you. An out of the box tiny server app built on node.js, with just the needed components to [get you started](#using-the-server). It can also be used as a test server using [Heroku](#heroku)

* Some more details about the webhook request format can be found [here](https://dev.theneura.com/docs/api/events#push-event)
* Create an app using [this guide](https://dev.theneura.com/docs/guide/ios/setup)
* Add the webhook to your app [here](https://dev.theneura.com/console/apps)

## Requirements

* NodeJS >= 7.6.0
* Mongodb

## Develop

The webhook is implemented in the '/neuraevent' endpoint which in turn call handleEventForUser function in [the events handler](./controllers/neuraEventsHandler)

### Push Notifications
[Push providers](./providers)
The server supports [apns](./providers/apn.js]) (Apple push notification server). Adding gcm is planned in the near futureor through pull requests ;)
The server expect a p12 certificate under "process.env.CERT_PATH" with "process.env.CERT_NAME" (the default location is ./certificates folder with medAdKey.p12 certificate name)

The certificates can be obtained through Apple's [developer account](https://developer.apple.com/account)
* Go to Certificates, Identifiers & Profiles
* Click on All under Certificates and than click on '+' on the top right corner
* We recommend a single certificate for both production & sandbox (easier to manage) - choose Apple Push Notification service SSL (Sandbox & Production) and click continue
* Select your app ID, click continue and follow the instructions on screen
* Download the production push certificate that you just created and open it in the Keychain Access application
* In Keychain Access, click on "My Certificates" and locate your push certificate
* Export it as a .p12 file (password is optional)

* Apple's push notification guide can be found [here](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html#//apple_ref/doc/uid/TP40012582-Ch36-SW7)

### Users
The [user model](./models/user.js) contains some simple properties:
* platform - android, ios etc. (all lowercase)
* neura_token - A token needed to get some info about the user using Neura's API. Not implemented in this sample
* push_token - The token used by the push service

It's updated through the '/user' endpoint which calls the createOrUpdate function in [the user's controller](./controllers/user.js)

### Database
[Using](./db/index.js) the [mongoose](http://mongoosejs.com/) MongoDB driver

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

* Go to https://www.heroku.com/ and sign up for free
* Verify your account using the link sent to your email and choose password
* Click on Create New App
* Choose an app name (unique) and click Create App
* Choose your deployment method
  * Fork this repo and link your github
  * Follow the steps on screen under Heroku Git to create a remote git repo on heroku which will look like ```https://git.heroku.com/<your app name>.git```
* Push this code to the new git origin **master** branch

* Under the Resources tab, add the mLab mongo DB plugin (to add the free tier you'll have to verify your account by adding a credit card - you'll receive more free credit just by adding it)
  * A process.env variable is automatically created which is called MONGODB_URI with the db connection string
* Your app's url address is ```https://<your app name>.herokuapp.com```
* Enjoy :)

## License
[MIT](LICENSE)
