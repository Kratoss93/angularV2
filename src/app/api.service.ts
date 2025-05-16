import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Queue, EndevorFile, ZmailService } from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://192.168.112.203:5000';

  constructor(private http: HttpClient) {}

  getQueues(): Observable<Queue[]> {
    return this.http.get<Queue[]>(`${this.baseUrl}/queues`);
  }

  getEndevorFiles(): Observable<EndevorFile[]> {
    return this.http.get<EndevorFile[]>(`${this.baseUrl}/endevorfiles`);
  }

  getZmailServices(): Observable<ZmailService[]> {
    return this.http.get<ZmailService[]>(`${this.baseUrl}/zmailservices`);
  }

  deleteEndevorFile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/endevorfiles/${id}`);
  }

  addEndevorFile(file: EndevorFile): Observable<any> {
    return this.http.post(`${this.baseUrl}/endevorfiles`, file);
  }
}
