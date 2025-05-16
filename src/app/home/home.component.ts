import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../api.service';
import { Queue, EndevorFile, ZmailService } from '../model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  selectedSection: string = 'mq';
  isDarkTheme: boolean = true;
  searchTerm: string = '';
  endevorSearchTerm: string = '';         // ← Nouveau champ
  lastUpdate: Date = new Date();

  user = { name: 'Analyste Mainframe' };

  queues: Queue[] = [];
  endevorFiles: EndevorFile[] = [];
  zmailServices: ZmailService[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getQueues().subscribe({
      next: data => this.queues = data,
      error: err => console.error('Erreur chargement queues', err)
    });
    this.apiService.getEndevorFiles().subscribe({
      next: data => this.endevorFiles = data,
      error: err => console.error('Erreur chargement endevor', err)
    });
    this.apiService.getZmailServices().subscribe({
      next: data => this.zmailServices = data,
      error: err => console.error('Erreur chargement zmail', err)
    });
  }

  /** Filtrage des queues */
  get filteredQueues(): Queue[] {
    return this.queues.filter(q =>
      q.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  /** Filtrage des fichiers Endevor */
  get filteredEndevorFiles(): EndevorFile[] {
    const term = this.endevorSearchTerm.toLowerCase();
    return this.endevorFiles.filter(f =>
      f.file_name.toLowerCase().includes(term) ||
      f.environment.toLowerCase().includes(term) ||
      f.machine.toLowerCase().includes(term)
    );
  }

  get totalMessages(): number {
    return this.queues.reduce((sum, q) => sum + q.messages, 0);
  }

  getBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'ok': return 'success';
      case 'warning': return 'warning';
      case 'critical': case 'alert': return 'alert';
      default: return '';
    }
  }

  showSection(section: string): void {
    this.selectedSection = section;
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('light-theme', !this.isDarkTheme);
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }

  refreshData(): void {
    this.lastUpdate = new Date();
    this.loadData();
  }

  deleteFile(id: number): void {
    this.apiService.deleteEndevorFile(id).subscribe(() => this.loadData());
  }
}
