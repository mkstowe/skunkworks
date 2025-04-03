import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { ServiceCall } from '../models/ServiceCall';
import { HassService } from './hass.service';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor(private hassService: HassService) {}

  public get activeStates() {
    return ['pause', 'prepare', 'running', 'slicing'];
  }

  public resumePrint() {
    const service: ServiceCall = {
      domain: 'button',
      service: 'press',
      target: {
        entity_id: 'button.bambu_resume_printing',
      },
    };
    this.hassService.callService(service).pipe(take(1)).subscribe();
  }

  public pausePrint() {
    const service: ServiceCall = {
      domain: 'button',
      service: 'press',
      target: {
        entity_id: 'button.bambu_pause_printing',
      },
    };
    this.hassService.callService(service).pipe(take(1)).subscribe();
  }

  public stopPrint() {
    const service: ServiceCall = {
      domain: 'button',
      service: 'press',
      target: {
        entity_id: 'button.bambu_stop_printing',
      },
    };
    this.hassService.callService(service).pipe(take(1)).subscribe();
  }
}
