import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room-card',
  imports: [CommonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
  @Input() title!: string;
  @Input() roomName!: string;
  @Input() icon?: string;
  @Input() color?: string;
  @Input() actions?: any[];


  // TODO: Room name + icon
  // TODO: Temp + Humidity + Occupied
  // TODO: Toggle lights
  // TODO: Play music
  // TODO: Scenes
  // TODO: More - show device list
}
