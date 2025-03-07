import { Hono } from 'hono';
import { hass } from './routes/hass';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/hass', hass);

export default app;
