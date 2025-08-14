import { inject, Injectable } from '@angular/core';
import { HassEntity } from '../models/Entity';
import { RoomAction } from '../models/RoomAction';
import { HassService } from './hass.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private readonly hass = inject(HassService);

  public createLightToggleAction(entityId: string): RoomAction {
    return {
      icon: 'lightbulb',
      entityId,
      service: {
        domain: 'light',
        service: 'toggle',
        target: { entity_id: entityId },
      },
      isActive: (e: HassEntity) => this.hass.isActive(e),
      activeColor: 'bg-palette-2 text-dark hover:opacity-85',
      inactiveColor: 'hover:border-palette-2 hover:text-palette-2',
    };
  }

  public createMediaToggleAction(
    entityId: string,
    playlistUrl: string
  ): RoomAction {
    return {
      getIcon: (e: HassEntity) => {
        if (!this.hass.isActive(e)) {
          return 'speaker';
        } else {
          return e.state === 'playing' ? 'pause' : 'play';
        }
      },
      entityId,
      getService: (e: HassEntity) => {
        return this.hass.isActive(e)
          ? {
              domain: 'media_player',
              service: 'media_play_pause',
              target: { entity_id: entityId },
            }
          : {
              domain: 'media_player',
              service: 'play_media',
              service_data: { media_content_id:  playlistUrl, media_content_type: 'playlist' },
              target: { entity_id: entityId },
            };
      },
      isActive: (e: HassEntity) => this.hass.isActive(e),
      activeColor: 'bg-palette-1 text-dark hover:opacity-85',
      inactiveColor: 'hover:border-palette-1 hover:text-palette-1',
    };
  }

  public createLockToggleAction(entityId: string): RoomAction {
    return {
      getIcon: (e: HassEntity) => {
        if (!this.hass.isActive(e)) {
          return 'lock';
        } else {
          return 'lockOpen';
        }
      },
      entityId,
      getService: (e: HassEntity) => {
        return this.hass.isActive(e)
          ? {
              domain: 'lock',
              service: 'lock',
              target: { entity_id: entityId },
            }
          : {
              domain: 'lock',
              service: 'unlock',
              target: { entity_id: entityId },
            };
      },
      isActive: (e: HassEntity) => this.hass.isActive(e),
      activeColor: 'bg-palette-1 text-dark hover:opacity-85',
      inactiveColor: 'hover:border-palette-1 hover:text-palette-1',
    };
  }
}
