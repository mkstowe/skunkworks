import { Route } from '@angular/router';
import { HomeComponent } from './features/home-assistant/pages/home/home.component';
import { OverviewComponent } from './features/home-assistant/pages/home/overview/overview.component';
import { DevicesComponent } from './features/home-assistant/pages/home/devices/devices.component';
import { ScriptsComponent } from './features/home-assistant/pages/home/scripts/scripts.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'scripts', component: ScriptsComponent },
    ],
  },
  //   { path: 'music' },
  //   { path: 'recipes' },
];
