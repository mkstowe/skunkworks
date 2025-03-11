import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightCardComponent } from "../../components/light-card/light-card.component";
import { Entity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LightCardComponent],
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