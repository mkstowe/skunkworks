import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  Signal,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HassEntity } from '../../models/Entity';
import { RoomAction } from '../../models/RoomAction';
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-room-card',
  imports: [CommonModule, NgIcon, DecimalPipe],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent implements OnInit {
  private readonly hass = inject(HassService);

  @Input() title!: string;
  @Input() roomName!: string;
  @Input() icon?: string;
  @Input() color?: string;
  @Input() temperatureEntityId?: string;
  @Input() humidityEntityId?: string;
  @Input() occupiedEntityId?: string;
  @Input() actions: RoomAction[] = [];

  public temperatureEntity: Signal<HassEntity | null> | null = null;
  public humidityEntity: Signal<HassEntity | null> | null = null;
  public occupiedEntity: Signal<HassEntity | null> | null = null;

  public temperature = computed(() => {
    const e = this.temperatureEntity?.();
    if (!e) return null;

    if (e.entity_id.startsWith('climate')) {
      return e.attributes?.['current_temperature'] as string;
    }
    return e.state;
  });

  public humidity = computed(() => {
    const e = this.humidityEntity?.();
    if (!e) return null;

    if (e.entity_id.startsWith('climate')) {
      return e.attributes?.['current_humidity'] as string;
    }
    return e.state;
  });

  public occupied = computed(() => {
    const e = this.occupiedEntity?.();
    return e ? this.hass.isActive(e) : false;
  });

  public actionStates: Record<string, Signal<HassEntity | null>> = {};

  ngOnInit(): void {
    if (this.temperatureEntityId) {
      this.temperatureEntity = this.hass.entitySignal(this.temperatureEntityId);
    }
    if (this.humidityEntityId) {
      this.humidityEntity = this.hass.entitySignal(this.humidityEntityId);
    }
    if (this.occupiedEntityId) {
      this.occupiedEntity = this.hass.entitySignal(this.occupiedEntityId);
    }

    this.actions.forEach((action) => {
      if (action.entityId) {
        this.actionStates[action.entityId] = this.hass.entitySignal(
          action.entityId
        );
      }
    });
  }

  public callAction(action: RoomAction): void {
    const entity = this.actionStates[action.entityId]();
    if (!entity) return;
    const svc = action.getService ? action.getService(entity) : action.service;
    if (svc) {
      this.hass.callService(svc).subscribe();
    }
  }

  public getIcon(action: RoomAction): string {
    const entity = this.actionStates[action.entityId]();
    if (!entity) return action.icon ?? 'question';
    return action.getIcon ? action.getIcon(entity) : action.icon ?? 'question';
  }

  public getActionButtonClass(action: RoomAction): string {
    const entity = this.actionStates[action.entityId]();
    const active = entity && action.isActive?.(entity);
    return active
      ? action.activeColor ?? 'text-amber-400'
      : action.inactiveColor ?? 'text-zinc-600';
  }

  // TODO: Scenes
  // TODO: More - show device list
}
