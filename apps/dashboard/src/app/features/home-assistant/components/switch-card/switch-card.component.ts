import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HassEntity } from 'home-assistant-js-websocket';
import { Subject } from 'rxjs';
import { sizes } from '../../../../common/models/Sizes';
import { ServiceCall } from '../../models/ServiceCall';
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-switch-card',
  imports: [CommonModule],
  templateUrl: './switch-card.component.html',
  styleUrl: './switch-card.component.scss',
})
export class SwitchCardComponent implements OnInit {
  @Input() entityId!: string;
  @Input() name?: string;
  @Input() icon?: string;
  @Input() size?: sizes = 'md';
  public entity?: HassEntity;
  public active = false;
  public valueChangeSubject$ = new Subject<void>();

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    this.hassService.entities$.subscribe((res: any) => {
      this.entity = res[this.entityId];
      this.active = this.entity?.state === 'on';
    });
  }

  public toggleState() {
    const service: ServiceCall = {
      service: 'toggle',
      target: {
        entity_id: this.entity?.entity_id,
      },
    };
    this.hassService.callService(service).subscribe();
  }
}
