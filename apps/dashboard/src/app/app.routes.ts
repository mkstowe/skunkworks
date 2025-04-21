import { Route } from '@angular/router';
import { LoginComponent } from './common/components/login/login.component';
import { authGuard } from './common/guards/auth.guard';
import { DevicesComponent } from './features/home-assistant/pages/home/devices/devices.component';
import { HomeComponent } from './features/home-assistant/pages/home/home.component';
import { OverviewComponent } from './features/home-assistant/pages/home/overview/overview.component';
import { ScriptsComponent } from './features/home-assistant/pages/home/scripts/scripts.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [authGuard],
      },
      {
        path: 'devices',
        component: DevicesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'scripts',
        component: ScriptsComponent,
        canActivate: [authGuard],
      },
    ],
  },
  //   { path: 'music' },
  //   { path: 'recipes' },
];
