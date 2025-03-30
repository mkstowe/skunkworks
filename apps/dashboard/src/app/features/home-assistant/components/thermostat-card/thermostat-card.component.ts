import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Subject, take } from 'rxjs';
import { HassEntity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';
import { ThermostatService } from '../../services/thermostat.service';
import { ThermostatDetailComponent } from '../thermostat-detail/thermostat-detail.component';

@Component({
  selector: 'app-thermostat-card',
  imports: [CommonModule, NgIcon, ThermostatDetailComponent],
  templateUrl: './thermostat-card.component.html',
  styleUrl: './thermostat-card.component.scss',
})
export class ThermostatCardComponent implements OnInit {
  @Input() entityId!: string;
  @Input() name?: string;
  public icon = 'thermometer';
  public entity?: HassEntity;
  public targetTemp?: number;
  public temp?: number;
  public mode = '';
  public openDetailSubject$ = new Subject<void>();

  constructor(
    private hassService: HassService,
    private thermostatService: ThermostatService
  ) {}

  ngOnInit(): void {
    this.hassService.entities$.subscribe((res: any) => {
      this.entity = res[this.entityId];
      this.temp =
        (this.entity?.attributes['current_temperature'] as number) ?? 0;
      if (!this.targetTemp) {
        this.targetTemp =
          (this.entity?.attributes['temperature'] as number) ?? 0;
      }
      this.mode = (this.entity?.attributes['hvac_action'] as string) ?? '';
    });
  }

  public onTemperatureChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    const numeric = Number(val.replace(/\D/g, ''));
    this.updateTemperature(numeric);
  }

  public onModeChange() {
    return;
  }

  public toggleFan() {
    return;
  }

  public activatePreset() {
    return;
  }

  public increment() {
    this.updateTemperature(this.targetTemp! + 1);
  }

  public decrement() {
    this.updateTemperature(this.targetTemp! - 1);
  }

  // Prevent non-numeric input
  public onKeyDown(e: KeyboardEvent) {
    const allowed = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    const isNumberKey = /^\d$/.test(e.key);
    if (!isNumberKey && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  }

  public openDetail() {
    this.openDetailSubject$.next();
  }

  private updateTemperature(value: number) {
    this.targetTemp = value;
    this.thermostatService
      .changeTemperature(this.entity!.entity_id, value)
      .pipe(take(1))
      .subscribe();
  }

  // TODO: Temp
  // TODO: Target temp
  // TODO: Mode toggle
  // TODO: Fan toggle
  // TODO: Scene
}
