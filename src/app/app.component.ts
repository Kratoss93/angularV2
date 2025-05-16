import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // 👈 ICI

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // 👈 ICI aussi
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'monitoring';
}
