import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DatetimeComponent } from '../../../../../common/components/datetime/datetime.component';
import { LightCardComponent } from '../../../components/light-card/light-card.component';
import { RoomCardComponent } from '../../../components/room-card/room-card.component';
import { ThermostatCardComponent } from '../../../components/thermostat-card/thermostat-card.component';
import { RoomConfig } from '../../../models/RoomConfig';
import { HassService } from '../../../services/hass.service';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-living-room',
  imports: [
    CommonModule,
    ThermostatCardComponent,
    LightCardComponent,
    RoomCardComponent,
    DatetimeComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  public roomConfigs: RoomConfig[] = [];

  constructor(
    private hassService: HassService,
    private roomService: RoomService
  ) {}

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
        actions: [],
      },
      {
        title: 'Bedroom',
        roomName: 'bedroom',
        icon: 'bed',
        color: 'bg-palette-3 text-dark',
        temperatureEntityId: 'sensor.bedroom_temperature',
        humidityEntityId: '',
        occupiedEntityId: 'binary_sensor.bedroom_occupancy',
        actions: [],
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
        actions: [],
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
    ];
  }
}
