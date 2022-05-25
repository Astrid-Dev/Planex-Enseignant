import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

const TOKEN_KEY = "AUTH_TOKEN";

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = {
    login: environment.AUTH_URL+'/login'
  };

  constructor() {}

  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {
      let payload = this.payload(token);
      if (payload) {
        payload = {...payload, iss: this.issuer.login};
        return Object.values(this.issuer).indexOf(payload.iss) > -1;
      }
      else
      {
        return;
      }
    } else {
      return false;
    }
  }
  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

}
