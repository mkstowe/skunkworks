import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Subject } from 'rxjs';
import { sizes } from '../../../../common/models/Sizes';
import { ServiceCall } from '../../models/ServiceCall';
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-switch-card',
  imports: [CommonModule, NgIcon],
  templateUrl: './switch-card.component.html',
  styleUrl: './switch-card.component.scss',
})
export class SwitchCardComponent {
  private readonly hass = inject(HassService);

  @Input() entityId!: string;
  @Input() name?: string;
  @Input() icon?: string;
  @Input() size?: sizes = 'md';

  public entity = this.hass.entitySignal(this.entityId);
  public active = computed(() => this.hass.isActive(this.entity()));

  public valueChangeSubject$ = new Subject<void>();

  public toggleState() {
    const service: ServiceCall = {
      service: 'toggle',
      target: {
        entity_id: this.entity()?.entity_id,
      },
    };
    this.hass.callService(service).subscribe();
  }
}
