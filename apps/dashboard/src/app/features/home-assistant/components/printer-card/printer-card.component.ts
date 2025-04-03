import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HassEntity } from 'home-assistant-js-websocket';
import { HassService } from '../../services/hass.service';
import { PrinterService } from '../../services/printer.service';

@Component({
  selector: 'app-printer-card',
  imports: [CommonModule],
  templateUrl: './printer-card.component.html',
  styleUrl: './printer-card.component.scss',
})
export class PrinterCardComponent implements OnInit {
  @Input() entityId = 'sensor.bambu_print_status';
  public active = false;
  public printStatus?: string;
  public bedTemp?: string;
  public nozzleTemp?: string;
  public light?: HassEntity;
  public printImage?: any;
  public currLayer?: number;
  public totalLayers?: number;
  public printProgress?: number; // 0-100%
  public remainingTime?: number; // in minutes
  public startTime?: Date;
  public endTime?: Date;
  public fileName?: string;
  public error?: boolean;

  constructor(
    private hassService: HassService,
    private printerService: PrinterService
  ) {}

  ngOnInit(): void {
    this.hassService.entities$.subscribe((entities: any) => {
      this.printStatus = entities['sensor.bambu_print_status'].state;
      this.bedTemp = entities['sensor.bambu_bed_temperature'].state;
      this.nozzleTemp = entities['sensor.bambu_nozzle_temperature'].state;
      this.light = entities['light.bambu_chamber_light'];
      // this.printImage = entities['image.bambu_cover_image'].attributes['entity_picture'];
      this.currLayer = entities['sensor.bambu_current_layer'].state;
      this.totalLayers = entities['sensor.bambu_total_layer_count'].state;
      this.startTime = entities['sensor.bambu_start_time'].state;
      this.endTime = entities['sensor.bambu_end_time'].state;
      this.fileName = entities['sensor.bambu_gcode_filename'].state;
      this.printProgress = entities['sensor.bambu_print_progress'].state;
      this.remainingTime = entities['sensor.bambu_remaining_time'].state;
      this.error = entities['binary_sensor.bambu_print_error'].state === 'on';

      this.active = this.printerService.activeStates.includes(
        this.printStatus ?? ''
      );
    });
  }

  public toggleState() {
    if (!this.active) return;
    if (this.printStatus === 'running') {
      this.printerService.pausePrint();
    } else {
      this.printerService.resumePrint();
    }
  }

  public stopPrint() {
    this.printerService.stopPrint();
  }
}
