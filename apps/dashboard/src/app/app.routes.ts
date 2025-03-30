import { Route } from '@angular/router';
import { BedroomComponent } from './features/home-assistant/pages/home/bedroom/bedroom.component';
import { HomeComponent } from './features/home-assistant/pages/home/home.component';
import { KitchenComponent } from './features/home-assistant/pages/home/kitchen/kitchen.component';
import { LivingRoomComponent } from './features/home-assistant/pages/home/living-room/living-room.component';
import { OfficeComponent } from './features/home-assistant/pages/home/office/office.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'living-room', pathMatch: 'full' },
      { path: 'living-room', component: LivingRoomComponent },
      { path: 'office', component: OfficeComponent },
      { path: 'kitchen', component: KitchenComponent },
      { path: 'bedroom', component: BedroomComponent },
    ],
  },
  //   { path: 'music' },
  //   { path: 'recipes' },
];
