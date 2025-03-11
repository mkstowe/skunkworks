import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightCardComponent } from "../../components/light-card/light-card.component";
import { Entity } from '../../models/Entity';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LightCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public test: Entity = {
    entityId: 'light.office',
    type: 'light',
    stateOptions: {

    },
    service: {
      service: 'toggle',
      target: {
        entity_id: 'light.office'
      }
    }
  }
}