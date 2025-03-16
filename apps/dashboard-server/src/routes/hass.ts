import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { WebSocket, WebSocketServer } from 'ws';
import { ServiceCall } from '../models/Hass';
import { HomeAssistantService } from '../services/hass-service';

const hass = new Hono();

hass.use(
  '*',
  cors({
    origin: ['http://localhost:4200'],
  })
);

const hassService = new HomeAssistantService(
  process.env.HASS_URL!,
  process.env.HASS_ACCESS_TOKEN!
);

let wss: WebSocketServer;

function injectWebSocketServer(server: WebSocketServer) {
  wss = server;
  wss.on('connection', (ws: WebSocket, req) => {
    console.log('WebSocket client connected:', req.socket.remoteAddress);
    hassService.subscribe(ws);

    ws.on('message', (message) => {
      console.log('Received message:', message.toString());
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      hassService.unsubscribe(ws);
    });

    ws.on('error', (err) => {
      console.error('WebSocket Error:', err);
    });
  });
}

hass.get('/entities', (c) => {
  return c.json({});
});

hass.get('/entity/:entityId', (c) => {
  const entityId = c.req.param('entityId');
  const state = hassService.getEntityState(entityId);

  if (!state) {
    return c.json({ error: 'Entity not found' }, 404);
  }

  return c.json(state, 200);
});

hass.post('/entity/service', async (c) => {
  const body: ServiceCall = await c.req.json();
  hassService.callService(body);

  return c.json({ entity: body.target.entity_id }, 200);
});

export { hass, injectWebSocketServer };
