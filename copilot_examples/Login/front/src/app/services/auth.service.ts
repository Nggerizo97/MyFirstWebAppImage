import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getAuthenticationStatus() {
    return this.isAuthenticatedSubject.asObservable();
  }
}