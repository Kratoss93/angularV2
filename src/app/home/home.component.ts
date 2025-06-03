import { Component, OnInit } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ApiService }       from '../api.service';
import { Queue, EndevorFile, ZmailService } from '../model';

@Component({
  selector: 'app-home',
  standalone:    true,
  imports:       [CommonModule, FormsModule, HttpClientModule],
  templateUrl:   './home.component.html',
  styleUrls:     ['./home.component.scss'],
  providers:     [ApiService]
})
export class HomeComponent implements OnInit {
  // onglets principaux
  selectedSection    = 'mq';

  // Endevor : sous‐onglets
  endevorTab         = 'occupation'; // occupation | reclassement | gestion

  // thème
  isDarkTheme        = true;

  // MQ
  searchTerm         = '';
  queues: Queue[]    = [];

  // ZMAIL
  zmailServices: ZmailService[] = [];

  // Endevor
  endevorFiles: EndevorFile[] = [];
  endevorSearchTerm = '';

  // logs de gestion Endevor (exemple ; à remplacer via API)
  gestionLogs = [
    { timestamp: new Date(), action: 'Suppression', file: 'FICHIER02' },
    { timestamp: new Date(), action: 'Archivage',   file: 'FICHIER01' }
  ];

  // métadonnées
  lastUpdate         = new Date();
  user = { name: 'Analyste Mainframe' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.api.getQueues().subscribe({ next: data => this.queues = data });
    this.api.getZmailServices().subscribe({ next: data => this.zmailServices = data });
    this.api.getEndevorFiles().subscribe({ next: data => this.endevorFiles = data });
  }

  // navigation & thème
  showSection(sec: string) {
    this.selectedSection = sec;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('light-theme', !this.isDarkTheme);
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }

  refreshData() {
    this.lastUpdate = new Date();
    this.loadData();
  }

  // === MQ helpers ===
  get filteredQueues(): Queue[] {
    const t = this.searchTerm.toLowerCase();
    return this.queues.filter(q => q.name.toLowerCase().includes(t));
  }

  get totalMessages(): number {
    return this.queues.reduce((sum, q) => sum + q.messages, 0);
  }

  // === Endevor helpers ===
  get filteredEndevorFiles(): EndevorFile[] {
    const t = this.endevorSearchTerm.toLowerCase();
    return this.endevorFiles.filter(f =>
      f.file_name.toLowerCase().includes(t) ||
      f.environment.toLowerCase().includes(t) ||
      f.machine.toLowerCase().includes(t) ||
      f.status.toLowerCase().includes(t)
    );
  }

  get endevorOccupancyStats(): { environment: string, count: number }[] {
    const map = new Map<string, number>();
    this.endevorFiles.forEach(f => {
      const env = f.environment || '–';
      map.set(env, (map.get(env) || 0) + 1);
    });
    return Array.from(map, ([environment, count]) => ({ environment, count }));
  }

  get reclassementList(): EndevorFile[] {
    return this.endevorFiles.filter(f => f.status.toLowerCase() === 'warning');
  }

  // badge CSS common
  getBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'ok':      return 'success';
      case 'warning': return 'warning';
      case 'critical':
      case 'alert':   return 'alert';
      default:        return '';
    }
  }
}
