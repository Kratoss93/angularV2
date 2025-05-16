import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MqseriesComponent } from './mqseries/mqseries.component';
import { EndevorComponent } from './endevor/endevor.component';
import { ZmailComponent } from './zmail/zmail.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'mqseries', component: MqseriesComponent },
  { path: 'endevor', component: EndevorComponent },
  { path: 'zmail', component: ZmailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
