import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThermostatCardComponent } from '../../../components/thermostat-card/thermostat-card.component';
import { SpeakerCardComponent } from '../../../components/speaker-card/speaker-card.component';
import { LightCardComponent } from '../../../components/light-card/light-card.component';
import { SwitchCardComponent } from '../../../components/switch-card/switch-card.component';

@Component({
  selector: 'app-living-room',
  imports: [CommonModule, ThermostatCardComponent, SpeakerCardComponent, LightCardComponent, SwitchCardComponent],
  templateUrl: './living-room.component.html',
  styleUrl: './living-room.component.scss',
})
export class LivingRoomComponent {}
