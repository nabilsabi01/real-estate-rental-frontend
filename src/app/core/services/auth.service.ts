import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request.model';
import { RegistrationRequest } from '../models/registration-request.model';
import { UserRole } from '../models/user-role.enum';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  userId: number;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthResponse | null>;
  public currentUser$: Observable<AuthResponse | null>;
  private readonly apiUrl = `${environment.apiUrl}/v1/auth`;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(this.getStoredUser());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  
  public login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap(response => this.handleAuthenticationResponse(response)),
      catchError(this.handleError)
    );
  }

  public register(registrationRequest: RegistrationRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registrationRequest).pipe(
      tap(response => this.handleAuthenticationResponse(response)),
      catchError(this.handleError)
    );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public isLoggedIn(): boolean {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) return false;

    const decodedToken = this.getDecodedToken(currentUser.token);
    return decodedToken !== null && decodedToken.exp > Date.now() / 1000;
  }

  public getCurrentUserId(): number | null {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) return null;

    const decodedToken = this.getDecodedToken(currentUser.token);
    return decodedToken ? decodedToken.userId : null;
  }

  public getUserRole(): UserRole | null {
    return this.currentUserSubject.value?.userRole ?? null;
  }

  public getToken(): string | null {
    return this.currentUserSubject.value?.token ?? null;
  }

  private getStoredUser(): AuthResponse | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  private handleAuthenticationResponse(response: AuthResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(response));
    this.currentUserSubject.next(response);
  }

  private getDecodedToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
