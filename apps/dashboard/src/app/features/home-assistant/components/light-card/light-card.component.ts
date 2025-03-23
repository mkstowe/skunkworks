import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { delay, Subject } from 'rxjs';
import { ProgressBarComponent } from '../../../../common/components/progress-bar/progress-bar.component';
import { sizes } from '../../../../common/models/Sizes';
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
  @Input() size?: sizes = 'md';
  public entity?: HassEntity;
  public brightness: number | null = null;
  public active = false;
  public valueChangeSubject$ = new Subject<void>();
  public openDetailSubject$ = new Subject<void>();

  constructor(
    private hassService: HassService,
    private lightService: LightService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.hassService.entities$.subscribe((res: any) => {
      this.entity = res[this.entityId];
      this.brightness = (this.entity?.attributes['brightness'] as number) || 0;
      this.active = this.entity?.state === 'on';
    });
  }

  public toggleState() {
    this.lightService
      .toggleState(this.entityId)
      .pipe(delay(1550))
      .subscribe(() => {
        this.valueChangeSubject$.next();
        this.cd.detectChanges();
      });
  }

  public onBrightnessChange(value: number) {
    this.lightService
      .changeBrightness(this.entityId, value)
      .pipe(delay(1550))
      .subscribe(() => {
        this.brightness = value;
        this.valueChangeSubject$.next();
        this.cd.detectChanges();
      });
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
