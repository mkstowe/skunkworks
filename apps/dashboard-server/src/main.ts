import { Hono } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { cors } from 'hono/cors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Readable } from 'stream';
import WebSocket, { WebSocketServer } from 'ws';
import { hass, injectWebSocketServer } from './routes/hass';

// @ts-expect-error: ws doesn't match the expected browser WebSocket type
globalThis.WebSocket = WebSocket;
Object.assign(global, { WebSocket: require('ws') });

const app = new Hono();

app.use(trimTrailingSlash());
app.use(
  '*',
  cors({
    origin: ['http://localhost:4200', 'http://192.168.50.94:8080'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    maxAge: 600,
  })
);

// Auth middleware
app.use('/authorized', async (c, next) => {
  const token = getCookie(c, 'authToken');
  if (token !== process.env.SESSION_TOKEN) {
    return c.text('Unauthorized', 401);
  }
  await next();
});

app.get('/authorized', (c) => {
  return c.json({ success: true });
});

app.route('/hass', hass);

app.get('', (c) => {
  return c.text('Hello!');
});

app.options('/login', (c) => c.body(null, 204));

app.post('/login', async (c) => {
  const body = await c.req.json();
  const { password } = body;

  if (password === process.env.VALID_PASSWORD) {
    setCookie(c, 'authToken', process.env.SESSION_TOKEN, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 34560000, // 400 days
    });

    return c.json({ success: true });
  }

  return c.json({ success: false }, 401);
});

app.options('/logout', (c) => c.body(null, 204));

app.post('/logout', (c) => {
  deleteCookie(c, 'authToken');
  return c.json({ success: true });
});

async function toFetchRequest(req: IncomingMessage): Promise<Request> {
  const body =
    req.method === 'GET' || req.method === 'HEAD'
      ? null
      : (Readable.toWeb(req) as BodyInit);

  return new Request(`http://${req.headers.host}${req.url}`, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body,
    duplex: 'half' as any, // Bypass TypeScript error
  } as RequestInit); // Explicitly cast to RequestInit
}

const server = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const request = await toFetchRequest(req); // Convert IncomingMessage → Fetch Request
      const response = await app.fetch(request);

      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      res.writeHead(response.status);
      const body = await response.text();
      res.end(body);
    } catch (err) {
      console.error('Error handling request:', err);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
);

const wss = new WebSocketServer({ server });
injectWebSocketServer(wss);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
