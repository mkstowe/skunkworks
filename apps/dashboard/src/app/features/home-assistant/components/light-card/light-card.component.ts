import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entity, HassEntity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';
import { ProgressBarComponent } from '../../../../common/components/progress-bar/progress-bar.component';
import { IconComponent } from '../../../../common/components/icon/icon.component';

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
  public brightness = 35;
  public active = false;

  constructor(private hassService: HassService) {}

  public ngOnInit(): void {
    this.hassService.getEntity(this.entityId).subscribe((res: HassEntity) => {
      this.entity = res;
      console.log(this.entity);
    });
  }

  public toggleState() {
    return;
  }

  public onBrightnessChange(value: number) {
    this.brightness = value;
  }
}
