import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, retry, shareReplay, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ServiceCall } from '../models/ServiceCall';

@Injectable({
  providedIn: 'root',
})
export class HassService implements OnDestroy {
  private readonly wsUrl = `${environment.wsUrl}/hass/ws`;
  private readonly apiUrl = `${environment.apiUrl}/hass`;
  private socket!: WebSocket;
  private reconnectTimeout = 5000;
  private isConnected = false;
  private entityState$ = new BehaviorSubject<Record<string, any>>({});
  private _entities$ = new BehaviorSubject({});
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

  public get entities$() {
    return this.refetch$.pipe(
      switchMap(() => {
        return this._entities$.asObservable().pipe(retry(3), shareReplay(1));
      })
    );
  }

  public callService(service: ServiceCall) {
    service.type = 'call_service';

    if (!service.domain) {
      service.domain = service.target.entity_id?.split('.')[0];
    }

    return this.http
      .post(`${this.apiUrl}/entity/service`, service)
      .pipe(tap(() => this._refresh$.next(null)));
  }

  private connectWebsocket() {
    this.socket = new WebSocket(this.wsUrl);

    console.log(this.socket);
    this.socket.onopen = () => {
      console.log('Connected to Home Assistant WebSocket');
      this.isConnected = true;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this._entities$.next(data);
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
