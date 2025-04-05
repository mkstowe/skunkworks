import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { HassEntity } from '../models/Entity';
import { ServiceCall } from '../models/ServiceCall';
import { HassService } from './hass.service';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor(private hassService: HassService) {}

  public get activeStates() {
    return ['Paused', 'Preparing', 'Running', 'Slicing'];
  }

  public get stateMap(): Record<string, string> {
    return {
      failed: 'Failed',
      finish: 'Finished',
      idle: 'Idle',
      init: 'Initializing',
      offline: 'Offline',
      pause: 'Paused',
      prepare: 'Preparing',
      running: 'Printing',
      slicing: 'Slicing',
      unknown: 'Unknown',
    };
  }

  public get stageMap(): Record<string, string> {
    return {
      sweeping_xy_mech_mode: 'Sweeping axes',
      cleaning_nozzle_tip: 'Cleaning nozzle',
      printing: 'Printing',
      auto_bed_leveling: 'Auto bed leveling',
      heating_hotend: 'Heating hotend',
      heatbed_preheating: 'Heating bed',
      cooling_chamber: 'Cooling chamber',
      homing_toolhead: 'Homing toolhead',
      filament_loading: 'Loading filament',
      filament_unloading: 'Unloading filament',
      scanning_bed_surface: 'Scanning bed',
      identifying_build_plate_type: 'Identifying build plate',
      paused_user: 'Paused by user',
      idle: 'Idle',
      offline: 'Offline',
      unknown: 'Unknown stage',
    };
  }

  public isActive(state?: string): boolean {
    if (!state) return false;
    return (
      this.activeStates.includes(state) ||
      this.activeStates.includes(this.stateMap[state])
    );
  }

  public getState(state: string): string {
    return this.stateMap[state] ?? state;
  }

  public getStage(stage: string): string {
    return this.stageMap[stage] ?? 'Unknown';
  }

  public getPrinterDetails() {
    return this.hassService.entities$.pipe(
      map((entities: any) => {
        const details: PrinterDetails = {
          printStatus: this.getState(
            entities['sensor.bambu_print_status']?.state
          ),
          stage: this.getStage(entities['sensor.bambu_current_stage']?.state),
          bedTemp: entities['sensor.bambu_bed_temperature']?.state,
          bedTarget: entities['sensor.bambu_target_bed_temperature']?.state,
          nozzleTemp: entities['sensor.bambu_nozzle_temperature']?.state,
          nozzleTarget:
            entities['sensor.bambu_nozzle_target_temperature']?.state,
          light: entities['light.bambu_chamber_light'],
          currLayer: entities['sensor.bambu_current_layer']?.state,
          totalLayers: entities['sensor.bambu_total_layer_count']?.state,
          startTime: entities['sensor.bambu_start_time']?.state,
          endTime: entities['sensor.bambu_end_time']?.state,
          remainingTime: entities['sensor.bambu_remaining_time']?.state,
          fileName: entities['sensor.bambu_gcode_filename']?.state,
          printProgress: entities['sensor.bambu_print_progress']?.state,
          error: entities['binary_sensor.bambu_print_error']?.state === 'on',
        };
        return details;
      })
    );
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

export interface PrinterDetails {
  printStatus?: string;
  stage?: string;
  bedTemp?: string;
  bedTarget?: string;
  nozzleTemp?: string;
  nozzleTarget?: string;
  light?: HassEntity;
  printImage?: any;
  currLayer?: number;
  totalLayers?: number;
  printProgress?: number; // 0-100%
  remainingTime?: number; // in minutes
  startTime?: Date;
  endTime?: Date;
  fileName?: string;
  error?: boolean;
}
