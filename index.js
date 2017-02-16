const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const route = require('koa-route');
const APNProvider = require('./providers/apn');
const User = require('./models/user');
const connectDatabase = require('./db');

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/MedAd';

(async () => {
  try {
    const db = await connectDatabase(mongoUri);
    console.log(`Connected to ${db.host}:${db.port}/${db.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
  }

  const app = new Koa();
  const push = new APNProvider();

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

  app.use(route.get('/', async (ctx) => {
    ctx.body = 'This endpoint is for POST only.';
  }));

  app.use(route.post('/', async (ctx) => {
    // debugger;
    push.send(JSON.stringify(ctx.request.body, null, 2));
    ctx.body = ctx.request.body;
  }));

  app.use(route.post('/adduser', async (ctx) => {
    // debugger;
    ctx.body = await User.create({
      platform: ctx.request.body.platform,
      neura_id: ctx.request.body.neura_id,
      push_token: ctx.request.body.push_token,
    });
  }));

  await app.listen(port);
  console.log(`Server started on port ${port}`);
})();
