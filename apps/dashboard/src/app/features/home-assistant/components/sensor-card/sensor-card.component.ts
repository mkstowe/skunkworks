import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sensor-card',
  imports: [CommonModule],
  templateUrl: './sensor-card.component.html',
  styleUrl: './sensor-card.component.scss',
})
export class SensorCardComponent {
  // TODO: Current reading
  // TODO: Min/Max for day
  // TODO: Graph (hour, day, week)
  // TODO: Icons based on threshold
}
