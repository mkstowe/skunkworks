import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './common/components/layout/navbar/navbar.component';

@Component({
  imports: [RouterModule, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dashboard';
}
