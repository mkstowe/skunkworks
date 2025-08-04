import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RoomCardComponent } from '../../../components/room-card/room-card.component';
import { RoomConfig } from '../../../models/RoomConfig';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-living-room',
  imports: [CommonModule, RoomCardComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  private roomService = inject(RoomService);

  public roomConfigs: RoomConfig[] = [];

  ngOnInit(): void {
    this.roomConfigs = [
      {
        title: 'Office',
        icon: 'computer',
        color: 'bg-palette-1 text-dark',
        roomName: 'office',
        temperatureEntityId: 'climate.thermostat',
        humidityEntityId: 'climate.thermostat',
        actions: [
          this.roomService.createLightToggleAction('light.office'),
          this.roomService.createMediaToggleAction(
            'media_player.office_speaker',
            'https://open.spotify.com/playlist/4vNldb5p8tQ9RmX7XSaTIM'
          ),
        ],
      },
      {
        title: 'Living Room',
        roomName: 'living_room',
        icon: 'couch',
        color: 'bg-palette-2 text-dark',
        temperatureEntityId: 'climate.thermostat',
        humidityEntityId: 'climate.thermostat',
        occupiedEntityId: '',
        actions: [
          this.roomService.createLightToggleAction('light.living_room'),
        ],
      },
      {
        title: 'Bedroom',
        roomName: 'bedroom',
        icon: 'bed',
        color: 'bg-palette-3 text-dark',
        temperatureEntityId: 'sensor.bedroom_temperature',
        humidityEntityId: '',
        occupiedEntityId: 'binary_sensor.bedroom_occupancy',
        actions: [this.roomService.createLightToggleAction('light.bedroom')],
      },
      {
        title: 'Workshop',
        roomName: 'workshop',
        icon: 'pencilRuler',
        color: 'bg-palette-4 text-dark',
        temperatureEntityId: '',
        humidityEntityId: '',
        occupiedEntityId: '',
        actions: [],
      },
      {
        title: 'Kitchen',
        roomName: 'kitchen',
        icon: 'knife',
        color: 'bg-palette-5 text-dark',
        temperatureEntityId: '',
        humidityEntityId: '',
        occupiedEntityId: '',
        actions: [
          this.roomService.createLockToggleAction('lock.side_door_lock'),
        ],
      },
      {
        title: 'Dining Room',
        roomName: 'dining_room',
        icon: 'forkKnife',
        color: 'bg-palette-6 text-dark',
        temperatureEntityId: 'climate.thermostat',
        humidityEntityId: 'climate.thermostat',
        occupiedEntityId: 'binary_sensor.dining_room_occupied',
        actions: [],
      },
      {
        title: 'Bathroom',
        roomName: 'bathroom',
        icon: 'toiletPaper',
        color: 'bg-palette-7 text-dark',
        temperatureEntityId: '',
        humidityEntityId: '',
        occupiedEntityId: '',
        actions: [],
      },
      {
        title: 'Garage',
        roomName: 'garage',
        icon: 'car',
        color: 'bg-palette-8 text-dark',
        temperatureEntityId: '',
        humidityEntityId: '',
        occupiedEntityId: '',
        actions: [this.roomService.createLightToggleAction('light.garage')],
      },
    ];
  }
}
