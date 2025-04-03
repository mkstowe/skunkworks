import { Injectable } from '@angular/core';
import { RoomAction } from '../models/RoomAction';
import { HassService } from './hass.service';
import { HassEntity } from '../models/Entity';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private hassService: HassService) {}

  public createLightToggleAction(entityId: string): RoomAction {
    return {
      icon: 'lightbulb',
      entityId,
      service: {
        domain: 'light',
        service: 'toggle',
        target: { entity_id: entityId },
      },
      isActive: (e: HassEntity) => this.hassService.isActive(e),
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
        if (!this.hassService.isActive(e)) {
          return 'speaker';
        } else {
          return e.state === 'playing' ? 'pause' : 'play';
        }
      },
      entityId,
      getService: (e: HassEntity) => {
        return this.hassService.isActive(e)
          ? {
              domain: 'media_player',
              service: 'media_play_pause',
              target: { entity_id: entityId },
            }
          : {
              domain: 'music_assistant',
              service: 'play_media',
              service_data: { media_id: playlistUrl, media_type: 'playlist' },
              target: { entity_id: entityId },
            };
      },
      isActive: (e: HassEntity) => this.hassService.isActive(e),
      activeColor: 'bg-palette-1 text-dark hover:opacity-85',
      inactiveColor: 'hover:border-palette-1 hover:text-palette-1',
    };
  }
}
