import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Entity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
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
