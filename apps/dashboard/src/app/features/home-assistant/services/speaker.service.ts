import { Injectable } from '@angular/core';
import { HassService } from './hass.service';
import { ServiceCall } from '../models/ServiceCall';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  constructor(private hass: HassService) { }

  public toggleState(entity: string) {
    const service: ServiceCall = {
      domain: 'media_player',
      service: 'toggle',
      target: {
        entity_id: entity
      }
    }
    return this.hass.callService(service)
  }

  public togglePlayback(entity: string) {
    const service: ServiceCall = {
      domain: 'media_player',
      service: 'media_play_pause',
      target: {
        entity_id: entity
      }
    }
    return this.hass.callService(service);
  }

  public changeVolume(entity: string, value: number) {
    return;
  }
}
