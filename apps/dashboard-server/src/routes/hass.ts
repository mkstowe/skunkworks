import type { ServerWebSocket } from 'bun';
import { Hono } from 'hono';
import { createBunWebSocket } from 'hono/bun';
import { cors } from 'hono/cors';
import { ServiceCall } from '../models/Hass';
import { HomeAssistantService } from '../services/hass-service';

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

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

hass.get(
  '/ws',
  upgradeWebSocket(() => {
    return {
      async onOpen(_event, ws) {
        console.log('Client connected');
        hassService.subscribe(ws);
      },

      onClose(_, ws) {
        hassService.unsubscribe(ws);
        console.log('Client disconnected');
      },
    };
  })
);

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
  console.log('POST');
  const body: ServiceCall = await c.req.json();
  hassService.callService(body);

  return c.json({ entity: body.target.entity_id }, 200);
});

export { hass, websocket };
