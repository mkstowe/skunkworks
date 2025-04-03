import { HassEntity } from './Entity';
import { ServiceCall } from './ServiceCall';

export interface RoomAction {
  icon?: string; // static icon
  getIcon?: (entity: HassEntity) => string; // dynamic icon
  service?: ServiceCall; // static service
  getService?: (entity: HassEntity) => ServiceCall; // dynamic service
  entityId: string;
  activeColor?: string;
  inactiveColor?: string;
  isActive?: (entity: HassEntity) => boolean;
}
