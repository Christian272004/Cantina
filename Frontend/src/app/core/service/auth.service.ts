import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); 
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); 

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials, {withCredentials: true}).pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/productes']);
        })
      );
    }

    logout() { 
      this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(
        (response) => {
            this.isAuthenticatedSubject.next(false); 
            this.router.navigate(['/']); 
        }
      );
    }


    public checkAuthentication(): Observable<boolean> {
      return this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/check`, { withCredentials: true }).pipe(
        tap(response => {
          this.isAuthenticatedSubject.next(response.authenticated);
        }),
        map(response => response.authenticated),
        catchError(() => {
          this.isAuthenticatedSubject.next(false);
          return of(false);
        })
      );
    }
}
