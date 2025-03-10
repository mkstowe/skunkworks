import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';
import { ProgressBarComponent } from "../../../../common/components/progress-bar/progress-bar.component";

@Component({
  selector: 'app-light-card',
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './light-card.component.html',
  styleUrl: './light-card.component.scss',
})
export class LightCardComponent {
  @Input() entity!: Entity;
  public brightness = 35;

  constructor(private hassService: HassService) {}

  public toggleState() {
    return;
  }

  public onBrightnessChange(value: number) {
    this.brightness = value;
  }
}
