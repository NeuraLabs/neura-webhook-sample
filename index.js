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
