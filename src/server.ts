import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Tes interfaces
export interface Queue {
  name: string;
  messages: number;
  status: string;
}

export interface EndevorFile {
  fileName: string;
  environment: string;
  machine: string;
  status: string;
}

export interface ZmailService {
  name: string;
  status: string;
  lastCheck: string;
}

@Injectable({
  providedIn: 'root'
})
export class server {
  private apiUrl = 'http://localhost:5000'; // URL de ton backend Node.js

  constructor(private http: HttpClient) {}

  getQueues(): Observable<Queue[]> {
    return this.http.get<Queue[]>(`${this.apiUrl}/queues`);
  }

  getEndevorFiles(): Observable<EndevorFile[]> {
    return this.http.get<EndevorFile[]>(`${this.apiUrl}/endevor-files`);
  }

  getZmailServices(): Observable<ZmailService[]> {
    return this.http.get<ZmailService[]>(`${this.apiUrl}/zmail-services`);
  }
}
