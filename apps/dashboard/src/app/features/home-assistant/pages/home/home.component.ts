import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { dripLightbulb } from '@ng-icons/dripicons';
import { LightCardComponent } from '../../components/light-card/light-card.component';
import { SwitchCardComponent } from '../../components/switch-card/switch-card.component';
import { Entity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';
import { SpeakerCardComponent } from '../../components/speaker-card/speaker-card.component';
import { bootstrapSpeaker } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    LightCardComponent,
    SwitchCardComponent,
    SpeakerCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public entities: Entity[] = [];
  public dripLightbulb = dripLightbulb;
  public bootstrapSpeaker = bootstrapSpeaker;

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    return;
  }
}
