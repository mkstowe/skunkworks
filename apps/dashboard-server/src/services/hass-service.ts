import {
  Auth,
  Connection,
  HassEntities,
  MessageBase,
  createLongLivedTokenAuth,
  subscribeEntities,
} from 'home-assistant-js-websocket';
import { WSContext } from 'hono/ws';
import { WebSocket } from 'ws';
import { ServiceCall } from '../models/Hass';

class HomeAssistantService {
  private _connection: Connection | null = null;
  private _auth: Auth | null = null;
  private entityCache: HassEntities = {};
  private subscribers: Set<WebSocket | WSContext> = new Set(); // Track connected WebSockets

  constructor(url: string, accessToken: string) {
    this._auth = createLongLivedTokenAuth(url, accessToken);
    this.connect();
  }

  public subscribe(client: WebSocket) {
    this.subscribers.add(client);

    client.send(JSON.stringify(this.entityCache));
  }

  public unsubscribe(client: WebSocket) {
    this.subscribers.delete(client);
  }

  private async connect() {
    if (this._connection || !this._auth) return;

    const { createConnection } = await import('home-assistant-js-websocket')
    this._connection = await createConnection({ auth: this._auth });

    subscribeEntities(this._connection, (entities) => {
      this.entityCache = entities;
      this.broadcastEntities(entities);
    });

    return this._connection;
  }

  public getEntityState(entityId: string) {
    return this.entityCache[entityId] || null;
  }

  public callService(service: ServiceCall) {
    this._connection?.sendMessage(service as MessageBase);
  }

  private broadcastEntities(entities: HassEntities) {
    const data = JSON.stringify(entities);

    this.subscribers.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      } else {
        this.subscribers.delete(client);
      }
    });
  }
}

export { HomeAssistantService };
