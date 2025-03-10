import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, retry, shareReplay } from 'rxjs';
import { ServiceCall } from '../models/ServiceCall';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HassService implements OnDestroy {
  private readonly WS_URL = 'ws://localhost:3000/hass/ws';
  private socket!: WebSocket;
  private reconnectTimeout = 5000;
  private isConnected = false;
  private entityState$ = new BehaviorSubject<Record<string, any>>({});
  private entities$ = new BehaviorSubject({});

  constructor(private http: HttpClient) {
    this.connectWebsocket();
  }

  public get entities() {
    return this.entities$.asObservable().pipe(
      retry(3), // Retry if error occurs
      shareReplay(1) // Cache latest value
    );
  }

  public getEntities(): Observable<any> {
    return this.entities$.asObservable().pipe(
      retry(3), // Retry if error occurs
      shareReplay(1) // Cache latest value
    );
  }

  public getEntity(entity: string) {
    return this.http.get<any>(`http://localhost:3000/hass/entity/${entity}`);
  }

  public callService(service: ServiceCall) {
    return this.http.post(`http://localhost:3000/hass/entity/service`, {
      ...service,
      type: 'call_service',
    });
  }

  public sendMessage(message: string) {
    if (this.isConnected && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.warn('⚠️ WebSocket is not connected.');
    }
  }

  private connectWebsocket() {
    this.socket = new WebSocket(this.WS_URL);

    console.log(this.socket);
    this.socket.onopen = () => {
      console.log('Connected to Home Assistant WebSocket');
      this.isConnected = true;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.entities$.next(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.warn('WebSocket connection closed, retrying in 5s...');
      this.isConnected = false;
      setTimeout(() => this.connectWebsocket(), this.reconnectTimeout);
    };
  }

  ngOnDestroy(): void {
    this.socket.close();
  }
}
