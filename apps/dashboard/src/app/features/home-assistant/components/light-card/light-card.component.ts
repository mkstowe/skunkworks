import { Component, computed, inject, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Subject } from 'rxjs';
import { ProgressBarComponent } from '../../../../common/components/progress-bar/progress-bar.component';
import { HassService } from '../../services/hass.service';
import { LightDetailComponent } from '../light-detail/light-detail.component';

@Component({
  selector: 'app-light-card',
  imports: [NgIcon, ProgressBarComponent, LightDetailComponent],
  templateUrl: './light-card.component.html',
  styleUrls: ['./light-card.component.scss'],
})
export class LightCardComponent {
  private readonly hass = inject(HassService);

  @Input() entityId!: string;
  @Input() icon?: string;
  @Input() name?: string;
  @Input() numDots = 10;

  public openDetailSubject$ = new Subject<void>();

  public entity = this.hass.entitySignal(this.entityId);

  public active = computed(() => this.entity()?.state === 'on');
  public brightness = computed(
    () => (this.entity()?.attributes['brightness'] as number) ?? 0
  );
  public brightnessProgress = computed(() =>
    Math.round((this.brightness() / 255) * this.numDots)
  );

  // ngOnInit() {
  //   this.hass.getEntity$(this.entityId).subscribe((ent) => {
  //     this.entity.set(ent);
  //   });
  // }

  toggleState() {
    const current = this.entity();
    if (!current) return;

    this.hass
      .callService({
        domain: 'light',
        service: current.state === 'on' ? 'turn_off' : 'turn_on',
        target: { entity_id: this.entityId },
      })
      .subscribe();
  }

  onBrightnessChange(value: number) {
    this.hass
      .callService({
        domain: 'light',
        service: 'turn_on',
        service_data: {
          brightness: Math.round((value / this.numDots) * 255),
        },
        target: { entity_id: this.entityId },
      })
      .subscribe();
  }

  openDetail() {
    this.openDetailSubject$.next();
  }

  valueAsPercentage(value: number) {
    return Math.round((value / 255) * 100);
  }
}
