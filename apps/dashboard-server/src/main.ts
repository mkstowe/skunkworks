import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Readable } from 'stream';
import { WebSocketServer } from 'ws';
import { hass, injectWebSocketServer } from './routes/hass';

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
