import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  authenticate(username: string, password: string): boolean {
    if(username === 'admin' && password === 'admin'){
        this.isAuthenticated = true;
    }
    else{
        this.isAuthenticated = false;
    }
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}