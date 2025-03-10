import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { hass, websocket } from './routes/hass';

const app = new Hono();

app.use(trimTrailingSlash());
app.use(
  '/',
  cors({
    origin: ['http://localhost:4200'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    maxAge: 600,
  })
);

app.route('/hass', hass);

export default {
  fetch: app.fetch,
  websocket,
};
