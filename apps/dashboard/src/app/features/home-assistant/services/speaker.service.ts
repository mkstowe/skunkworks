import { inject, Injectable } from '@angular/core';
import { EMPTY, map, switchMap, take } from 'rxjs';
import { ServiceCall } from '../models/ServiceCall';
import { HassService } from './hass.service';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService {
  private readonly hass = inject(HassService);

  public toggleState(entity: string) {
    const service: ServiceCall = {
      domain: 'media_player',
      service: 'toggle',
      target: {
        entity_id: entity,
      },
    };
    return this.hass.callService(service);
  }

  public turnOn(entity: string) {
    const service: ServiceCall = {
      domain: 'media_player',
      service: 'turn_on',
      target: {
        entity_id: entity,
      },
    };
    return this.hass.callService(service);
  }

  public togglePlayback(entity: string) {
    const service: ServiceCall = {
      domain: 'media_player',
      service: 'media_play_pause',
      target: {
        entity_id: entity,
      },
    };
    return this.hass.callService(service);
  }

  public prevTrack(entity: string) {
    const service: ServiceCall = {
      domain: 'media_player',
      service: 'media_previous_track',
      target: {
        entity_id: entity,
      },
    };
    return this.hass.callService(service);
  }

  public nextTrack(entity: string) {
    const service: ServiceCall = {
      domain: 'media_player',
      service: 'media_next_track',
      target: {
        entity_id: entity,
      },
    };
    return this.hass.callService(service);
  }

  public changeVolume(entity: string, value: number) {
    const service: ServiceCall = {
      domain: 'media_player',
      service: 'volume_set',
      service_data: {
        volume_level: value,
      },
      target: {
        entity_id: entity,
      },
    };
    return this.hass.callService(service);
  }

  public callRoomService(entityId: string) {
    this.hass
      .getEntity$(entityId)
      .pipe(
        map((entity) => {
          if (!entity) return null;
          const active = this.hass.isActive(entity);
          return {
            domain: active ? 'media_player' : 'music_assistant',
            service: active ? 'media_play_pause' : 'play_media',
            service_data: active
              ? null
              : {
                  media_id:
                    'https://open.spotify.com/playlist/4vNldb5p8tQ9RmX7XSaTIM',
                  media_type: 'playlist',
                },
            target: {
              entity_id: entityId,
            },
          };
        }),
        switchMap((service) => {
          if (!service) return EMPTY;
          return this.hass.callService(service as ServiceCall);
        }),
        take(1)
      )
      .subscribe();
  }
}
