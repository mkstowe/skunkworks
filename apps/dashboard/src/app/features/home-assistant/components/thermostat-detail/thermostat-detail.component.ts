import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { HassEntity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';
import { ThermostatService } from '../../services/thermostat.service';
import { CircularSliderComponent } from '../../../../common/components/circular-slider/circular-slider.component';

@Component({
  selector: 'app-thermostat-detail',
  imports: [CommonModule, CircularSliderComponent],
  templateUrl: './thermostat-detail.component.html',
  styleUrl: './thermostat-detail.component.scss',
})
export class ThermostatDetailComponent implements OnInit, OnChanges {
  @Input() openModalSubject$!: Subject<void>;
  @Input() entity!: HassEntity;
  public valueChangeSubject$ = new Subject<void>();
  public targetTemp?: number;
  public temp?: number;
  public mode?: string;
  public circleOpeningPercent = 30; // How big should opening be: ex 30 means circle is 70% full
  public circleRotateAngle = 180 + (this.circleOpeningPercent * 3.6) / 2; // This makes the opening straight down

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  constructor(
    private hassService: HassService,
    private thermostatService: ThermostatService
  ) {}

  ngOnInit(): void {
    this.openModalSubject$.subscribe(() => {
      this.modal.nativeElement.showModal();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entity'] && this.entity) {
      this.temp = (this.entity.attributes['temperature'] as number) ?? 0;
      if (!this.targetTemp) {
        this.targetTemp =
          (this.entity?.attributes['temperature'] as number) ?? 0;
      }
      this.mode = (this.entity.attributes['hvac_action'] as string) ?? '';
    }
  }
}
