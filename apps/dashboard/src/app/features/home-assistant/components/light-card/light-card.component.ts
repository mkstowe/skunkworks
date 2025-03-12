import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { delay, Subject, switchMap } from 'rxjs';
import { IconComponent } from '../../../../common/components/icon/icon.component';
import { ProgressBarComponent } from '../../../../common/components/progress-bar/progress-bar.component';
import { HassEntity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-light-card',
  imports: [CommonModule, ProgressBarComponent, IconComponent],
  templateUrl: './light-card.component.html',
  styleUrl: './light-card.component.scss',
})
export class LightCardComponent implements OnInit {
  @Input() entityId!: string;
  @Input() name?: string;
  @Input() icon?: string;
  @Input() size?: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  public entity?: HassEntity;
  public brightness: number | null = null;
  public active = false;
  public valueChangeSubject$ = new Subject();

  constructor(
    private hassService: HassService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.hassService.refetch$
      .pipe(
        switchMap(() => {
          return this.hassService.entities;
        })
      )
      .subscribe((res: any) => {
        this.entity = res[this.entityId];
        this.brightness =
          (this.entity?.attributes['brightness'] as number) || 0;
        this.active = this.entity?.state === 'on';
      });
  }

  public toggleState() {
    this.hassService
      .toggleState('light', this.entityId)
      .pipe(
        delay(1550)
        // tap(() => this.hassService.refresh())
      )
      .subscribe(() => {
        this.valueChangeSubject$.next(null);
        this.cd.detectChanges();
      });
  }

  public onBrightnessChange(value: number) {
    this.hassService
      .callService({
        domain: 'light',
        service: 'turn_on',
        service_data: {
          brightness: value,
        },
        target: {
          entity_id: this.entityId,
        },
      })
      .pipe
      // delay(1250),
      // tap(() => this.hassService.refresh())
      ()
      .subscribe(() => {
        this.brightness = value;
        this.valueChangeSubject$.next(null);
        this.cd.detectChanges();
      });
  }

  public valueAsPercentage(value: number) {
    return Math.round((value / 255) * 100);
  }

  public round(value: number) {
    return Math.round(value);
  }
}
