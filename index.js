/**
 * An example for a webhook. A webhook is the preffered option for Neura to
 * send you events about your users. (e.g. when the user arrives at work)
 * The webhook implements a simple push notification interface for apple devices
 * The database is a MongoDB using mongoose interface
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const route = require('koa-route');
const User = require('./controllers/user');
const connectDatabase = require('./db');
const neuraEventsHandler = require('./controllers/neuraEventsHandler');

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URL || 'mongodb://localhost/MedAd';

(async () => {
  try {
    const db = await connectDatabase(mongoUri);
    console.log(`Connected to ${db.host}:${db.port}/${db.name}`);

    const app = new Koa();
    app.use(bodyParser());

    // handle thrown or uncaught exceptions anywhere down the line
    app.use(async function handleErrors(ctx, next) {
      try {
        await next();
      } catch (error) {
        console.error(error);
        ctx.body = error;
        ctx.status = 500;
      }
    });

    // The webhook to add to your app page in dev.theneura.com.
    // See ./controllers/neuraEventsHandler.js
    app.use(route.post('/neuraevent', async (ctx) => {
      console.log('post neuraevent:', ctx.request.body);
      const identifier = ctx.request.body.identifier;
      const re = new RegExp(/[a-zA-Z0-9]+_(.+)/);

      if (identifier.search(re) > -1) {
        const userId = identifier.match(re)[1];
        const user = await User.findOne(userId);
        if (user) {
          neuraEventsHandler.handleEventForUser(ctx.request.body.event.name, user);
          ctx.body = ctx.request.body;
          return ctx.body;
        }
      }
      ctx.status = 500;
      ctx.body = 'User not found';
      console.error(ctx.body);
      return ctx.body;
    }));

    // An endpoint to add users from your app.
    // the user object is returned to the app, the neura event subscription (done in the app)
    // needs the user _id to make sure the event identifier is unique to a specific user
    // thus allowing us to trigger the push notification to the relevan user
    // See ./models/user.js ./controllers/user.js
    app.use(route.post('/user', async (ctx) => {
      console.log('post user:', ctx.request.body);
      const user = await User.createOrUpdate(ctx.request.body);
      ctx.body = user;
    }));

    await app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error(error.message);
  }
})();
