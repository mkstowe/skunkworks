import { RoomAction } from './RoomAction';

export interface RoomConfig {
  title: string;
  icon: string;
  color: string;
  roomName: string;
  temperatureEntityId?: string;
  humidityEntityId?: string;
  occupiedEntityId?: string;
  actions: RoomAction[];
}
