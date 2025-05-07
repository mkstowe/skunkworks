import { inject, Injectable } from '@angular/core';
import { ServiceCall } from '../models/ServiceCall';
import { HassService } from './hass.service';

@Injectable({
  providedIn: 'root',
})
export class ThermostatService {
  private readonly hass = inject(HassService);

  public changeTemperature(entity: string, value: number) {
    const service: ServiceCall = {
      domain: 'climate',
      service: 'set_temperature',
      service_data: {
        temperature: value,
      },
      target: {
        entity_id: entity,
      },
    };
    return this.hass.callService(service);
  }
}
