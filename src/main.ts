import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // 👈 ajout du HTTP
import { HomeComponent } from './app/home/home.component';

bootstrapApplication(HomeComponent, {
  providers: [provideHttpClient()] // 👈 ajoute ce provider ici
}).catch(err => console.error(err));
