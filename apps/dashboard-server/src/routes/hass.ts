import { Hono } from 'hono';
import { HomeAssistantService } from '../services/hass-service';

export const hass = new Hono();

const hassService = new HomeAssistantService({
  url: process.env.HASS_URL!,
  accessToken: process.env.HASS_ACCESS_TOKEN!,
});

hassService.connect();

hass.get('/entities', async (c) => {
  const entities = hassService.getEntities();
  return c.json(entities);
});
