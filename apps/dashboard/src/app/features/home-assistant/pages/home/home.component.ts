import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LightCardComponent } from '../../components/light-card/light-card.component';
import { SwitchCardComponent } from '../../components/switch-card/switch-card.component';
import { Entity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LightCardComponent, SwitchCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public entities: Entity[] = [];

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    return;
  }
}
