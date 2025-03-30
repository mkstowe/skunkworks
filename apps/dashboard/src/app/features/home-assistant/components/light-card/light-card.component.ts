import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { delay, Subject, take } from 'rxjs';
import { ProgressBarComponent } from '../../../../common/components/progress-bar/progress-bar.component';
import { HassEntity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';
import { LightService } from '../../services/light.service';
import { LightDetailComponent } from '../light-detail/light-detail.component';

@Component({
  selector: 'app-light-card',
  imports: [CommonModule, ProgressBarComponent, LightDetailComponent, NgIcon],
  templateUrl: './light-card.component.html',
  styleUrl: './light-card.component.scss',
})
export class LightCardComponent implements OnInit {
  @Input() entityId!: string;
  @Input() name?: string;
  @Input() icon?: string;
  public entity?: HassEntity;
  public brightness: number | null = null;
  public active = false;
  public openDetailSubject$ = new Subject<void>();
  public brightnessProgress = 0;
  public numDots = 20;

  constructor(
    private hassService: HassService,
    private lightService: LightService
  ) {}

  public ngOnInit(): void {
    this.hassService.entities$.subscribe((res: any) => {
      this.entity = res[this.entityId];
      this.brightness = (this.entity?.attributes['brightness'] as number) ?? 0;
      this.brightnessProgress = Math.round(
        (this.brightness / 255) * this.numDots
      );
      this.active = this.entity?.state === 'on';
    });
  }

  public toggleState() {
    this.lightService
      .toggleState(this.entityId)
      .pipe(delay(1550), take(1))
      .subscribe();
  }

  public onBrightnessChange(value: number) {
    const newBrightness = value * 255;
    this.lightService
      .changeBrightness(this.entityId, newBrightness)
      .pipe(delay(1550), take(1))
      .subscribe();
  }

  public openDetail() {
    this.openDetailSubject$.next();
  }

  public valueAsPercentage(value: number) {
    // Min: 0
    // Max: 255
    return Math.round((value / 255) * 100);
  }

  public round(value: number) {
    return Math.round(value);
  }
}
