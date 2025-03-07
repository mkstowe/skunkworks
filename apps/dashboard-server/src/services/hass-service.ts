import {
  createConnection,
  subscribeEntities,
  HassEntities,
  Auth,
  createLongLivedTokenAuth,
} from 'home-assistant-js-websocket';
import { WebSocket } from 'ws';

global.WebSocket = WebSocket as any; // Required for Node.js since WebSocket is not available in the global scope

interface HomeAssistantConfig {
  url: string;
  accessToken: string;
}

export class HomeAssistantService {
  private config: HomeAssistantConfig;
  private connection: any | null = null;
  private entityCache: HassEntities = {};

  constructor(config: HomeAssistantConfig) {
    this.config = config;
  }

  async connect() {
    if (this.connection) {
      console.log('Already connected to Home Assistant');
      return;
    }

    try {
      console.log('Connecting to Home Assistant WebSocket API...');
      const auth = createLongLivedTokenAuth(
        this.config.url,
        this.config.accessToken
      );

      this.connection = await createConnection({
        auth,
      });

      console.log('Connected to Home Assistant');

      // Subscribe to entity state changes
      subscribeEntities(this.connection, (entities) => {
        this.entityCache = entities;
        console.log('Entity cache updated:', Object.keys(entities));
      });
    } catch (error) {
      console.error('Failed to connect to Home Assistant:', error);
    }
  }

  getEntities() {
    return this.entityCache;
  }

  getEntityState(entityId: string) {
    return this.entityCache[entityId] || null;
  }

  async callService(
    domain: string,
    service: string,
    entityId: string,
    data: Record<string, any> = {}
  ) {
    if (!this.connection) {
      console.error('Not connected to Home Assistant');
      return;
    }

    try {
      await this.connection.sendMessagePromise({
        type: 'call_service',
        domain,
        service,
        service_data: {
          entity_id: entityId,
          ...data,
        },
      });

      console.log(
        `Successfully called service: ${domain}.${service} on ${entityId}`
      );
    } catch (error) {
      console.error('Failed to call service:', error);
    }
  }
}
