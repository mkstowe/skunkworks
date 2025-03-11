import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, forkJoin, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private basePath = 'assets/icons';
  private paths: string[] = [
    'bed.svg',
    'candle.svg',
    'ceiling-light.svg',
    'chicken-leg.svg',
    'cleaver.svg',
    'clock.svg',
    'computer.svg',
    'couch.svg',
    'crunchyroll.svg',
    'door.svg',
    'engine.svg',
    'fan.svg',
    'floor-lamp.svg',
    'gas-pump.svg',
    'hbo.svg',
    'house.svg',
    'leaf.svg',
    'lightbulb.svg',
    'line-graph.svg',
    'litter.svg',
    'lock-open.svg',
    'lock.svg',
    'music-note.svg',
    'netflix.svg',
    'paramount.svg',
    'plant.svg',
    'poop.svg',
    'power.svg',
    'prime.svg',
    'roomba.svg',
    'router.svg',
    'security-cam.svg',
    'shower.svg',
    'speaker.svg',
    'speedometer.svg',
    'spotify.svg',
    'table-lamp.svg',
    'thermometer.svg',
    'toilet.svg',
    'tubi.svg',
    'tv.svg',
    'water-drops.svg',
    'wifi.svg',
    'wind.svg',
    'youtube.svg',
    'zzz.svg',
  ];

  constructor(private http: HttpClient) {}

  public get iconNames() {
    return this.paths.map((path) => path.replace('.svg', ''));
  }

  getSvgContent(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }

  getMultipleSvgContents(): Observable<{ [key: string]: string }> {
    const requests = this.paths.map((path) =>
      this.http.get(`${this.basePath}/${path}`, { responseType: 'text' })
    );
    return forkJoin(requests).pipe(
      map((contents: any) => {
        const result: { [key: string]: string } = {};
        this.paths.forEach((path, index) => {
          const key = path.replace('.svg', '');
          result[key] = contents[index];
        });
        return result;
      })
    );
  }

  initializeIcons() {
    return this.getMultipleSvgContents().pipe(
      catchError((err: any) => {
        throw 'Error registering icons: ' + err;
      }),
      take(1)
    );
  }

  public getIcons() {
    return this.paths.map((path) => path.replace('.svg', ''));
  }

  public getIcon(path: string): Observable<string> {
    return this.http
      .get(`${this.basePath}/${path}`, { responseType: 'text' })
      .pipe(
        take(1),
        catchError((err: any) => {
          console.error('Icon not found: ', err);
          return EMPTY;
        })
      );
  }
}
