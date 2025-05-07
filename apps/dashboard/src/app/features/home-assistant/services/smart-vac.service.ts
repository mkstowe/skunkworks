import { inject, Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { ServiceCall } from '../models/ServiceCall';
import { HassService } from './hass.service';

@Injectable({
  providedIn: 'root',
})
export class SmartVacService {
  private readonly hass = inject(HassService);

  public get activeStates() {
    return ['cleaning', 'docked', 'returning'];
  }

  public isActive(state?: string): boolean {
    if (!state) return false;
    return this.activeStates.includes(state);
  }

  public getVacuumDetails(vacName: string) {
    return this.hass.entities$.pipe(
      map((entities: any) => {
        const details: VacuumDetails = {
          name: vacName,
          state: entities[`vacuum.${vacName}`]?.state,
          totalMissions: entities[`sensor.${vacName}_total_missions`]?.state,
          totalCleaningTime:
            entities[`sensor.${vacName}_total_cleaning_time`]?.state,
          totalCleanedArea:
            entities[`sensor.${vacName}_total_cleaned_area`]?.state,
          successfulMissions:
            entities[`sensor.${vacName}_successful_missions`]?.state,
          failedMissions: entities[`sensor.${vacName}_failed_missions`]?.state,
          canceledMissions:
            entities[`sensor.${vacName}_canceled_missions`]?.state,
          battery: entities[`sensor.${vacName}_battery`]?.state,
          averageMissionsTime:
            entities[`sensor.${vacName}_average_missions_time`]?.state,
          binFull:
            entities[`binary_sensor.${vacName}_bin_full`]?.state === 'on',
        };
        return details;
      })
    );
  }

  public startCleaning(vacName: string) {
    const service: ServiceCall = {
      domain: 'vacuum',
      service: 'start',
      target: {
        entity_id: `vacuum.${vacName}`,
      },
    };
    this.hass.callService(service).pipe(take(1)).subscribe();
  }

  public pauseCleaning(vacName: string) {
    const service: ServiceCall = {
      domain: 'vacuum',
      service: 'pause',
      target: {
        entity_id: `vacuum.${vacName}`,
      },
    };
    this.hass.callService(service).pipe(take(1)).subscribe();
  }

  public stopCleaning(vacName: string) {
    const service: ServiceCall = {
      domain: 'vacuum',
      service: 'stop',
      target: {
        entity_id: `vacuum.${vacName}`,
      },
    };
    this.hass.callService(service).pipe(take(1)).subscribe();
  }

  public dock(vacName: string) {
    const service: ServiceCall = {
      domain: 'vacuum',
      service: 'return_to_base',
      target: {
        entity_id: `vacuum.${vacName}`,
      },
    };
    this.hass.callService(service).pipe(take(1)).subscribe();
  }

  public locate(vacName: string) {
    const service: ServiceCall = {
      domain: 'vacuum',
      service: 'locate',
      target: {
        entity_id: `vacuum.${vacName}`,
      },
    };
    this.hass.callService(service).pipe(take(1)).subscribe();
  }
}

export interface VacuumDetails {
  name?: string;
  state?: string;
  totalMissions?: number;
  totalCleaningTime?: number;
  totalCleanedArea?: number;
  successfulMissions?: number;
  failedMissions?: number;
  canceledMissions?: number;
  battery?: number; // 0-100
  averageMissionsTime?: number; // in minutes
  binFull?: boolean;
}
