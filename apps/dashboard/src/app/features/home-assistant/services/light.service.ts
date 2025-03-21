import { Injectable } from '@angular/core';
import { HassService } from './hass.service';
import { ServiceCall } from '../models/ServiceCall';
import { RGBA } from 'ngx-color';

@Injectable({
  providedIn: 'root',
})
export class LightService {
  constructor(private hass: HassService) {}

  public toggleState(entity: string) {
    const service: ServiceCall = {
      domain: 'light',
      service: 'toggle',
      target: {
        entity_id: entity,
      },
    };

    return this.hass.callService(service);
  }

  public changeBrightness(entity: string, value: number) {
    const service: ServiceCall = {
      domain: 'light',
      service: 'turn_on',
      service_data: {
        brightness: value,
      },
      target: {
        entity_id: entity,
      },
    };
    return this.hass.callService(service);
  }

  public changeColor(entity: string, color: RGBA) {
    const service: ServiceCall = {
      domain: 'light',
      service: 'turn_on',
      service_data: {
        rgb_color: [color.r, color.g, color.b],
      },
      target: {
        entity_id: entity,
      },
    };
    return this.hass.callService(service);
  }
}
