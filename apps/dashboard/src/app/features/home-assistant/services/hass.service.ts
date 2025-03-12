import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, retry, shareReplay } from 'rxjs';
import { ServiceCall } from '../models/ServiceCall';

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
  private _refresh$ = new BehaviorSubject<null>(null);

  constructor(private http: HttpClient) {
    this.connectWebsocket();
  }

  public refresh() {
    this._refresh$.next(null);
  }

  public get refetch$() {
    return this._refresh$.asObservable();
  }

  public get entities() {
    return this.entities$.asObservable().pipe(
      retry(3), // Retry if error occurs
      shareReplay(1) // Cache latest value
    );
  }

  public callService(service: ServiceCall) {
    service.type = 'call_service';
    return this.http.post(`http://localhost:3000/hass/entity/service`, service);
  }

  public toggleState(domain: string, entity: string) {
    return this.callService({
      domain,
      service: 'toggle',
      target: {
        entity_id: entity,
      },
    });
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
