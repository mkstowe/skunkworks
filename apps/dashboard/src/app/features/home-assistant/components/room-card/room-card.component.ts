import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HassEntity } from '../../models/Entity';
import { RoomAction } from '../../models/RoomAction';
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-room-card',
  imports: [CommonModule, NgIcon],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent implements OnInit {
  @Input() title!: string;
  @Input() roomName!: string;
  @Input() icon?: string;
  @Input() color?: string;
  @Input() temperatureEntityId?: string;
  @Input() humidityEntityId?: string;
  @Input() occupiedEntityId?: string;
  @Input() actions: RoomAction[] = [];

  public actionStates: Record<string, HassEntity | null> = {};
  public temperature?: string;
  public humidity?: string;
  public occupied?: boolean;

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    this.hassService.entities$.subscribe((entities: any) => {
      if (this.temperatureEntityId) {
        const temperatureEntity: HassEntity =
          entities[this.temperatureEntityId];
        if (temperatureEntity?.entity_id.split('.')[0] === 'climate') {
          this.temperature = temperatureEntity.attributes?.[
            'current_temperature'
          ] as string;
        } else {
          this.temperature = temperatureEntity?.state;
        }
      }
      if (this.humidityEntityId) {
        const humidityEntity = entities[this.humidityEntityId];
        if (humidityEntity?.entity_id.split('.')[0] === 'climate') {
          this.humidity = humidityEntity.attributes?.['current_humidity'];
        } else {
          this.humidity = humidityEntity?.state;
        }
      }
      if (this.occupiedEntityId) {
        const occupiedEntity = entities[this.occupiedEntityId];
        this.occupied = this.hassService.isActive(occupiedEntity);
      }
    });

    this.actions.forEach((action) => {
      if (action.entityId) {
        this.hassService.getEntity$(action.entityId).subscribe((entity) => {
          this.actionStates[action.entityId] = entity;
        });
      }
    });
  }

  public callAction(action: RoomAction): void {
    const entity = this.actionStates[action.entityId];
    if (!entity) return;
    const svc = action.getService ? action.getService(entity) : action.service;
    if (svc) {
      this.hassService.callService(svc).subscribe();
    }
  }

  public getIcon(action: RoomAction): string {
    const entity = this.actionStates[action.entityId];
    if (!entity) return action.icon ?? 'question';
    return action.getIcon ? action.getIcon(entity) : action.icon ?? 'question';
  }

  public getActionButtonClass(action: RoomAction): string {
    const entity = this.actionStates[action.entityId];
    const active = entity && action.isActive?.(entity);
    return active
      ? action.activeColor ?? 'text-amber-400'
      : action.inactiveColor ?? 'text-zinc-600';
  }

  // TODO: Scenes
  // TODO: More - show device list
}
