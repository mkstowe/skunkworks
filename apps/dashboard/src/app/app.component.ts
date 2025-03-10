import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './common/components/layout/navbar/navbar.component';
import { HassService } from './features/home-assistant/services/hass.service';

@Component({
  imports: [RouterModule, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'dashboard';

  constructor(private hassService: HassService) {}

  ngOnInit(): void {
    // this.hassService.entities.subscribe((data) => {
    //   console.log('Received entity update:', data);
    // })

    // this.hassService.callService({
    //   type: 'call_service',
    //   domain: 'light',
    //   service: 'toggle',
    //   target: {
    //     entity_id: 'light.office'
    //   }
    // }).subscribe();

    this.hassService
      .getEntity('light.office')
      .subscribe((res) => console.log(res));
  }
}
