import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './common/components/layout/navbar/navbar.component';
import { AuthService } from './common/services/auth.service';
import { DatetimeComponent } from './common/components/datetime/datetime.component';

@Component({
  imports: [RouterModule, NavbarComponent, AsyncPipe, DatetimeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public loggedIn$;
  title = 'dashboard';

  constructor(private auth: AuthService) {
    this.loggedIn$ = auth.loggedIn$;
  }
}
