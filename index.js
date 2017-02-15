const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const route = require('koa-route');
const APNProvider = require('./apn');

const app = new Koa();
const push = new APNProvider();

app.use(bodyParser());

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
  push.send(JSON.stringify(ctx.request.body, null, 2));
  ctx.body = ctx.request.body;
}));

app.listen(process.env.PORT || 3000);
console.info(`${process.version} listening on port ${process.env.PORT || 3000}`); // eslint-disable-line no-console

