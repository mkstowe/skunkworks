import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAccess().subscribe();
  }

  public checkAccess(): Observable<boolean> {
    return this.http
      .get(`${environment.apiUrl}/authorized`, { withCredentials: true })
      .pipe(
        map(() => {
          this.loggedInSubject.next(true);
          return true;
        }),
        catchError(() => {
          this.loggedInSubject.next(false);
          return of(false);
        })
      );
  }

  public login(password: string): Observable<boolean> {
    return this.http
      .post<{ success: boolean }>(
        `${environment.apiUrl}/login`,
        { password },
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          this.loggedInSubject.next(res.success);
          return res.success;
        }),
        catchError(() => {
          this.loggedInSubject.next(false);
          return of(false);
        })
      );
  }

  public logout(): Observable<boolean> {
    return this.http
      .post<{ success: boolean }>(
        `${environment.apiUrl}/logout`,
        {},
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          this.loggedInSubject.next(false);
          return res.success;
        }),
        catchError(() => {
          this.loggedInSubject.next(false);
          return of(false);
        })
      );
  }
}
